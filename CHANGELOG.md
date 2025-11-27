# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2024-11-27

### Fixed

- Fixed wheel rotation wobble issue with odd-numbered sectors

## [1.0.1] - 2024-11-05

### Fixed

- Fixed package name in README installation instructions
- Fixed import paths in all code examples
- Added missing CSS import in documentation examples

## [1.0.0] - 2024-11-04

### Added

- Initial release of React Prize Wheel component
- Customizable prize wheel with 30+ configuration props
- Probability-based winning system with weighted random selection
- Smooth GSAP-powered animations with configurable duration
- TypeScript support with full type definitions
- Ref API for programmatic control (spin method and isSpinning state)
- Event callbacks (onSpinStart, onSpinEnd)
- Comprehensive color customization (10 color props)
- Shadow customization (3 shadow colors with opacity control)
- Border and text styling options
- Responsive SVG-based rendering
- ESM and CommonJS bundle support
- Professional documentation (README, ARCHITECTURE, LICENSE)

### Credits

- SVG wheel design based on work by Soma Szoboszlai
- Original CodePen: https://codepen.io/szsoma/pen/bYEXGx

### Technical Details

- React 18+ peer dependency
- GSAP 3.12+ for animations
- TypeScript 5.6+ for development
- Vite for building and bundling
- Supports 2-24 sectors
- Sector count validation
- Immutable state updates
- Hardware-accelerated transforms
