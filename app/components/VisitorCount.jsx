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
    <p className="mt-6 font-mono text-xs text-secondary">
      welcome visitor #{count !== null ? count.toLocaleString() : "___"}!
    </p>
  );
}

export default VisitorCount;
