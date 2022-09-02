import { Dispatch, SetStateAction } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  setDoc,
  doc,
  getFirestore,
} from "firebase/firestore";

import { stories } from "./mocks/stories";
import { User as MyUser, StoryDoc, Story, UserDoc } from "./types.utils";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG!);

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Auth
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const { user } = result;
      const docSnap = await getDoc(doc(db, `users/${user.uid}`));

      if (!docSnap.exists()) {
        await addUserToDB(user);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(`${errorCode}: ${errorMessage}`);
    });
};

export const signOutWithGoogle = async () => {
  signOut(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onAuthChange = (
  setUser: Dispatch<SetStateAction<MyUser>>,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
) =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({
        uid: user.uid,
        username: user.displayName!,
        email: user.email!,
        avatar: user.photoURL!,
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

export const addUserToDB = async (user: User) => {
  const docRef = await setDoc(doc(db, "users", user.uid), {
    username: user.displayName,
    email: user.email,
    avatar: user.photoURL,
  });
};

export const addStoryToDB = async (newStory: StoryDoc, uid: string) => {
  try {
    await addDoc(collection(db, "stories"), { ...newStory, uid });
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

export const getStoriesForHome = async () => {
  const querySnapshot = await getDocs(collection(db, "stories"));
  let stories: Story[] = [];
  querySnapshot.forEach((doc) => {
    const id: string = doc.id;
    stories.push({ id, ...doc.data() } as Story);
  });

  return stories;
};
