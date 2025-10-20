import React, { useState } from "react";
import {
  uploadAnnouncement,
  updateAnnouncement,
} from "../../backend/firebase_firestore";

export default function CreateAnnouncementModal({ onClose, announcement }) {
  const [title, setTitle] = useState(announcement?.title || "");
  const [subtitle, setSubtitle] = useState(announcement?.subtitle || "");
  const [content, setContent] = useState(announcement?.content || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(announcement?.thumb || null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let fullImageUrl = announcement?.image || null;
    let thumbnailUrl = announcement?.thumb || null;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const IMGBB_API_KEY = "5847a1fb342e1994812f748886598a1b";
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          { method: "POST", body: formData },
        );
        const data = await response.json();
        if (!data.success)
          throw new Error(data.error?.message || "Image upload failed");

        fullImageUrl = data.data.url;
        thumbnailUrl = data.data.thumb.url;
      }

      if (announcement) {
        await updateAnnouncement(announcement.id, {
          title,
          subtitle,
          content,
          image: fullImageUrl,
          thumb: thumbnailUrl,
        });
      } else {
        await uploadAnnouncement({
          title,
          subtitle,
          content,
          author: "Admin",
          imageUrl: fullImageUrl,
          thumbUrl: thumbnailUrl,
        });
      }

      onClose();
    } catch (err) {
      console.error("Error uploading announcement:", err);
      alert("Failed to upload announcement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-8">
      <div className="w-3xl">
        <form
          onSubmit={handleSubmit}
          className="flex max-h-[80dvh] w-full flex-col gap-4 overflow-y-scroll rounded-lg bg-white p-6"
        >
          <h2 className="text-xl font-semibold">
            {announcement ? "Edit Announcement" : "Create Announcement"}
          </h2>

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
            className="rounded border border-black/40 p-2 hover:shadow-md min-h-12"
            required
          />

          <div className="w-fit rounded-md border border-black/20 px-2 hover:shadow-md">
            <input
              className="cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-60 w-full rounded-lg object-cover"
            />
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-2 cursor-pointer hover:bg-black/10"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-yellow-500 px-4 py-2 text-black cursor-pointer hover:bg-yellow-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
