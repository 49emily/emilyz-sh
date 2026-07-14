"use client";

import { useState, useEffect, useRef } from "react";

function VisitorCount() {
  const [count, setCount] = useState(null);
  const hasFetched = useRef(false);

  // Fetch + increment the visitor count once per page load.
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
  }, []);

  return (
    <p className="mt-4 max-w-[60vw] font-mono text-sm text-accent break-words">
      welcome visitor #{count !== null ? count.toLocaleString() : "___"}!
    </p>
  );
}

export default VisitorCount;
