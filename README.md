# React Prize Wheel

A highly customizable, animated prize wheel component for React applications with TypeScript support.

## Demo

[Live Demo](https://mertercelik.github.io/react-prize-wheel/)

## Installation

```bash
npm install react-prize-wheel
```

```bash
yarn add react-prize-wheel
```

```bash
pnpm add react-prize-wheel
```

## Quick Start

```tsx
import { useRef } from 'react';
import { PrizeWheel } from 'react-prize-wheel';
import type { Sector, PrizeWheelRef } from 'react-prize-wheel';

function App() {
  const wheelRef = useRef<PrizeWheelRef>(null);

  const sectors: Sector[] = [
    { id: 1, label: 'Prize 1', probability: 10 },
    { id: 2, label: 'Prize 2', probability: 20 },
    { id: 3, label: 'Prize 3', probability: 15 },
    { id: 4, label: 'Prize 4', probability: 5 },
  ];

  const handleSpinEnd = (sector: Sector) => {
    console.log('Winner:', sector.label);
  };

  return (
    <div>
      <PrizeWheel
        ref={wheelRef}
        sectors={sectors}
        onSpinEnd={handleSpinEnd}
      />
      <button onClick={() => wheelRef.current?.spin()}>
        Spin the Wheel
      </button>
    </div>
  );
}
```

## API Reference

### PrizeWheel Component

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sectors` | `Sector[]` | **required** | Array of prize sectors |
| `onSpinStart` | `() => void` | `undefined` | Callback fired when spin starts |
| `onSpinEnd` | `(sector: Sector) => void` | `undefined` | Callback fired when spin ends with winning sector |
| `duration` | `number` | `4` | Spin duration in seconds |
| `minSpins` | `number` | `5` | Minimum number of full rotations |
| `maxSpins` | `number` | `8` | Maximum number of full rotations |

#### Customization Props

##### Colors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frameColor` | `string` | `'#ddd'` | Outer frame color |
| `middleColor` | `string` | `'#ddd'` | Center circle color |
| `middleDotColor` | `string` | `'#bbb'` | Center dot color |
| `winIndicatorColor` | `string` | `'#ddd'` | Win indicator arrow color |
| `winIndicatorDotColor` | `string` | `'#bbb'` | Win indicator dot color |
| `sticksColor` | `string` | `'#ddd'` | Divider sticks color |
| `wheelColors` | `[string, string]` | `['#1592e8', '#14c187']` | Alternating sector colors |
| `borderColor` | `string` | `'#ddd'` | Sector border color |
| `textColor` | `string` | `'#fff'` | Sector text color |

##### Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderWidth` | `number` | `2` | Sector border width in pixels |
| `textFontSize` | `number` | `18` | Sector text font size in pixels |

##### Shadows

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `wheelShadowColor` | `string` | `'#000'` | Wheel shadow color |
| `wheelShadowOpacity` | `number` | `0.15` | Wheel shadow opacity (0-1) |
| `middleShadowColor` | `string` | `'#000'` | Middle circle shadow color |
| `middleShadowOpacity` | `number` | `0.2` | Middle circle shadow opacity (0-1) |
| `indicatorShadowColor` | `string` | `'#000'` | Indicator shadow color |
| `indicatorShadowOpacity` | `number` | `0.22` | Indicator shadow opacity (0-1) |

### Sector Interface

```typescript
interface Sector {
  id: number | string;
  label: string;
  text?: string;
  probability?: number;
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number \| string` | Yes | Unique identifier for the sector |
| `label` | `string` | Yes | Label returned in callbacks |
| `text` | `string` | No | Text displayed on the sector (defaults to label) |
| `probability` | `number` | No | Relative probability weight (default: 10) |

### Ref API

The component exposes a ref with the following methods and properties:

```typescript
interface PrizeWheelRef {
  spin: () => void;
  isSpinning: boolean;
}
```

| Member | Type | Description |
|--------|------|-------------|
| `spin` | `() => void` | Programmatically trigger a spin |
| `isSpinning` | `boolean` | Current spinning state |

## Advanced Usage

### Custom Button with State

```tsx
import { useRef, useState } from 'react';
import { PrizeWheel } from 'react-prize-wheel';
import type { Sector, PrizeWheelRef } from 'react-prize-wheel';

function App() {
  const wheelRef = useRef<PrizeWheelRef>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Sector | null>(null);

  const handleSpinStart = () => {
    setIsSpinning(true);
    setWinner(null);
  };

  const handleSpinEnd = (sector: Sector) => {
    setIsSpinning(false);
    setWinner(sector);
  };

  return (
    <div>
      <PrizeWheel
        ref={wheelRef}
        sectors={sectors}
        onSpinStart={handleSpinStart}
        onSpinEnd={handleSpinEnd}
      />
      <button 
        onClick={() => wheelRef.current?.spin()}
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      {winner && <p>Winner: {winner.label}</p>}
    </div>
  );
}
```

### Probability System

The probability system uses relative weights. Higher values increase the chance of winning.

```tsx
const sectors = [
  { id: 1, label: 'Common', probability: 50 },   // 50% chance
  { id: 2, label: 'Uncommon', probability: 30 }, // 30% chance
  { id: 3, label: 'Rare', probability: 15 },     // 15% chance
  { id: 4, label: 'Legendary', probability: 5 }, // 5% chance
];
```

### Full Customization

```tsx
<PrizeWheel
  ref={wheelRef}
  sectors={sectors}
  onSpinStart={handleSpinStart}
  onSpinEnd={handleSpinEnd}
  duration={6}
  minSpins={4}
  maxSpins={4}
  frameColor="#ffd700"
  middleColor="#ffd700"
  middleDotColor="#8b7500"
  winIndicatorColor="#ffd700"
  winIndicatorDotColor="#8b7500"
  sticksColor="#ffd700"
  wheelColors={['#0a1d3f', '#0a2249']}
  borderColor="#ffd700"
  borderWidth={3}
  textColor="#ffffff"
  textFontSize={20}
  wheelShadowColor="#000"
  wheelShadowOpacity={0.2}
  middleShadowColor="#000"
  middleShadowOpacity={0.25}
  indicatorShadowColor="#000"
  indicatorShadowOpacity={0.3}
/>
```

## TypeScript

The package includes full TypeScript definitions. Import types as needed:

```typescript
import type { 
  Sector, 
  PrizeWheelProps, 
  PrizeWheelRef 
} from 'react-prize-wheel';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- React 18+
- GSAP 3+

## Credits

The wheel SVG design is based on the work by [Soma Szoboszlai](https://codepen.io/szsoma/pen/bYEXGx).

## License

MIT

## Acknowledgments

- Wheel design inspiration: Soma Szoboszlai
- Animation library: GSAP

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## Support

For issues and feature requests, please use the GitHub issue tracker.
