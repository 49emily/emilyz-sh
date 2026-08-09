"use client";

import { useState, useEffect, useRef } from "react";

function VisitorCount() {
  const [count, setCount] = useState(null);
  // Guards against StrictMode's deliberate double-invoke in development, which
  // would otherwise increment the counter twice on every dev page load.
  const hasFetched = useRef(false);

  // Only one navigation is mounted at a time, so this runs once per page load.
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
