import { IconProps } from "../../types/shared";

//Icon Link: https://www.svgrepo.com/svg/533653/chevron-down
const ChevronDownIcon = ({ width, height, color, className }: IconProps) => {
  return (
    <svg
      width={width ? width : 32}
      height={height ? height : 32}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`chevron-down-icon ${className}`}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={color ? color : "#000000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { ChevronDownIcon };
