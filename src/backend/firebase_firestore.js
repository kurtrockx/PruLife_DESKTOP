import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDB-oNYCzUQZot26XC9YO5ohoE6pwd0eYA",
  authDomain: "capstone2-prulifeuk.firebaseapp.com",
  projectId: "capstone2-prulifeuk",
  storageBucket: "capstone2-prulifeuk.firebasestorage.app",
  messagingSenderId: "732043751595",
  appId: "1:732043751595:web:7618c1d7ac4bb7d77307ee",
  measurementId: "G-4Q4HMEDE57",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function fetchAllUsers() {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(usersList);
    return usersList;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

async function updateUser(id, data) {
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, data);
}

const listenToDB = (userId, callback) => {
  const docRef = doc(db, "users", userId);

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data()); // full data
    } else {
      console.log("No such document!");
    }
  });
};

const pushMessage = async (userId, sender, text) => {
  const docRef = doc(db, "users", userId);

  const messageObj = {
    sender,
    message: text,
    createdAt: Date.now(), // use client timestamp here
  };

  try {
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      await updateDoc(docRef, {
        messages: arrayUnion(messageObj),
      });
      console.log("Message pushed!");
    } else {
      await setDoc(docRef, {
        messages: [messageObj],
      });
      console.log("Document created with messages array!");
    }
  } catch (error) {
    console.error("Error pushing message:", error);
  }
};

export { listenToDB, pushMessage, fetchAllUsers, updateUser };
