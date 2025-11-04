# Architecture

## Credits

The SVG wheel design is based on work by Soma Szoboszlai.
Original CodePen: https://codepen.io/szsoma/pen/bYEXGx

## Project Structure

```
react-prize-wheel/
├── src/
│   ├── components/
│   │   ├── PrizeWheel/
│   │   │   ├── PrizeWheel.tsx       # Main component
│   │   │   ├── PrizeWheel.css       # Component styles
│   │   │   └── index.ts             # Component export
│   │   └── generators/
│   │       └── sectorGenerator.tsx  # SVG path generation
│   ├── core/
│   │   ├── algorithms/
│   │   │   ├── probabilitySelector.ts  # Winning sector selection
│   │   │   ├── wheelAlgorithm.ts       # Rotation calculations
│   │   │   └── indicatorAlgorithm.ts   # Indicator animations
│   │   ├── animations/
│   │   │   └── index.ts                # GSAP animation setup
│   │   └── config/
│   │       ├── constants.ts            # Configuration constants
│   │       └── utils.ts                # Utility functions
│   ├── hooks/
│   │   └── useWheelAnimation.ts     # Animation hook
│   ├── types/
│   │   └── index.ts                 # TypeScript definitions
│   └── index.ts                     # Library entry point
├── demo/
│   ├── App.tsx                      # Demo application
│   ├── demo.css                     # Demo styles
│   └── main.tsx                     # Demo entry point
└── dist/                            # Build output
    ├── index.js                     # ESM bundle
    ├── index.cjs                    # CommonJS bundle
    ├── index.d.ts                   # TypeScript definitions
    └── style.css                    # Compiled styles
```

## Core Concepts

### Component Architecture

The PrizeWheel component follows a modular architecture with clear separation of concerns:

1. **Presentation Layer** (`PrizeWheel.tsx`)
   - Renders SVG wheel structure
   - Manages component state
   - Handles user interactions
   - Exposes ref API

2. **Logic Layer** (`core/`)
   - Probability calculations
   - Rotation algorithms
   - Animation timing
   - Utility functions

3. **Generation Layer** (`generators/`)
   - SVG path generation
   - Sector positioning
   - Text placement
   - Visual elements

### Animation System

The component uses GSAP for smooth, performant animations:

```
User Click → Probability Selection → Rotation Calculation → GSAP Animation → Callback
```

1. **Probability Selection**: Weighted random selection based on sector probabilities
2. **Rotation Calculation**: Determines final rotation angle to land on selected sector
3. **Animation**: GSAP handles smooth easing and rotation
4. **Indicator Animation**: Synchronized bounce effect during spin

### State Management

The component maintains minimal internal state:

- `isSpinning`: Boolean flag for spin status
- Animation refs: GSAP timeline references
- Wheel ref: DOM reference for rotation

External state is managed through:
- Props: Configuration and callbacks
- Ref API: Programmatic control

### Probability Algorithm

The probability system uses weighted random selection:

```typescript
totalWeight = sum(sector.probability)
random = Math.random() * totalWeight

for each sector:
  random -= sector.probability
  if random <= 0:
    return sector
```

This ensures fair distribution based on relative weights.

### Rotation Calculation

The wheel rotation is calculated to ensure the selected sector lands at the indicator:

```typescript
sectorAngle = (360 / sectorCount) * sectorIndex
randomSpins = random(minSpins, maxSpins)
finalRotation = (randomSpins * 360) + sectorAngle + offset
```

## Data Flow

```
Props → Component → SVG Generation → Render
  ↓
User Action → Ref API → Animation Hook → GSAP
  ↓
Animation Complete → Callback → External State
```

## Build System

The project uses Vite for building:

1. **Development**: Hot module replacement for fast iteration
2. **Production**: Optimized bundles with tree-shaking
3. **TypeScript**: Type checking and declaration generation
4. **CSS**: Bundled and minified styles

### Build Outputs

- **ESM** (`index.js`): Modern module format for bundlers
- **CommonJS** (`index.cjs`): Legacy format for Node.js
- **TypeScript** (`index.d.ts`): Type definitions
- **CSS** (`style.css`): Component styles

## Performance Considerations

1. **SVG Rendering**: Efficient path generation with minimal re-renders
2. **Animation**: Hardware-accelerated transforms via GSAP
3. **Memory**: Cleanup of animation timelines on unmount
4. **Bundle Size**: Tree-shakeable exports, minimal dependencies

## Extensibility

The architecture supports easy extension:

1. **Custom Algorithms**: Replace probability or rotation logic
2. **Custom Animations**: Modify GSAP timelines
3. **Custom Rendering**: Override SVG generation
4. **Custom Styling**: CSS variables and props

## Testing Strategy

1. **Unit Tests**: Core algorithms and utilities
2. **Component Tests**: React component behavior
3. **Integration Tests**: Animation and user interactions
4. **Type Tests**: TypeScript compilation

## Browser Compatibility

The component targets modern browsers with:

- ES2020+ JavaScript features
- CSS3 transforms and animations
- SVG 1.1 support
- GSAP 3.x compatibility

## Dependencies

### Runtime Dependencies

- **GSAP**: Animation library for smooth rotations
- **React**: Component framework (peer dependency)

### Development Dependencies

- **TypeScript**: Type safety and tooling
- **Vite**: Build tool and dev server
- **ESLint**: Code quality and consistency

## Security Considerations

1. **Input Validation**: Sector count limits (2-24)
2. **Type Safety**: TypeScript prevents runtime errors
3. **No External Data**: All logic is client-side
4. **No Eval**: No dynamic code execution

## Future Enhancements

Potential areas for expansion:

1. **Accessibility**: ARIA labels and keyboard navigation
2. **Themes**: Predefined color schemes
3. **Sound Effects**: Audio feedback for spins
4. **Mobile**: Touch gesture support
5. **Analytics**: Event tracking hooks
