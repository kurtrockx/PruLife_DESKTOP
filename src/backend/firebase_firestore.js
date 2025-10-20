import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  serverTimestamp,
  getDocs,
  deleteDoc,
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

// 🔹 upload PDF and store URL in Firestore
async function uploadPdfAndSaveToFirestore(userId, pdfBlob) {
  try {
    // Step 1: Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", pdfBlob);
    formData.append("upload_preset", "PDFGenerator"); // your Cloudinary preset

    const cloudName = "dsoetkfjz"; // change this to your actual cloud name
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary upload failed:", data);
      throw new Error(data.error?.message || "Upload failed");
    }

    const pdfUrl = data.secure_url;
    console.log("✅ Uploaded to Cloudinary:", pdfUrl);

    // Step 2: Save PDF URL to Firestore
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { pdfUrl });

    console.log("✅ PDF URL saved to Firestore!");
    return pdfUrl;
  } catch (error) {
    console.error("Error uploading PDF and saving:", error);
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

// Upload new announcement
async function uploadAnnouncement({ title, subtitle, content, author, imageUrl, thumbUrl }) {
  try {
    const announcementsRef = collection(db, "announcements");
    const docRef = await addDoc(announcementsRef, {
      title,
      subtitle: subtitle || "",
      content,
      author,
      image: imageUrl || null,
      thumb: thumbUrl || null,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Announcement uploaded:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error uploading announcement:", error);
    throw error;
  }
}

// Listen for announcements
const listenToAnnouncements = (callback) => {
  const announcementsRef = collection(db, "announcements");
  return onSnapshot(
    announcementsRef,
    (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      callback(data);
    },
    (error) => console.error("Error listening to announcements:", error)
  );
};

// Update announcement
async function updateAnnouncement(id, { title, subtitle, content, image, thumb }) {
  const docRef = doc(db, "announcements", id);
  await updateDoc(docRef, {
    title,
    subtitle: subtitle || "",
    content,
    image: image || null,
    thumb: thumb || null,
    updatedAt: serverTimestamp(),
  });
}

// Delete announcement
async function deleteAnnouncement(id) {
  const docRef = doc(db, "announcements", id);
  await deleteDoc(docRef);
}

export {
  listenToDB,
  pushMessage,
  fetchAllUsers,
  updateUser,
  uploadPdfAndSaveToFirestore,
  uploadAnnouncement,
  listenToAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
