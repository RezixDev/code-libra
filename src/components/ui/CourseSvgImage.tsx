import React from "react";
import { Book, Code, Award } from "lucide-react";

interface CourseSvgImageProps {
  courseId: string;
  title: string;
  level: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

// Function to get a deterministic color based on course title
const getColorFromTitle = (title: string): string => {
  const colors = [
    "#4f46e5", // indigo-600
    "#7c3aed", // violet-600
    "#0891b2", // cyan-600
    "#0d9488", // teal-600
    "#ca8a04", // yellow-600
    "#ea580c", // orange-600
    "#e11d48", // rose-600
    "#7e22ce", // purple-600
  ];
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use the hash to select a color
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Function to get an icon based on course level
const getIconForLevel = (level: string) => {
  switch (level.toLowerCase()) {
    case "beginner":
      return <Book className="text-white" size={32} />;
    case "intermediate":
      return <Code className="text-white" size={32} />;
    case "advanced":
      return <Award className="text-white" size={32} />;
    default:
      return <Book className="text-white" size={32} />;
  }
};

const CourseSvgImage: React.FC<CourseSvgImageProps> = ({
  courseId,
  title,
  level,
  className = "",
  width = "100%",
  height = "100%",
}) => {
  // Generate base color from title for consistency
  const baseColor = getColorFromTitle(title);
  
  // Create a lighter version of the color for the patterns
  const colorLighter = baseColor + "40"; // 40 is hex for 25% opacity
  
  // Get appropriate icon for the course level
  const icon = getIconForLevel(level);
  
  // Create a unique ID for pattern using courseId
  const patternId = `pattern-${courseId.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width="50"
            height="50"
            patternTransform="rotate(45)"
          >
            <rect width="100%" height="100%" fill={baseColor} />
            <circle cx="25" cy="25" r="10" fill={colorLighter} />
          </pattern>
        </defs>
        
        {/* Background */}
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        
        {/* Course title */}
        <foreignObject x="20" y="20" width="360" height="150">
          <div className="text-white font-bold text-xl truncate">
            {title}
          </div>
        </foreignObject>
        
        {/* Course level icon */}
        <foreignObject x="20" y="180" width="50" height="50">
          <div className="flex items-center justify-center">
            {icon}
          </div>
        </foreignObject>
        
        {/* Level text */}
        <foreignObject x="80" y="180" width="100" height="50">
          <div className="text-white text-sm">
            {level}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default CourseSvgImage; 