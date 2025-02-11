import { IconProps } from "../../types/shared";

//Icon Link: https://www.svgrepo.com/svg/533661/chevron-right
const ChevronRightIcon = ({ width, height, color, className }: IconProps) => {
  return (
    <svg
      width={width ? width : 32}
      height={height ? height : 32}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`chevron-right-icon ${className}`}
    >
      <path
        d="M9 6L15 12L9 18"
        stroke={color ? color : "#000000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { ChevronRightIcon };
