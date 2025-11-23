"use client";

import { useState, useEffect } from "react";

function LocationDistance() {
  const [distance, setDistance] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Emily's approximate location
  const emilyLocation = { lat: 40.650002, lng: -73.949997 };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in miles
  };

  // Typing animation effect
  useEffect(() => {
    if (distance !== null) {
      const fullText = `you are ${distance.toLocaleString()} miles away from zsh`;
      setIsTyping(true);
      setTypedText("");

      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 50); // 50ms per character

      return () => clearInterval(typingInterval);
    }
  }, [distance]);

  // Get user's geolocation and calculate distance
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const dist = calculateDistance(userLat, userLng, emilyLocation.lat, emilyLocation.lng);
          setDistance(Math.round(dist));
        },
        () => {
          setLocationError("Location access denied");
        }
      );
    } else {
      setLocationError("Geolocation not supported");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-6 w-50 max-w-[60vw]">
      {distance !== null && (
        <div className="flex items-center gap-2 mb-2 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>

          <p className="text-sm italic font-semilight text-primary break-words min-w-0 flex-1 leading-tight">
            {typedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>
      )}
      {locationError && <p className="text-md text-muted italic">location unknown</p>}
    </div>
  );
}

export default LocationDistance;
