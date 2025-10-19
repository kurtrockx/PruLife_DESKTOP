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

async function uploadPdfAndSaveToFirestore(userId, pdfFile) {
  try {
    if (!(pdfFile instanceof File)) {
      throw new Error("Invalid file passed to uploadPdfAndSaveToFirestore");
    }

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("upload_preset", "PDFGenerator");
    formData.append("public_id", `${userId}_proposal`);
    formData.append("resource_type", "raw"); // ✅ important!

    const cloudName = "dsoetkfjz"; // change if different

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary upload error:", data);
      throw new Error(data.error?.message || "Upload failed");
    }

    const pdfUrl = data.secure_url;
    console.log("✅ Uploaded to Cloudinary:", pdfUrl);

    // Save URL to Firestore
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { pdfUrl });

    console.log("✅ PDF URL saved to Firestore!");
    return pdfUrl;
  } catch (error) {
    console.error("❌ Upload failed:", error);
    return null;
  }
}


// 🔹 Existing helpers
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
      callback(docSnap.data());
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
    createdAt: Date.now(),
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

export {
  listenToDB,
  pushMessage,
  fetchAllUsers,
  updateUser,
  uploadPdfAndSaveToFirestore,
};
