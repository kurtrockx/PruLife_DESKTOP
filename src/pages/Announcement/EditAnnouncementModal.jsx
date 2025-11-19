import React, { useState } from "react";
import { updateAnnouncement } from "../../backend/firebase_firestore";

export default function EditAnnouncementModal({ onClose, announcement }) {
  const [title, setTitle] = useState(announcement?.title || "");
  const [subtitle, setSubtitle] = useState(announcement?.subtitle || "");
  const [content, setContent] = useState(announcement?.content || "");
  const [images, setImages] = useState(announcement?.images || []);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...files]);
  };

  const removeExistingImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedUrls = [];

      // Upload new images to Cloudinary
      for (const file of newFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "announcements"); // SAME AS CREATE

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dsoetkfjz/image/upload`,
          { method: "POST", body: formData },
        );

        const data = await res.json();
        if (data.secure_url) uploadedUrls.push(data.secure_url);
      }

      const allImages = [...images, ...uploadedUrls];

      await updateAnnouncement(announcement.id, {
        title,
        subtitle,
        content,
        images: allImages,
      });

      showAlert(
        <h1 className="dark:text-white">
          ✅ Announcement updated successfully!
        </h1>,
      );
    } catch (error) {
      console.error("Error updating announcement:", error);
      showAlert(
        <h1 className="dark:text-white">❌ Failed to update announcement.</h1>,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900">
        <form
          onSubmit={handleSubmit}
          className="flex max-h-[80dvh] w-full flex-col gap-4 overflow-y-auto"
        >
          <h2 className="text-xl font-semibold dark:text-white">
            Edit Announcement
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border border-black/30 bg-white p-2 text-black hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200"
            required
          />

          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="rounded border border-black/30 bg-white p-2 text-black hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200"
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="min-h-12 rounded border border-black/30 bg-white p-2 text-black hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200"
            required
          />

          <div className="w-fit rounded-md border border-black/20 px-2 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="dark:text-gray-200"
            />
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt="announcement"
                  className="h-24 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(i)}
                  className="absolute top-1 right-1 rounded-full bg-black/60 px-2 text-white"
                >
                  ✕
                </button>
              </div>
            ))}

            {newFiles.map((file, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="new upload"
                  className="h-24 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeNewFile(i)}
                  className="absolute top-1 right-1 rounded-full bg-black/60 px-2 text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded border px-4 py-2 text-black hover:bg-black/10 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded bg-yellow-400 px-4 py-2 font-semibold text-black hover:bg-yellow-500 dark:hover:bg-yellow-400/90"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Custom Alert */}
      {alertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-full max-w-sm flex-col justify-center rounded bg-white p-6 shadow-lg dark:bg-neutral-900">
            <p className="mb-4">{alertMessage}</p>
            <button
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              onClick={() => setAlertOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
