import { useState, useRef } from 'react';
import { PrizeWheel } from '../src';
import type { Sector, PrizeWheelRef } from '../src';
import '../src/components/PrizeWheel/PrizeWheel.css';
import './demo.css';

function App() {
  const wheelRef = useRef<PrizeWheelRef>(null);
  const [winner, setWinner] = useState<Sector | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [sectorCount, setSectorCount] = useState(8);
  const [duration, setDuration] = useState(4);
  const [minSpins, setMinSpins] = useState(5);
  const [maxSpins, setMaxSpins] = useState(8);

  const [frameColor, setFrameColor] = useState('#e3e3e3');
  const [middleColor, setMiddleColor] = useState('#e3e3e3');
  const [middleDotColor, setMiddleDotColor] = useState('#d0d0d0');
  const [winIndicatorColor, setWinIndicatorColor] = useState('#e3e3e3');
  const [winIndicatorDotColor, setWinIndicatorDotColor] = useState('#d0d0d0');
  const [sticksColor, setSticksColor] = useState('#e3e3e3');
  const [wheelColor1, setWheelColor1] = useState('#1592e8');
  const [wheelColor2, setWheelColor2] = useState('#14c187');
  const [borderColor, setBorderColor] = useState('#e3e3e3');
  const [borderWidth, setBorderWidth] = useState(1);

  const [wheelShadowColor, setWheelShadowColor] = useState('#000');
  const [wheelShadowOpacity, setWheelShadowOpacity] = useState(0.06);
  const [middleShadowColor, setMiddleShadowColor] = useState('#000');
  const [middleShadowOpacity, setMiddleShadowOpacity] = useState(0.08);
  const [indicatorShadowColor, setIndicatorShadowColor] = useState('#000');
  const [indicatorShadowOpacity, setIndicatorShadowOpacity] = useState(0.1);

  const [textFontSize, setTextFontSize] = useState(18);
  const [textColor, setTextColor] = useState('#ffffff');

  const generateSectors = (count: number): Sector[] => {
    const labels = [
      'Diamond', 'Star', 'Crown', 'Heart',
      'Clover', 'Gem', 'Bolt', 'Fire',
      'Moon', 'Sun', 'Ring', 'Bell',
      'Cherry', 'Rocket', 'Globe', 'Shield',
      'Coin', 'Flame', 'Leaf', 'Pearl',
      'Arrow', 'Wave', 'Snow', 'Spark',
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      label: labels[i],
      text: labels[i],
      probability: 10,
    }));
  };

  const [sectors, setSectors] = useState<Sector[]>(generateSectors(sectorCount));

  const handleSpinStart = () => {
    setIsSpinning(true);
    setWinner(null);
  };

  const handleSpinEnd = (sector: Sector) => {
    setIsSpinning(false);
    setWinner(sector);
  };

  const handleButtonClick = () => {
    wheelRef.current?.spin();
  };

  const handleSectorCountChange = (count: number) => {
    setSectorCount(count);
    setSectors(generateSectors(count));
  };

  const updateSector = (index: number, field: 'label' | 'probability', value: string | number) => {
    const newSectors = [...sectors];
    if (field === 'label') {
      newSectors[index] = { ...newSectors[index], label: value as string, text: value as string };
    } else {
      newSectors[index] = { ...newSectors[index], probability: Number(value) };
    }
    setSectors(newSectors);
  };

  return (
    <div className="demo-container">
      {!settingsOpen && (
        <button
          className="settings-toggle"
          onClick={() => setSettingsOpen(true)}
          aria-label="Open settings"
        >
          &#x2630;
        </button>
      )}

      <aside className={`sidebar ${settingsOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <h2>Settings</h2>
          <button
            className="sidebar-close"
            onClick={() => setSettingsOpen(false)}
            aria-label="Close settings"
          >
            &#x2715;
          </button>
        </div>

        <div className="sidebar-content">
          <section className="settings-section">
            <h3>General</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Sectors: {sectorCount}</label>
                <input
                  type="range"
                  min="2"
                  max="24"
                  value={sectorCount}
                  onChange={(e) => handleSectorCountChange(Number(e.target.value))}
                />
              </div>
              <div className="setting-item">
                <label>Duration: {duration}s</label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
              <div className="setting-item">
                <label>Min Spins: {minSpins}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={minSpins}
                  onChange={(e) => setMinSpins(Number(e.target.value))}
                />
              </div>
              <div className="setting-item">
                <label>Max Spins: {maxSpins}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={maxSpins}
                  onChange={(e) => setMaxSpins(Number(e.target.value))}
                />
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h3>Sectors</h3>
            <p className="section-description">Label and probability weight for each sector</p>
            {sectors.map((sector, index) => (
              <div key={sector.id} className="sector-item">
                <span className="sector-index">{index + 1}</span>
                <input
                  type="text"
                  value={sector.label}
                  onChange={(e) => updateSector(index, 'label', e.target.value)}
                  placeholder="Label"
                />
                <input
                  type="number"
                  value={sector.probability ?? 10}
                  onChange={(e) => updateSector(index, 'probability', e.target.value)}
                  placeholder="Weight"
                  min="0"
                  max="100"
                />
              </div>
            ))}
          </section>

          <section className="settings-section">
            <h3>Wheel</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Color A</label>
                <input type="color" value={wheelColor1} onChange={(e) => setWheelColor1(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>Color B</label>
                <input type="color" value={wheelColor2} onChange={(e) => setWheelColor2(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>Border</label>
                <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>Text</label>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h3>Frame</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Frame</label>
                <input type="color" value={frameColor} onChange={(e) => setFrameColor(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>Center</label>
                <input type="color" value={middleColor} onChange={(e) => setMiddleColor(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>Center Dot</label>
                <input type="color" value={middleDotColor} onChange={(e) => setMiddleDotColor(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>Sticks</label>
                <input type="color" value={sticksColor} onChange={(e) => setSticksColor(e.target.value)} />
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h3>Indicator</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Color</label>
                <input type="color" value={winIndicatorColor} onChange={(e) => setWinIndicatorColor(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>Dot</label>
                <input type="color" value={winIndicatorDotColor} onChange={(e) => setWinIndicatorDotColor(e.target.value)} />
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h3>Styling</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Border: {borderWidth}px</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(Number(e.target.value))}
                />
              </div>
              <div className="setting-item">
                <label>Font Size: {textFontSize}px</label>
                <input
                  type="range"
                  min="10"
                  max="32"
                  value={textFontSize}
                  onChange={(e) => setTextFontSize(Number(e.target.value))}
                />
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h3>Shadows</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Wheel</label>
                <input type="color" value={wheelShadowColor} onChange={(e) => setWheelShadowColor(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>W. Opacity: {wheelShadowOpacity.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={wheelShadowOpacity}
                  onChange={(e) => setWheelShadowOpacity(Number(e.target.value))}
                />
              </div>
              <div className="setting-item">
                <label>Center</label>
                <input type="color" value={middleShadowColor} onChange={(e) => setMiddleShadowColor(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>C. Opacity: {middleShadowOpacity.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={middleShadowOpacity}
                  onChange={(e) => setMiddleShadowOpacity(Number(e.target.value))}
                />
              </div>
              <div className="setting-item">
                <label>Indicator</label>
                <input type="color" value={indicatorShadowColor} onChange={(e) => setIndicatorShadowColor(e.target.value)} />
              </div>
              <div className="setting-item">
                <label>I. Opacity: {indicatorShadowOpacity.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={indicatorShadowOpacity}
                  onChange={(e) => setIndicatorShadowOpacity(Number(e.target.value))}
                />
              </div>
            </div>
          </section>
        </div>
      </aside>

      {settingsOpen && <div className="sidebar-overlay" onClick={() => setSettingsOpen(false)} />}

      <main className="main-content">
        <div className="header">
          <h1>React Prize Wheel</h1>
          <p><a href="https://www.npmjs.com/package/@mertercelik/react-prize-wheel" target="_blank" rel="noopener noreferrer">@mertercelik/react-prize-wheel</a></p>
        </div>

        {winner && !isSpinning && (
          <div className="winner-banner">
            <span className="winner-dot" />
            <span className="winner-label">{winner.label}</span>
            <span className="winner-id">#{winner.id}</span>
          </div>
        )}

        <div className="wheel-container">
          <PrizeWheel
            ref={wheelRef}
            sectors={sectors}
            onSpinStart={handleSpinStart}
            onSpinEnd={handleSpinEnd}
            duration={duration}
            minSpins={minSpins}
            maxSpins={maxSpins}
            frameColor={frameColor}
            middleColor={middleColor}
            middleDotColor={middleDotColor}
            winIndicatorColor={winIndicatorColor}
            winIndicatorDotColor={winIndicatorDotColor}
            sticksColor={sticksColor}
            wheelColors={[wheelColor1, wheelColor2]}
            borderColor={borderColor}
            borderWidth={borderWidth}
            wheelShadowColor={wheelShadowColor}
            wheelShadowOpacity={wheelShadowOpacity}
            middleShadowColor={middleShadowColor}
            middleShadowOpacity={middleShadowOpacity}
            indicatorShadowColor={indicatorShadowColor}
            indicatorShadowOpacity={indicatorShadowOpacity}
            textFontSize={textFontSize}
            textColor={textColor}
          />
        </div>

        <button
          className="spin-button"
          onClick={handleButtonClick}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
      </main>
    </div>
  );
}

export default App;
