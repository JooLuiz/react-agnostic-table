import { IconProps } from "../../types/shared";

//Icon Link: https://www.svgrepo.com/svg/535441/heart-half
const HalfHeartFilledIcon = ({
  width,
  height,
  color,
  className,
}: IconProps) => {
  return (
    <svg
      width={width ? width : 32}
      height={height ? height : 32}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`half-heart-filled-icon ${className}`}
    >
      <path
        d="M1.24264 8.24264L8 15V3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"
        fill={color ? color : "#000000"}
      />
    </svg>
  );
};

export { HalfHeartFilledIcon };
