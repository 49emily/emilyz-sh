"use client";

import { useState, useEffect, useRef } from "react";

function Footer() {
  const [count, setCount] = useState(null);
  const [now, setNow] = useState(null);
  const [showChina, setShowChina] = useState(false);
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

  // Live clock, ticking every second.
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatDate = (date, timeZone) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(date);

  const timeZone = showChina ? "Asia/Shanghai" : "America/New_York";
  const label = showChina ? "China time" : "EST";

  return (
    <footer className="mt-auto mb-8 text-sm">
      <div className="mb-3 select-none tracking-[0.5em] text-center">* * *</div>

      <div className="flex items-center font-light justify-between gap-4">
        <p className="text-primary">
          {count !== null ? (
            <span>
              <span className="font-light">you are visitor</span>{" "}
              <span className="font-heavy">#{count.toLocaleString()}</span>.
            </span>
          ) : (
            ""
          )}
        </p>

        {now && (
          <p>
            today is{" "}
            <span
              onMouseEnter={() => setShowChina(true)}
              onMouseLeave={() => setShowChina(false)}
              className="link"
              title="hover to switch between EST and China time"
            >
              {formatDate(now, timeZone)} {label}
            </span>
          </p>
        )}
      </div>
    </footer>
  );
}

export default Footer;
