import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ExternalLink = ({ href, children, className = "link", showIcon = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Don't show icon for mailto links

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
      {shouldShowIcon && isHovered && (
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1 text-sm" />
      )}
    </a>
  );
};

export default ExternalLink;
