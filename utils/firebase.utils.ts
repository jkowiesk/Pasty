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
  getFirestore,
  query,
  where,
  Timestamp,
  writeBatch,
} from "firebase/firestore";

import randUsername from "./rand-username.utils";
import { stories } from "./mocks/stories";
import { User, StoryRequired, Story, SimpleUser } from "./types.utils";
import { DateToJSON } from "./functions.utils";

const DEFAULT_PROFILE_IMG =
  "https://firebasestorage.googleapis.com/v0/b/pasty-69ef6.appspot.com/o/images%2Fprofile_default.png?alt=media&token=be82b164-6eba-47ec-bc4d-8c752fc78a12";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG!);

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Auth
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signUpWithEmail = (
  email: string,
  password: string,
  username: string
) => {
  let returnCode: string = "pasty/registered";
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user: FireUser = userCredential.user;
      await fireAddUserToDB(user, username, DEFAULT_PROFILE_IMG);
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
  setUser: Dispatch<SetStateAction<SimpleUser>>,
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

/* export const addSetUpMocksToDB = async () => {
  for (const story of stories) {
    try {
      await addDoc(collection(db, "stories"), story);
    } catch (e) {
      console.log(e);
    }
  }
}; */

export const fireAddUserToDB = async (
  user: FireUser,
  username?: string,
  src?: string
) => {
  console.log(`$xD:: {src}`);
  const docRef = await setDoc(doc(db, "users", user.uid), {
    username: username ? username : randUsername(),
    email: user.email,
    avatar: src ? src : user.photoURL,
    favorites: [],
    followers: [],
    follows: [],
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

export const getUserById = async (uid: string) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    return docSnap.data();
  }

  return {
    uid: "",
  };
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
    follows: [],
  };

  querySnapshot.forEach((doc) => {
    const uid: string = doc.id;
    user = { uid, ...doc.data() } as User;
  });

  return user;
};

export const getStoryById = async (id: string) => {
  const docSnap = await getDoc(doc(db, "stories", id));
  const created = DateToJSON(docSnap.data()!.created.toDate());
  return { id, ...docSnap.data(), created } as Story;
};

export const getStoriesForHome = async () => {
  const querySnapshot = await getDocs(collection(db, "stories"));
  let stories: Story[] = [];
  querySnapshot.forEach((doc) => {
    const id: string = doc.id;
    const created = DateToJSON(doc.data().created.toDate());
    stories.push({
      id,
      ...doc.data(),
      created,
    } as Story);
  });

  return stories;
};

export const getStoriesByUid = async (uid: string) => {
  const q = query(collection(db, "stories"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  let stories: Story[] = [];

  querySnapshot.forEach((doc) => {
    const id: string = doc.id;
    const created = DateToJSON(doc.data().created.toDate());
    stories.push({ id, ...doc.data(), created } as Story);
  });

  return stories;
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

export const getFavorites = async (uid: string, storyId: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const favorites: string[] = docSnap.data()!.favorites;

  if (favorites.includes(storyId)) {
    return true;
  } else {
    return false;
  }
};
