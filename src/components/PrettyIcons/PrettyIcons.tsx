import React from "react";

import AnchorLinkIcon from "../../assets/AnchorLinkIcon";
import BagIcon from "../../assets/BagIcon";
import BagVariantOneIcon from "../../assets/BagVariantOneIcon";
import BagVariantTwoIcon from "../../assets/BagVariantTwoIcon";
import CartIcon from "../../assets/CartIcon";
import CartVariantOneIcon from "../../assets/CartVariantOneIcon";
import CartVariantTwoIcon from "../../assets/CartVariantTwoIcon";
import ChevronDownIcon from "../../assets/ChevronDownIcon";
import ChevronLeftIcon from "../../assets/ChevronLeftIcon";
import ChevronRightIcon from "../../assets/ChevronRightIcon";
import ChevronUpIcon from "../../assets/ChevronUpIcon";
import FacebookIcon from "../../assets/FacebookIcon";
import HalfHeartFilledIcon from "../../assets/HalfHeartFilledIcon";
import HalfHeartIcon from "../../assets/HalfHeartIcon";
import HalfStarFilledIcon from "../../assets/HalfStarFilledIcon";
import HalfStarIcon from "../../assets/HalfStarIcon";
import HeartFilledIcon from "../../assets/HeartFilledIcon";
import HeartIcon from "../../assets/HeartIcon";
import HomeIcon from "../../assets/HomeIcon";
import HomeVariantOneIcon from "../../assets/HomeVariantOneIcon";
import InstagramIcon from "../../assets/InstagramIcon";
import InstagramOldIcon from "../../assets/InstagramOldIcon";
import LocationIcon from "../../assets/LocationIcon";
import LocationVariantOneIcon from "../../assets/LocationVariantOneIcon";
import MenuIcon from "../../assets/MenuIcon";
import MessengerIcon from "../../assets/MessengerIcon";
import ProfileIcon from "../../assets/ProfileIcon";
import ProfileVariantOneIcon from "../../assets/ProfileVariantOneIcon";
import SearchIcon from "../../assets/SearchIcon";
import StarFilledIcon from "../../assets/StarFilledIcon";
import StarIcon from "../../assets/StarIcon";
import TwitterIcon from "../../assets/TwitterIcon";
import WhatsappIcon from "../../assets/WhatsappIcon";

import type { PrettyIconsProps } from "../../types/prettyIcons";
import type { Icons } from "../../types/shared";

const PrettyIcons = ({
  icon,
  width,
  height,
  color,
  className,
}: PrettyIconsProps) => {
  const iconComponent: Record<Icons, React.ReactNode> = {
    "anchor-link": (
      <AnchorLinkIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    bag: (
      <BagIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "bag-variant-1": (
      <BagVariantOneIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "bag-variant-2": (
      <BagVariantTwoIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    cart: (
      <CartIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "cart-variant-1": (
      <CartVariantOneIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "cart-variant-2": (
      <CartVariantTwoIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "chevron-down": (
      <ChevronDownIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "chevron-left": (
      <ChevronLeftIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "chevron-right": (
      <ChevronRightIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "chevron-up": (
      <ChevronUpIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    facebook: (
      <FacebookIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "half-heart-filled": (
      <HalfHeartFilledIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "half-heart": (
      <HalfHeartIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "half-star-filled": (
      <HalfStarFilledIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "half-star": (
      <HalfStarIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "heart-filled": (
      <HeartFilledIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    heart: (
      <HeartIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    home: (
      <HomeIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "home-variant-1": (
      <HomeVariantOneIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    instagram: (
      <InstagramIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "instagram-old": (
      <InstagramOldIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    location: (
      <LocationIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "location-variant-1": (
      <LocationVariantOneIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    menu: (
      <MenuIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    messenger: (
      <MessengerIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    profile: (
      <ProfileIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "profile-variant-1": (
      <ProfileVariantOneIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    search: (
      <SearchIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    "star-filled": (
      <StarFilledIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    star: (
      <StarIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    twitter: (
      <TwitterIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
    whatsapp: (
      <WhatsappIcon
        width={width}
        height={height}
        color={color}
        className={className}
      />
    ),
  };

  return iconComponent[icon];
};

export { PrettyIcons };
