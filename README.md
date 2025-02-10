# js-pretty-icons

JS Pretty Icons is a component library with a lot of beautiful and customizable icons, all of them from SVGRepo website.

## Installation

```bash
npm install js-pretty-icons
```

## Usage

import PrettyIcons from 'js-pretty-icons';

#### Basic usage

```typescript
<PrettyIcons icon="chevron-down" />
```

#### With custom width, height, and color

```typescript
<PrettyIcons icon="chevron-up" width={32} height={32} color="#FF0000" />
```

## Props

| Prop     | Tipo   | Descrição                   | Obrigatório |
| -------- | ------ | --------------------------- | ----------- |
| `icon`   | string | Icon to be showed.          | Sim         |
| `width`  | number | Icon width in pixels        | Não         |
| `height` | number | Icon height in pixels.      | Não         |
| `color`  | string | Icon color (ex: "#FF0000"). | Não         |

## Available Icons

- anchor-link
- bag
- bag-variant-1
- bag-variant-2
- cart
- cart-variant-1
- cart-variant-2
- chevron-down
- chevron-left
- chevron-right
- chevron-up
- facebook
- half-heart-filled
- half-heart
- half-star-filled
- half-star
- heart
- heart-filled
- home
- home-variant-1
- instagram
- instagram-old
- location
- location-variant-1
- menu
- messenger
- profile
- profile-variant-1
- search
- star-filled
- star
- twitter
- whatsapp

All icons are sourced from [SVG Repo](https://www.svgrepo.com/) and you can find the icon page on the icon file inside `assets` folder.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT
