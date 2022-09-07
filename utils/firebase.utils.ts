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
  doc,
  getFirestore,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

import randUsername from "./rand-username.utils";
import { stories } from "./mocks/stories";
import { User, StoryDoc, Story, UserDoc, StoryTs } from "./types.utils";
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
  let returnCode: string = "0";
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user: FireUser = userCredential.user;
      fireAddUserToDB(user, username, DEFAULT_PROFILE_IMG);
    })
    .catch((error) => {
      returnCode = error.code;
    });

  return returnCode;
};

export const signInWithEmail = (email: string, password: string) => {
  let returnCode: string = "0";
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      returnCode = error.code;
    });

  return returnCode;
};

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const { user } = result;
      const docSnap = await getDoc(doc(db, `users/${user.uid}`));

      if (!docSnap.exists()) {
        await fireAddUserToDB(user);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(`${errorCode}: ${errorMessage}`);
    });
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
  setUser: Dispatch<SetStateAction<User>>,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
) =>
  onAuthStateChanged(auth, async (googleUser) => {
    if (googleUser) {
      const user = await getUserById(googleUser.uid);
      setUser({
        uid: googleUser.uid,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      });
      setIsLoggedIn(true);
    } else {
      setUser({
        uid: "",
        username: "",
        email: "",
        avatar: "",
      });
      setIsLoggedIn(false);
    }
  });

// DB

export const addSetUpMocksToDB = async () => {
  for (const story of stories) {
    try {
      await addDoc(collection(db, "stories"), story);
    } catch (e) {
      console.log(e);
    }
  }
};

export const fireAddUserToDB = async (
  user: FireUser,
  username?: string,
  src?: string
) => {
  const docRef = await setDoc(doc(db, "users", user.uid), {
    username: username ? username : randUsername(),
    email: user.email,
    avatar: src ? src : user.photoURL,
  });
};

export const EmailAddUserToDB = async ({
  uid,
  username,
  email,
  avatar,
}: User) => {
  const docRef = await setDoc(doc(db, "users", uid), {
    username,
    email,
    avatar,
  });
};

export const addStoryToDB = async (newStory: StoryDoc, uid: string) => {
  try {
    const docRef = await addDoc(collection(db, "stories"), {
      ...newStory,
      uid,
      created: Timestamp.now(),
    });
    console.log(docRef.id);
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
  let user: User = { uid: "", username: "", email: "", avatar: "" };

  querySnapshot.forEach((doc) => {
    const uid: string = doc.id;
    user = { uid, ...doc.data() } as User;
  });

  return user;
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
