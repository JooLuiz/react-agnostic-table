import ChevronDownIcon from "../../assets/ChevronDownIcon";
import ChevronUpIcon from "../../assets/ChevronUpIcon";

import type { PrettyIconsProps } from "../../types/prettyIcons";
import type { Icons } from "../../types/shared";

const PrettyIcons = ({ icon, width, height, color }: PrettyIconsProps) => {
  const iconComponent: Record<Icons, any> = {
    "chevron-down": (
      <ChevronDownIcon width={width} height={height} color={color} />
    ),
    "chevron-up": <ChevronUpIcon width={width} height={height} color={color} />,
  };

  return iconComponent[icon];
};

export { PrettyIcons };
