import { Dispatch, SetStateAction } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutFirebase,
  onAuthStateChanged,
  User as FireUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
  Timestamp,
  writeBatch,
  documentId,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import randUsername from "./rand-username.utils";
import { stories } from "./mocks/stories";
import { default_profile_img } from "./objects.utils";

import {
  User,
  StoryRequired,
  Story,
  UserSimple,
  StoryDocDB,
  StoryDB,
  UserDoc,
  StoryCardType,
  Result,
} from "./types.utils";
import { DateToJSON, pickStories } from "./functions.utils";

const PAGE_SIZE = 3;

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG!);

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage();

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const isStoryOwner = async (uid: string, storyId: string) => {
  const { uid: ownerUid } = await getStoryById(storyId);

  return ownerUid === uid;
};
// Auth

export const signUpWithEmail = (
  email: string,
  password: string,
  username: string
) => {
  let returnCode: string = "pasty/registered";
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user: FireUser = userCredential.user;
      await fireAddUserToDB(user, username, default_profile_img);
    })
    .catch((error) => {
      returnCode = error.code;
    });

  return returnCode;
};

export const signInWithEmail = async (email: string, password: string) => {
  let returnCode: string = "pasty/logged-in";
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
    .catch((error) => {
      returnCode = error.code;
    });

  return returnCode;
};

export const signInWithGoogle = async () => {
  let returnCode: string = "pasty/logged-in";
  await signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const { user } = result;
    })
    .catch((error) => {
      returnCode = error.code;
    });

  return returnCode;
};

export const signOut = async () => {
  signOutFirebase(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onAuthChange = (
  setUser: Dispatch<SetStateAction<UserSimple>>,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
) =>
  onAuthStateChanged(auth, async (fireUser) => {
    if (fireUser) {
      let user = await getUserById(fireUser.uid);
      const isGoogleFirstSignIn = !user.uid && fireUser.displayName;

      if (isGoogleFirstSignIn) {
        await fireAddUserToDB(fireUser);
        user = await getUserById(fireUser.uid);
      }

      setUser({
        uid: fireUser.uid,
        username: user.username,
        avatar: user.avatar,
      });
      setIsLoggedIn(true);
    } else {
      setUser({
        uid: "",
        username: "",
        avatar: "",
      });
      setIsLoggedIn(false);
    }
  });

// DB

export const fireAddUserToDB = async (
  user: FireUser,
  username?: string,
  src?: string
) => {
  const docRef = await setDoc(doc(db, "users", user.uid), {
    username: username ? username : randUsername(),
    email: user.email,
    avatar: src ? src : user.photoURL,
    favorites: [],
    followers: [],
    follows: [],
    achievements: ["First achievement"],
    description: "",
  });
};

export const addStoryToDB = async (newStory: StoryRequired, uid: string) => {
  try {
    const docRef = await addDoc(collection(db, "stories"), {
      ...newStory,
      uid,
      created: Timestamp.now(),
      ratings: {
        likes: [],
        dislikes: [],
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getFireUser = async () => getAuth(app).currentUser;

export const getUserById = async (uid: string) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) return { uid, ...(docSnap.data() as UserDoc) };
  throw Error("No User with That Id");
};

export const getFollowersNum = async (uid: string) => {
  const { followers } = await getUserById(uid);

  return followers.length;
};

export const getFollows = async (uid: string) => {
  const { follows: followUids } = await getUserById(uid);
  let simpleFollows: UserSimple[] = [];
  for (let followUid of followUids) {
    const { uid, username, avatar } = await getUserById(followUid);
    simpleFollows.push({ uid, username, avatar } as UserSimple);
  }

  return simpleFollows;
};

export const getUserByUsername = async (username: string) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  let user: User = {
    uid: "",
    username: "",
    email: "",
    avatar: "",
    favorites: [],
    followers: [],
    achievements: [],
    follows: [],
    description: "",
  };

  querySnapshot.forEach((doc) => {
    const uid: string = doc.id;
    user = { uid, ...doc.data() } as User;
  });

  return user;
};

export const getStoryById = async (id: string) => {
  const docSnap = await getDoc(doc(db, "stories", id));
  const story = docSnap.data()!;
  const {
    created: createdDB,
    ratings: { likes, dislikes },
  } = story;
  const created: string = createdDB.toDate().toString();
  const ratings = { likes: likes.length, dislikes: dislikes.length };
  return { id, ...story, created, ratings } as Story;
};

export const getStoriesForHome = async () => {
  const querySnapshot = await getDocs(collection(db, "stories"));
  let stories: Story[] = [];
  querySnapshot.forEach((doc) => {
    const id: string = doc.id;
    const story = doc.data() as StoryDocDB;
    const {
      created: createdDB,
      ratings: { likes, dislikes },
    } = story;
    const created: string = createdDB.toDate().toString();
    const ratings = { likes: likes.length, dislikes: dislikes.length };

    stories.push({
      id,
      ...story,
      created,
      ratings,
    } as Story);
  });

  return stories;
};

export const getNewStories = async (oldStoriesId: string[]) => {
  let q;
  if (oldStoriesId.length > 0)
    q = query(
      collection(db, "stories"),
      where(documentId(), "not-in", oldStoriesId)
    );
  else q = query(collection(db, "stories"));

  const querySnapshot = await getDocs(q);

  let stories: Story[] = [];

  querySnapshot.forEach((doc) => {
    const id: string = doc.id;
    const story = doc.data() as StoryDocDB;
    const {
      created: createdDB,
      ratings: { likes, dislikes },
    } = story;
    const created: string = createdDB.toDate().toString();
    const ratings = { likes: likes.length, dislikes: dislikes.length };

    stories.push({
      id,
      ...story,
      created,
      ratings,
    } as Story);
  });
  return pickStories(stories, PAGE_SIZE);
};

export const getNewSearchStories = async (
  oldStoriesId: string[],
  tags: string[]
) => {
  let q;

  if (oldStoriesId.length > 0)
    q = query(
      collection(db, "stories"),
      where(documentId(), "not-in", oldStoriesId),
      where("tags", "array-contains-any", tags)
    );
  else
    q = query(
      collection(db, "stories"),
      where("tags", "array-contains-any", tags)
    );

  const querySnapshot = await getDocs(q);

  let stories: Story[] = [];
  querySnapshot.forEach((doc) => {
    const id: string = doc.id;
    const story = doc.data() as StoryDocDB;
    const {
      created: createdDB,
      ratings: { likes, dislikes },
    } = story;
    const created: string = createdDB.toDate().toString();
    const ratings = { likes: likes.length, dislikes: dislikes.length };

    stories.push({
      id,
      ...story,
      created,
      ratings,
    } as Story);
  });
  return pickStories(stories, PAGE_SIZE);
};

export const getStoriesByUid = async (uid: string) => {
  const q = query(collection(db, "stories"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  let stories: Story[] = [];

  querySnapshot.forEach((doc) => {
    const id: string = doc.id;
    const story = doc.data() as StoryDocDB;
    const {
      created: createdDB,
      ratings: { likes, dislikes },
    } = story;
    const created: string = createdDB.toDate().toString();
    const ratings = { likes: likes.length, dislikes: dislikes.length };

    stories.push({ id, ...story, created, ratings } as Story);
  });

  return stories;
};

export const getFavoriteStoryCards = async (clientUid: string) => {
  const { favorites } = await getUserById(clientUid);

  if (favorites.length === 0) return [];
  const q = query(
    collection(db, "stories"),
    where(documentId(), "in", favorites)
  );
  const { docs } = await getDocs(q);
  let storyCards: StoryCardType[] = [];

  for (let doc of docs) {
    const id: string = doc.id;
    const story = doc.data() as StoryDocDB;
    const {
      created: createdDB,
      ratings: { likes, dislikes },
      uid,
    } = story;
    const created: string = createdDB.toDate().toString();
    const ratings = { likes: likes.length, dislikes: dislikes.length };
    const { username, avatar } = await getUserById(uid);

    storyCards.push({
      story: { id, ...story, created, ratings },
      user: {
        uid,
        username,
        avatar,
      },
    });
  }

  return storyCards;
};

export const getStoryRatings = async (storyId: string, uid: string) => {
  const docRef = doc(db, "stories", storyId);
  const docSnap = await getDoc(docRef);
  const { likes, dislikes }: { likes: string[]; dislikes: string[] } =
    docSnap.data()!.ratings;

  if (likes.includes(uid)) {
    return { likes: true, dislikes: false };
  } else if (dislikes.includes(uid)) {
    return { likes: false, dislikes: true };
  } else {
    return { likes: false, dislikes: false };
  }
};

export const getStoryRatingsNum = async (storyId: string) => {
  const docRef = doc(db, "stories", storyId);
  const docSnap = await getDoc(docRef);
  const {
    ratings: { likes, dislikes },
  } = docSnap.data()! as StoryDB;

  return { likes: likes.length, dislikes: dislikes.length };
};

export const getIsFavorite = async (uid: string, storyId: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const favorites: string[] = docSnap.data()!.favorites;

  return favorites.includes(storyId);
};

export const getIsUsernameTaken = async (username: string) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const docSnap = await getDocs(q);

  if (docSnap.size > 0) {
    return true;
  }
  return false;
};

export const getIsFollowing = async (
  followerUid: string,
  followedUid: string
) => {
  const follower = await getUserById(followerUid);
  const followed = await getUserById(followedUid);

  return followed.followers.includes(follower.uid);
};

export const getDayPasta = async () => {
  const docRef = doc(db, "special/dayPasta");
  const docSnap = await getDoc(docRef);
  const { id } = docSnap.data() as { id: string };
  const story = await getStoryById(id);

  return story;
};

export const updateStoryRating = async (
  storyId: string,
  uid: string,
  action: string
) => {
  let areRatingsActive: { likes: boolean; dislikes: boolean } = {
    likes: false,
    dislikes: false,
  };
  const docRef = doc(db, "stories", storyId);
  const docSnap = await getDoc(docRef);
  let { likes, dislikes }: { likes: string[]; dislikes: string[] } =
    docSnap.data()!.ratings;
  const batch = writeBatch(db);

  if (likes.includes(uid)) {
    likes = likes.filter((tempUid: string) => tempUid !== uid);
    batch.update(docRef, {
      ratings: {
        dislikes,
        likes,
      },
    });
  } else if (dislikes.includes(uid)) {
    dislikes = dislikes.filter((tempUid: string) => tempUid !== uid);
    batch.update(docRef, {
      ratings: {
        dislikes,
        likes,
      },
    });
  }

  if (action === "like") {
    likes.push(uid);
    areRatingsActive = { likes: true, dislikes: false };
    batch.update(docRef, {
      ratings: { likes, dislikes },
    });
  } else if (action === "dislike") {
    dislikes.push(uid);
    areRatingsActive = { likes: false, dislikes: true };
    batch.update(docRef, {
      ratings: { likes, dislikes },
    });
  }

  await batch.commit();

  return areRatingsActive;
};

export const updateFavorites = async (uid: string, storyId: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  let favorites: string[] = docSnap.data()!.favorites;

  if (favorites.includes(storyId)) {
    await updateDoc(docRef, {
      favorites: favorites.filter((tempId) => tempId !== storyId),
    });
    return false;
  } else {
    favorites.push(storyId);
    await updateDoc(docRef, {
      favorites,
    });
    return true;
  }
};

export const updateAvatar = async (uid: string, file: File) => {
  const storageRef = ref(storage, `users/${uid}`);
  let returnCode: string = "pasty/avatar/success";
  await uploadBytes(storageRef, file)
    .then((snapshot) => {})
    .catch((e) => (returnCode = e));
  if (returnCode !== "pasty/avatar/success") return returnCode;
  await getDownloadURL(storageRef)
    .then((url) => {
      updateDoc(doc(db, "users", uid), {
        avatar: url,
      }).catch((e) => (returnCode = e));
    })
    .catch((e) => (returnCode = e));

  return returnCode;
};

export const updateUsername = async (uid: string, username: string) => {
  const isTaken = await getIsUsernameTaken(username);

  if (isTaken) return "pasty/username/taken";
  const docRef = doc(db, `users/${uid}`);
  let returnCode: string = "pasty/username/success";
  await updateDoc(docRef, { username }).catch((e) => (returnCode = e));
  return returnCode;
};

export const updateFollower = async (
  followerUid: string,
  followedUid: string
) => {
  const followedRef = doc(db, "users", followedUid);
  const followed = await getUserById(followedUid);
  let followers = followed.followers;
  if (followerUid === followedUid) return -1;

  const batch = writeBatch(db);
  const followerRef = doc(db, "users", followerUid);
  const follower = await getUserById(followerUid);
  let follows = follower.follows;

  if (followers.includes(follower.uid)) {
    followers = followers.filter(
      (tempFollower) => tempFollower !== follower.uid
    );
    follows = follows.filter((tempFollowed) => tempFollowed !== followed.uid);
  } else {
    followers.push(follower.uid);
    follows.push(followed.uid);
  }

  batch.update(followedRef, { followers });
  batch.update(followerRef, { follows });

  await batch.commit();

  return followers.length;
};

export const deleteStory = async (id: string, uid: string) => {
  if (!(await isStoryOwner(uid, id))) return "pasty/delete/not-owner";

  await deleteDoc(doc(db, "stories", id));

  return "pasty/delete/success";
};
