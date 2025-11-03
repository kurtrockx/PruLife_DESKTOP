import { useState, useEffect } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import GalleryModal from "./GalleryModal";
import EditAnnouncementModal from "./EditAnnouncementModal";
import {
  listenToAnnouncements,
  deleteAnnouncement,
} from "../../backend/firebase_firestore";
import Swal from "sweetalert2";

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const unsubscribe = listenToAnnouncements(setAnnouncements);
    return () => unsubscribe();
  }, []);

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      a.author.toLowerCase().includes(searchInput.toLowerCase()),
  );

  // === CREATE MODAL ===
  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  // === EDIT MODAL ===
  const openEditModal = (announcement) => {
    setEditingAnnouncement(announcement);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setEditingAnnouncement(null);
    setShowEditModal(false);
  };

  // === GALLERY MODAL ===
  const openGalleryModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowGallery(true);
  };
  const closeGalleryModal = () => {
    setSelectedAnnouncement(null);
    setShowGallery(false);
  };

  // === DELETE ANNOUNCEMENT ===
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
      <div className="mx-auto flex h-[80dvh] w-[80dvw] items-center overflow-hidden rounded-md shadow-[0_0_10px] shadow-black/20">
        <div className="flex h-full w-full flex-col bg-black/10">
          <AnnouncementHeader
            openModal={openCreateModal}
            setSearchInput={setSearchInput}
          />

          <div className="h-full overflow-y-scroll">
            <AnnouncementList
              announcements={filteredAnnouncements}
              handleDelete={handleDelete}
              openEditModal={openEditModal}
              openGalleryModal={openGalleryModal}
            />
          </div>

          {/* Modals */}
          {showCreateModal && (
            <CreateAnnouncementModal onClose={closeCreateModal} />
          )}
          {showEditModal && (
            <EditAnnouncementModal
              onClose={closeEditModal}
              announcement={editingAnnouncement}
            />
          )}
          {showGallery && (
            <GalleryModal
              announcement={selectedAnnouncement}
              onClose={closeGalleryModal}
              editable={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ================= Announcement List =================
function AnnouncementList({
  announcements,
  handleDelete,
  openEditModal,
  openGalleryModal,
}) {
  if (!announcements.length)
    return (
      <p className="py-8 text-center text-gray-500 dark:text-gray-400">
        No announcements found.
      </p>
    );

return (
  <div className="grid gap-3 bg-transparent p-4">
    {announcements.map((a) => (
      <div
        key={a.id}
        className="group flex flex-col gap-4 rounded-xl bg-white/80 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] lg:flex-row lg:items-center lg:justify-between dark:bg-neutral-900/70 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] dark:hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]"
      >
        {/* Left Section (Images + Text) */}
        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
          {/* Image Preview */}
          {a.images && a.images.length > 0 && (
            <div
              className="flex cursor-pointer gap-2"
              onClick={() => openGalleryModal(a)}
            >
              {a.images.slice(0, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="h-20 w-20 rounded-lg border border-gray-300/40 object-cover shadow-sm lg:h-14 lg:w-14 dark:border-white/10"
                />
              ))}
              {a.images.length > 3 && (
                <button className="flex h-20 w-20 items-center justify-center rounded-lg border border-gray-300/40 bg-gray-100/70 text-[.7rem] font-semibold hover:bg-gray-200 lg:h-14 lg:w-14 dark:bg-neutral-800/70 dark:text-white dark:hover:bg-neutral-700">
                  +{a.images.length - 3}
                </button>
              )}
            </div>
          )}

          {/* Text Info */}
          <div className="flex flex-1 flex-col">
            <h2 className="text-base font-semibold tracking-tight text-gray-800 lg:text-lg dark:text-white">
              {a.title}
            </h2>
            {a.subtitle && (
              <h3 className="text-xs text-gray-500 italic lg:text-sm dark:text-yellow-600">
                {a.subtitle}
              </h3>
            )}
            <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
              {a.content}
            </p>

            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-gray-500 lg:text-xs dark:text-gray-400">
              <span className="rounded-md bg-gray-200/60 px-2 py-0.5 dark:bg-neutral-800">
                {a.author}
              </span>
              <span className="rounded-md bg-gray-200/60 px-2 py-0.5 dark:bg-neutral-800">
                {a.createdAt?.toDate?.().toLocaleDateString?.() ?? ""}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 flex justify-end gap-2 opacity-100 transition-opacity duration-200 lg:mt-0 lg:justify-center lg:opacity-0 lg:group-hover:opacity-100">
          <button
            onClick={() => openEditModal(a)}
            className="rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-1.5 text-xs font-semibold text-black shadow-sm transition-all hover:from-yellow-500 hover:to-yellow-600 lg:text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(a.id)}
            className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:from-red-600 hover:to-red-700 lg:text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

}
// ================= Header =================
function AnnouncementHeader({ openModal, setSearchInput }) {
  const InputStylish =
    "shadow-[0_0_0_1.5px] shadow-red-900/0 duration-200 focus-within:shadow-yellow-500 hover:shadow-yellow-500 dark:focus-within:shadow-white dark:hover:shadow-white dark:border-white/40";

  return (
    <div className="flex flex-col gap-3 bg-white px-4 py-3 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:bg-neutral-900">
      {/* Search Input */}
      <div
        className={`flex w-full items-center rounded-xl border px-4 py-2 transition-all lg:max-w-md ${InputStylish}`}
      >
        <input
          type="text"
          placeholder="Search announcements..."
          className="flex-1 bg-transparent text-sm outline-none dark:text-white dark:placeholder-white/60"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          className="ml-2 max-h-6 opacity-50 dark:invert"
        />
      </div>

      {/* Create Button */}
      <button
        onClick={openModal}
        className="w-full rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-sm transition-all hover:bg-yellow-500 sm:w-auto sm:rounded-md"
      >
        + New Announcement
      </button>
    </div>
  );
}
