# js-pretty-icons

A React component library for beautiful and customizable icons.

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
<PrettyIcons icon="chevron-up" width="32" height="32" color="#FF0000" />
```

## Available Icons

- chevron-down
- chevron-up

All icons are sourced from [SVG Repo](https://www.svgrepo.com/) and you can find the icon page on the icon file inside `assets` folder.

## Props

| Prop     | Tipo   | Descrição                   | Obrigatório |
| -------- | ------ | --------------------------- | ----------- |
| `icon`   | string | Icon to be showed.          | Sim         |
| `width`  | number | Icon width in pixels        | Não         |
| `height` | number | Icon height in pixels.      | Não         |
| `color`  | string | Icon color (ex: "#FF0000"). | Não         |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT
