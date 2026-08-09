"use client";

import { useState, useEffect } from "react";

// This renders in both MobileNavigation and DesktopNavigation, so two instances
// mount on every page load — only one is ever visible, but the other is hidden
// by CSS rather than unmounted, so it still runs its effects. Each mount used to
// fire its own /api/visitors request, and on a first visit neither had the
// cookie yet, so the counter incremented once per mount instead of once per
// visitor.
//
// Sharing a single module-level promise means one request per page load no
// matter how many instances mount, and every instance displays the same number.
let pendingRequest = null;

function fetchVisitorCount() {
  if (!pendingRequest) {
    pendingRequest = fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => (typeof data.count === "number" ? data.count : null))
      .catch(() => null);
  }

  return pendingRequest;
}

function VisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let active = true;

    fetchVisitorCount().then((value) => {
      if (active && value !== null) setCount(value);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <p className="mt-4 max-w-[60vw] font-mono text-sm text-accent break-words">
      welcome visitor #{count !== null ? count.toLocaleString() : "___"}!
    </p>
  );
}

export default VisitorCount;
