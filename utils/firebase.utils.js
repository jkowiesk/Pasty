import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, doc, query } from "firebase/firestore";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

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

export const getStoriesForHome = async () => {
  const querySnapshot = await getDocs(collection(db, "stories"));
  let stories = [];
  querySnapshot.forEach((doc) => {
    stories.push(doc.data());
  });

  return stories;
};
