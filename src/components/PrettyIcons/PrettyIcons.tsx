import React from "react";

import ChevronDownIcon from "../../assets/ChevronDownIcon";
import ChevronLeftIcon from "../../assets/ChevronLeftIcon";
import ChevronRightIcon from "../../assets/ChevronRightIcon";
import ChevronUpIcon from "../../assets/ChevronUpIcon";

import type { PrettyIconsProps } from "../../types/prettyIcons";
import type { Icons } from "../../types/shared";

const PrettyIcons = ({ icon, width, height, color }: PrettyIconsProps) => {
  const iconComponent: Record<Icons, React.ReactNode> = {
    "chevron-down": (
      <ChevronDownIcon width={width} height={height} color={color} />
    ),
    "chevron-left": (
      <ChevronLeftIcon width={width} height={height} color={color} />
    ),
    "chevron-right": (
      <ChevronRightIcon width={width} height={height} color={color} />
    ),
    "chevron-up": <ChevronUpIcon width={width} height={height} color={color} />,
  };

  return iconComponent[icon];
};

export { PrettyIcons };
