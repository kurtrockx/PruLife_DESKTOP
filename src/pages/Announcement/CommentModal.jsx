export default function CommentModal({ announcement, comments, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900">
        <h2 className="mb-4 text-lg font-semibold dark:text-white">
          Comments for "{announcement.title}"
        </h2>

        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No comments yet.
          </p>
        ) : (
          <div className="max-h-80 space-y-3 overflow-y-auto">
            {comments.map((c) => (
              <div
                key={c.id}
                className="rounded-lg bg-gray-100 p-3 dark:bg-neutral-800"
              >
                <p className="text-sm dark:text-gray-200">{c.content}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {c.author}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  — {c.text}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-md bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
