import { IconProps } from "../../types/shared";

//Icon Link: https://www.svgrepo.com/svg/532195/menu
const MenuIcon = ({ width, height, color, className }: IconProps) => {
  return (
    <svg
      width={width ? width : 32}
      height={height ? height : 32}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`menu-icon ${className}`}
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke={color ? color : "#000000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { MenuIcon };
