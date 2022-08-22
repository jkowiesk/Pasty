import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
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

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Auth
const auth = getAuth(app);

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

// DB

/* import { stories } from "./mocks/stories"; */ // Only import if running addSetUpMocksToDB
export const addSetUpMocksToDB = async () => {
  for (const story of stories) {
    try {
      await addDoc(collection(db, "stories"), story);
    } catch (e) {
      console.log(e);
    }
  }
};

export const addUserToDB = async (user) => {
  const docRef = await setDoc(doc(db, "users", user.uid), {
    username: user.displayName,
    email: user.email,
    avatar: user.photoURL,
  });
};

export const getStoriesForHome = async () => {
  const querySnapshot = await getDocs(collection(db, "stories"));
  let stories = [];
  querySnapshot.forEach((doc) => {
    stories.push(doc.data());
  });

  return stories;
};
