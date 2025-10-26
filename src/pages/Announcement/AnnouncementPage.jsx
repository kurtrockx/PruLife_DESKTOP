import { useState, useEffect } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import {
  listenToAnnouncements,
  deleteAnnouncement,
} from "../../backend/firebase_firestore";
import Swal from "sweetalert2";

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  useEffect(() => {
    const unsubscribe = listenToAnnouncements(setAnnouncements);
    return () => unsubscribe();
  }, []);

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      a.author.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const openModal = (announcement = null) => {
    setEditingAnnouncement(announcement);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingAnnouncement(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this announcement?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#1a1a1a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await deleteAnnouncement(id);
        Swal.fire({
          title: "Deleted!",
          text: "The announcement has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#fff",
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "Failed to delete the announcement.",
          icon: "error",
          background: "#1a1a1a",
          color: "#fff",
        });
      }
    }
  };

  return (
    <div className="from-white-50 flex flex-1 items-center justify-center bg-gradient-to-br via-neutral-300 to-white dark:from-neutral-700 dark:via-neutral-950 dark:to-black">
      <div className="mx-auto flex w-[80dvw] items-center overflow-hidden rounded-md shadow-[0_0_10px] shadow-black/20">
        <div className="flex h-full max-h-[80dvh] w-full flex-col bg-black/10">
          <AnnouncementHeader
            openModal={openModal}
            setSearchInput={setSearchInput}
          />
          <div className="h-full overflow-y-scroll">
            <AnnouncementList
              announcements={filteredAnnouncements}
              handleDelete={handleDelete}
              openModal={openModal}
            />
          </div>
          {showModal && (
            <CreateAnnouncementModal
              onClose={closeModal}
              announcement={editingAnnouncement}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ================= Announcement List =================
function AnnouncementList({ announcements, handleDelete, openModal }) {
  if (!announcements.length)
    return (
      <p className="py-8 text-center text-gray-500">No announcements found.</p>
    );

  return (
    <div className="grid grid-cols-1 gap-4 p-2 lg:grid-cols-2 xl:grid-cols-1 dark:bg-neutral-900">
      {announcements.map((a) => (
        <div
          key={a.id}
          className="flex flex-col justify-between gap-4 rounded-xl bg-white p-4 shadow transition duration-200 hover:shadow-md xl:flex-row xl:items-center dark:border dark:border-white/40 dark:bg-black"
        >
          <div className="flex justify-center rounded-xl bg-gray-200 p-2 md:justify-end lg:justify-center xl:w-64 dark:bg-neutral-700">
            {a.thumb && (
              <img
                src={a.thumb}
                alt="announcement"
                className="h-64 rounded-lg object-contain"
              />
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1 md:gap-2 md:px-4">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
              {a.title}
            </h2>
            {a.subtitle && (
              <h3 className="text-sm text-gray-500 italic dark:text-yellow-600">
                {a.subtitle}
              </h3>
            )}
            <p className="line-clamp-3 overflow-hidden text-justify text-sm text-gray-600 dark:text-white">
              {a.content}
            </p>
            <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-red-700">
              <span>{a.author}</span>
              <span>{a.createdAt?.toDate?.().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-3 flex justify-end gap-2 md:mt-0">
            <button
              onClick={() => openModal(a)}
              className="group flex items-center gap-2 rounded-lg border border-blue-400/40 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-blue-500 hover:bg-blue-500/20 hover:shadow-blue-400/30 dark:text-blue-300 dark:hover:border-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487a2.06 2.06 0 112.915 2.914L7.622 19.557l-4.243.707.707-4.243L16.862 4.487z"
                />
              </svg>
              Edit
            </button>

            <button
              onClick={() => handleDelete(a.id)}
              className="group flex items-center gap-2 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-1.5 text-sm font-semibold text-red-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-red-500 hover:bg-red-500/20 hover:shadow-red-400/30 dark:text-red-400 dark:hover:border-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7h12M9 7V4h6v3m2 0v13a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ================= Announcement Header =================
function AnnouncementHeader({ openModal, setSearchInput }) {
  const InputStylish =
    "shadow-[0_0_0_1.5px] shadow-red-950/0 duration-200 focus-within:shadow-yellow-500 hover:shadow-yellow-500 dark:focus-within:shadow-white dark:hover:shadow-white";

  return (
    <div className="sticky top-0 z-10 flex flex-col gap-4 bg-white shadow-md dark:bg-black dark:text-white">
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/40">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <button
          onClick={() => openModal()}
          className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-600"
        >
          New Announcement
        </button>
      </div>

      <div
        className={`mx-4 my-2 flex w-full max-w-md items-center rounded-xl border px-4 py-2 ${InputStylish}`}
      >
        <input
          type="text"
          placeholder="Search announcements..."
          className="flex-1 outline-none"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          className="max-h-6 opacity-50 dark:invert"
        />
      </div>
    </div>
  );
}
