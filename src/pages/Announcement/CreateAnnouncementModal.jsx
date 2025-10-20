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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="flex w-96 flex-col gap-4 rounded-lg bg-white p-6"
      >
        <h2 className="text-xl font-semibold">
          {announcement ? "Edit Announcement" : "Create Announcement"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded border p-2"
          required
        />

        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="rounded border p-2"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="rounded border p-2"
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-2 h-32 w-full rounded-lg object-cover"
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded border px-4 py-2"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-yellow-500 px-4 py-2 text-black"
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
