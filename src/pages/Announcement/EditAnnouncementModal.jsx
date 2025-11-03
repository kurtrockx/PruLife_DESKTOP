import React, { useState } from "react";
import { updateAnnouncement } from "../../backend/firebase_firestore";

export default function EditAnnouncementModal({ onClose, announcement }) {
  const [title, setTitle] = useState(announcement?.title || "");
  const [subtitle, setSubtitle] = useState(announcement?.subtitle || "");
  const [content, setContent] = useState(announcement?.content || "");
  const [images, setImages] = useState(announcement?.images || []);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(false);

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

      // upload new files to imgbb
      for (const file of newFiles) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=5847a1fb342e1994812f748886598a1b`,
          { method: "POST", body: formData },
        );

        const data = await res.json();
        if (data.success) uploadedUrls.push(data.data.url);
      }

      const allImages = [...images, ...uploadedUrls];

      await updateAnnouncement(announcement.id, {
        title,
        subtitle,
        content,
        images: allImages,
      });

      onClose();
    } catch (error) {
      console.error("Error updating announcement:", error);
      alert("Failed to update announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex max-h-[80dvh] w-full flex-col gap-4 overflow-y-scroll rounded-lg bg-white p-6"
        >
          <h2 className="text-xl font-semibold">Edit Announcement</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border border-black/40 p-2 hover:shadow-md"
            required
          />

          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="rounded border border-black/40 p-2 hover:shadow-md"
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="min-h-12 rounded border border-black/40 p-2 hover:shadow-md"
            required
          />

          <div className="w-fit rounded-md border border-black/20 px-2 hover:shadow-md">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Images Section */}
          <div className="grid grid-cols-3 gap-2">
            {/* Existing images */}
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

            {/* New local files */}
            {newFiles.map((file, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="new file"
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
              className="rounded border px-4 py-2 hover:bg-black/10"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-yellow-500 px-4 py-2 text-black hover:bg-yellow-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
