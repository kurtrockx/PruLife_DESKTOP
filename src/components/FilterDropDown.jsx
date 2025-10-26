// src/components/FilterDropdown.jsx
import { useMemo } from "react";

export default function FilterDropdown({
  announcements,
  selectedAuthor,
  setSelectedAuthor,
  selectedRange,
  setSelectedRange,
}) {
  const authors = useMemo(() => {
    const set = new Set();
    announcements.forEach((a) => a.author && set.add(a.author));
    return Array.from(set).sort();
  }, [announcements]);

  const ranges = [
    { id: "all", label: "All time" },
    { id: "7", label: "Last 7 days" },
    { id: "30", label: "Last 30 days" },
    { id: "90", label: "Last 90 days" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={selectedAuthor ?? "all"}
        onChange={(e) =>
          setSelectedAuthor(e.target.value === "all" ? null : e.target.value)
        }
        className="rounded-md border px-3 py-1 text-sm"
      >
        <option value="all">All authors</option>
        {authors.map((author) => (
          <option key={author} value={author}>
            {author}
          </option>
        ))}
      </select>

      <select
        value={selectedRange}
        onChange={(e) => setSelectedRange(e.target.value)}
        className="rounded-md border px-3 py-1 text-sm"
      >
        {ranges.map((r) => (
          <option key={r.id} value={r.id}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}
