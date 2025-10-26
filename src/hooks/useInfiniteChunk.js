// src/hooks/useInfiniteChunk.js
import { useState, useMemo } from "react";

export default function useInfiniteChunk(items = [], chunkSize = 6) {
  const [page, setPage] = useState(1);

  const chunks = useMemo(() => {
    const result = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      result.push(items.slice(i, i + chunkSize));
    }
    return result;
  }, [items, chunkSize]);

  const visible = useMemo(() => chunks.slice(0, page).flat(), [chunks, page]);

  const hasMore = page < chunks.length;

  const loadMore = () => {
    if (hasMore) setPage((p) => p + 1);
  };

  const reset = () => setPage(1);

  return { visible, loadMore, hasMore, reset };
}
