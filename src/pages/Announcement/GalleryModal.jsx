import React, { useState } from "react";
import { updateAnnouncement } from "../../backend/firebase_firestore";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function GalleryModal({ announcement, onClose, editable }) {
  const [images, setImages] = useState(announcement.images || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!images.length) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="relative w-96 rounded-lg bg-white p-6 text-center shadow-xl dark:bg-neutral-900">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative flex aspect-square w-full max-w-xl flex-col justify-between overflow-hidden rounded-xl bg-white px-16 py-8 shadow-2xl dark:bg-neutral-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full p-2 text-gray-700 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-neutral-800"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-center font-semibold text-gray-800 dark:text-white">
          {announcement.title}
        </h2>
        <p className="text-center text-xs">
          {currentIndex + 1}/{images.length}
        </p>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center overflow-hidden">
          {/* Images Slide */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="flex min-w-full items-center justify-center"
              >
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="max-h-[32vh] w-auto rounded-lg object-contain shadow-lg"
                />
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Indicators */}
        {images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full transition ${
                  idx === currentIndex
                    ? "bg-blue-600"
                    : "bg-gray-400 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        {/* Delete Button */}
        {editable && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleDeleteImage}
              disabled={loading}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
            >
              Delete This Image
            </button>
          </div>
        )}

        {/* Loading Status */}
        {loading && (
          <p className="mt-3 text-center text-sm text-gray-500">
            Updating announcement...
          </p>
        )}
      </div>
    </div>
  );
}
