# js-pretty-icons

JS Pretty Icons is a component library with a lot of beautiful and customizable icons, all of them from SVGRepo website.

## Installation

```bash
npm install js-pretty-icons
```

## Usage

#### Recommended Usage

You can import a PrettyIcon Component from "js-pretty-icons" library as a default import.

```typescript
import PrettyIcons from "js-pretty-icons";

// Without custom width, height, color and className
return <PrettyIcons icon="chevron-down" />;

// With custom width, height, color and className
return (
  <PrettyIcons
    icon="chevron-up"
    width={32}
    height={32}
    color="#FF0000"
    className="custom-class-chevron-down"
  />
);
```

#### Other Usage

You can import the specific Icon Component from "js-pretty-icons" library as a non-default import.

```typescript
import { ChevronDownIcon } from "js-pretty-icons";

// Without custom width, height, color and className
return <ChevronDownIcon />;

// With custom width, height, color and className
return (
  <ChevronDownIcon
    width={32}
    height={32}
    color="#FF0000"
    className="custom-class-chevron-down"
  />
);
```

## Props

| Prop        | Tipo   | Descrição                                                                          | Obrigatório |
| ----------- | ------ | ---------------------------------------------------------------------------------- | ----------- |
| `icon`      | string | Icon to be showed.                                                                 | Sim         |
| `width`     | number | Icon width in pixels (default: 32px).                                              | Não         |
| `height`    | number | Icon height in pixels (default: 32px).                                             | Não         |
| `color`     | string | Icon color (default: "#000000").                                                   | Não         |
| `className` | string | Icon className (always includes {icon-name}-icon classes, i.e. chevron-down-icon). | Não         |

## Available Icons

<table>
<tr></tr>
<tr>
<td>

| Name           | Icon                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------ |
| anchor-link    | <img src="./public/assets/anchor-link-svgrepo-com.svg" width="32" height="32">             |
| bag            | <img src="./public/assets/bag-shopping-svgrepo-com.svg" width="32" height="32">            |
| bag-variant-1  | <img src="./public/assets/bag-svgrepo-com.svg" width="32" height="32">                     |
| bag-variant-2  | <img src="./public/assets/cart-2-svgrepo-com.svg" width="32" height="32">                  |
| cart           | <img src="./public/assets/cart-shopping-svgrepo-com.svg" width="32" height="32">           |
| cart-variant-1 | <img src="./public/assets/cart-large-minimalistic-svgrepo-com.svg" width="32" height="32"> |
| cart-variant-2 | <img src="./public/assets/cart-large-2-svgrepo-com.svg" width="32" height="32">            |
| chevron-down   | <img src="./public/assets/chevron-down-svgrepo-com.svg" width="32" height="32">            |
| chevron-left   | <img src="./public/assets/chevron-left-svgrepo-com.svg" width="32" height="32">            |
| chevron-right  | <img src="./public/assets/chevron-right-svgrepo-com.svg" width="32" height="32">           |
| chevron-up     | <img src="./public/assets/chevron-up-svgrepo-com.svg" width="32" height="32">              |

</td>
<td>

| Name              | Icon                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------ |
| facebook          | <img src="./public/assets/facebook-svgrepo-com.svg" width="32" height="32">          |
| half-heart-filled | <img src="./public/assets/heart-half-filled-svgrepo-com.svg" width="32" height="32"> |
| half-heart        | <img src="./public/assets/heart-half-svgrepo-com.svg" width="32" height="32">        |
| half-star-filled  | <img src="./public/assets/star-half-svgrepo-com.svg" width="32" height="32">         |
| half-star         | <img src="./public/assets/star-sharp-half-svgrepo-com.svg" width="32" height="32">   |
| heart-filled      | <img src="./public/assets/heart-filled-svgrepo-com.svg" width="32" height="32">      |
| heart             | <img src="./public/assets/heart-svgrepo-com.svg" width="32" height="32">             |
| home              | <img src="./public/assets/home-svgrepo-com.svg" width="32" height="32">              |
| home-variant-1    | <img src="./public/assets/home-1-svgrepo-com.svg" width="32" height="32">            |
| instagram         | <img src="./public/assets/instagram-svgrepo-com.svg" width="32" height="32">         |
| instagram-old     | <img src="./public/assets/instagram-old-svgrepo-com.svg" width="32" height="32">     |

</td>
<td>

| Name               | Icon                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------- |
| location           | <img src="./public/assets/location-svgrepo-com.svg" width="32" height="32">           |
| location-variant-1 | <img src="./public/assets/location-pin-alt-svgrepo-com.svg" width="32" height="32">   |
| menu               | <img src="./public/assets/menu-svgrepo-com.svg" width="32" height="32">               |
| messenger          | <img src="./public/assets/facebook-messenger-svgrepo-com.svg" width="32" height="32"> |
| profile            | <img src="./public/assets/profile-round-1342-svgrepo-com.svg" width="32" height="32"> |
| profile-variant-1  | <img src="./public/assets/profile-svgrepo-com.svg" width="32" height="32">            |
| search             | <img src="./public/assets/search-svgrepo-com.svg" width="32" height="32">             |
| star-filled        | <img src="./public/assets/star-svgrepo-com.svg" width="32" height="32">               |
| star               | <img src="./public/assets/star-sharp-svgrepo-com.svg" width="32" height="32">         |
| twitter            | <img src="./public/assets/twitter-svgrepo-com.svg" width="32" height="32">            |
| whatsapp           | <img src="./public/assets/whatsapp-svgrepo-com.svg" width="32" height="32">           |

</td>
</tr>
</table>

All icons are sourced from [SVG Repo](https://www.svgrepo.com/) and you can find the icon page on the icon file inside `assets` folder.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT
