import React, { useState } from "react";
import { updateAnnouncement } from "../../backend/firebase_firestore";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function GalleryModal({ announcement, onClose, editable }) {
  const [images, setImages] = useState(announcement.images || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!images.length) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
        <div className="relative rounded-lg bg-white p-6 text-center shadow-lg dark:bg-neutral-900">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
          >
            <X size={20} />
          </button>
          <p className="text-gray-600">
            No images available for this announcement.
          </p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDeleteImage = async () => {
    const updated = images.filter((_, i) => i !== currentIndex);
    setImages(updated);
    setCurrentIndex((prev) =>
      prev >= updated.length ? updated.length - 1 : prev,
    );

    if (editable) {
      setLoading(true);
      await updateAnnouncement(announcement.id, {
        ...announcement,
        images: updated,
      });
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-5000 flex items-center justify-center bg-black/80 p-4">
      <div className="relative aspect-square h-[60dvh] overflow-hidden rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full p-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-neutral-800"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="mb-3 text-center text-lg font-semibold text-gray-800 dark:text-white">
          {announcement.title} — {currentIndex + 1}/{images.length}
        </h2>

        {/* Image Slideshow */}
        <div className="relative flex h-[calc(60dvh-100px)] items-center justify-center">
          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image Container */}
          <div className="h-full max-h-full w-full max-w-full overflow-hidden rounded-lg">
            <img
              src={images[currentIndex]}
              alt="announcement"
              className="h-full w-full object-contain p-4 transition-all"
            />
          </div>

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Delete + Status */}
        {editable && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleDeleteImage}
              disabled={loading}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-50"
            >
              Delete This Image
            </button>
          </div>
        )}

        {loading && (
          <p className="mt-2 text-center text-sm text-gray-500">
            Updating announcement...
          </p>
        )}
      </div>
    </div>
  );
}
