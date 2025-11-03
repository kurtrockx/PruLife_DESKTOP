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
  query, // ✅ Added
  orderBy, // ✅ Added
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

// 🔹 Upload PDF and store URL in Firestore
async function uploadPdfAndSaveToFirestore(userId, pdfBlob) {
  try {
    const formData = new FormData();
    formData.append("file", pdfBlob);
    formData.append("upload_preset", "PDFGenerator");

    const cloudName = "dsoetkfjz";
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      { method: "POST", body: formData },
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Upload failed");

    const pdfUrl = data.secure_url;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { pdfUrl });
    return pdfUrl;
  } catch (error) {
    console.error("Error uploading PDF and saving:", error);
  }
}

// 🔹 Fetch all users
async function fetchAllUsers() {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    return usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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
    if (docSnap.exists()) callback(docSnap.data());
  });
};

// 🔹 Push a message
const pushMessage = async (userId, sender, text) => {
  const docRef = doc(db, "users", userId);
  const messageObj = { sender, message: text, createdAt: Date.now() };

  try {
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      await updateDoc(docRef, { messages: arrayUnion(messageObj) });
    } else {
      await setDoc(docRef, { messages: [messageObj] });
    }
  } catch (error) {
    console.error("Error pushing message:", error);
  }
};

// 🔹 Upload new announcement
async function uploadAnnouncement({
  title,
  subtitle,
  content,
  author,
  images,
}) {
  try {
    const announcementsRef = collection(db, "announcements");
    const docRef = await addDoc(announcementsRef, {
      title,
      subtitle: subtitle || "",
      content,
      author,
      images: images || [],
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error uploading announcement:", error);
    throw error;
  }
}

// 🔹 Listen for announcements
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
    (error) => console.error("Error listening to announcements:", error),
  );
};

// 🔹 Update announcement
async function updateAnnouncement(id, { title, subtitle, content, images }) {
  const docRef = doc(db, "announcements", id);
  await updateDoc(docRef, {
    title,
    subtitle: subtitle || "",
    content,
    images: images || [],
    updatedAt: serverTimestamp(),
  });
}

// 🔹 Delete announcement
async function deleteAnnouncement(id) {
  const docRef = doc(db, "announcements", id);
  await deleteDoc(docRef);
}

// 🔹 Count likes
async function getLikeCount(announcementId) {
  const likesRef = collection(db, `announcements/${announcementId}/likes`);
  const snapshot = await getDocs(likesRef);
  return snapshot.size;
}

// 🔹 Count comments
async function getCommentCount(announcementId) {
  const commentsRef = collection(
    db,
    `announcements/${announcementId}/comments`,
  );
  const snapshot = await getDocs(commentsRef);
  return snapshot.size;
}

// 🔹 Fetch all comments for modal view (✅ FIXED)
async function getComments(announcementId) {
  try {
    const q = query(
      collection(db, "announcements", announcementId, "comments"),
      orderBy("createdAt", "asc"),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // should include { email, content, createdAt }
    }));
  } catch (error) {
    console.error("Error getting comments:", error);
    return [];
  }
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
  getLikeCount,
  getCommentCount,
  getComments,
};
