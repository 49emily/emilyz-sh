"use client";

import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { useState } from "react";

const ExternalLink = ({ href, children, className = "link", showIcon = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const shouldShowIcon = showIcon;

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {shouldShowIcon && isHovered && <ExternalLinkIcon className="ml-1 w-4 h-4 inline" />}
    </a>
  );
};

export default ExternalLink;
