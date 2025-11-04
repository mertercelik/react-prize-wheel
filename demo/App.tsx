import { useState, useRef } from 'react';
import { PrizeWheel } from '../src';
import type { Sector, PrizeWheelRef } from '../src';
import '../src/components/PrizeWheel/PrizeWheel.css';
import './demo.css';

function App() {
  const wheelRef = useRef<PrizeWheelRef>(null);
  const [winner, setWinner] = useState<Sector | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const [sectorCount, setSectorCount] = useState(8);
  const [duration, setDuration] = useState(4);
  const [minSpins, setMinSpins] = useState(5);
  const [maxSpins, setMaxSpins] = useState(8);

  const [frameColor, setFrameColor] = useState('#ddd');
  const [middleColor, setMiddleColor] = useState('#ddd');
  const [middleDotColor, setMiddleDotColor] = useState('#bbb');
  const [winIndicatorColor, setWinIndicatorColor] = useState('#ddd');
  const [winIndicatorDotColor, setWinIndicatorDotColor] = useState('#bbb');
  const [sticksColor, setSticksColor] = useState('#ddd');
  const [wheelColor1, setWheelColor1] = useState('#1592e8');
  const [wheelColor2, setWheelColor2] = useState('#14c187');
  const [borderColor, setBorderColor] = useState('#ddd');
  const [borderWidth, setBorderWidth] = useState(2);

  const [wheelShadowColor, setWheelShadowColor] = useState('#000');
  const [wheelShadowOpacity, setWheelShadowOpacity] = useState(0.15);
  const [middleShadowColor, setMiddleShadowColor] = useState('#000');
  const [middleShadowOpacity, setMiddleShadowOpacity] = useState(0.2);
  const [indicatorShadowColor, setIndicatorShadowColor] = useState('#000');
  const [indicatorShadowOpacity, setIndicatorShadowOpacity] = useState(0.22);

  const [textFontSize, setTextFontSize] = useState(18);
  const [textColor, setTextColor] = useState('#ffffff');

  const generateSectors = (count: number): Sector[] => {
    const labels = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6', 'Prize 7', 'Prize 8'];
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      label: labels[i % labels.length],
      text: labels[i % labels.length],
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
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>SETTINGS</h2>
        </div>

        <div className="sidebar-content">
          <section className="settings-section">
            <h3>Configuration</h3>
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
            <p className="section-description">Configure sector labels and win probabilities (higher = more likely)</p>
            {sectors.map((sector, index) => (
              <div key={sector.id} className="sector-item">
                <input
                  type="text"
                  value={sector.label}
                  onChange={(e) => updateSector(index, 'label', e.target.value)}
                  placeholder="Label"
                />
                <input
                  type="number"
                  value={sector.probability || 10}
                  onChange={(e) => updateSector(index, 'probability', e.target.value)}
                  placeholder="Weight"
                  min="1"
                  max="100"
                  style={{ width: '70px' }}
                />
              </div>
            ))}
          </section>

          <section className="settings-section">
            <h3>Wheel</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Sector 1</label>
                <input type="color" value={wheelColor1} onChange={(e) => setWheelColor1(e.target.value)} />
              </div>

              <div className="setting-item">
                <label>Sector 2</label>
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
            <h3>Frame & Center</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Frame</label>
                <input type="color" value={frameColor} onChange={(e) => setFrameColor(e.target.value)} />
              </div>

              <div className="setting-item">
                <label>Middle</label>
                <input type="color" value={middleColor} onChange={(e) => setMiddleColor(e.target.value)} />
              </div>

              <div className="setting-item">
                <label>Middle Dot</label>
                <input type="color" value={middleDotColor} onChange={(e) => setMiddleDotColor(e.target.value)} />
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h3>Indicator</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Indicator</label>
                <input type="color" value={winIndicatorColor} onChange={(e) => setWinIndicatorColor(e.target.value)} />
              </div>

              <div className="setting-item">
                <label>Indicator Dot</label>
                <input type="color" value={winIndicatorDotColor} onChange={(e) => setWinIndicatorDotColor(e.target.value)} />
              </div>

              <div className="setting-item">
                <label>Sticks</label>
                <input type="color" value={sticksColor} onChange={(e) => setSticksColor(e.target.value)} />
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h3>Styling</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Border Width: {borderWidth}px</label>
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
                <label>Text Size: {textFontSize}px</label>
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
                <label>Wheel Shadow</label>
                <input type="color" value={wheelShadowColor} onChange={(e) => setWheelShadowColor(e.target.value)} />
              </div>

              <div className="setting-item">
                <label>Opacity: {wheelShadowOpacity.toFixed(2)}</label>
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
                <label>Middle Shadow</label>
                <input type="color" value={middleShadowColor} onChange={(e) => setMiddleShadowColor(e.target.value)} />
              </div>

              <div className="setting-item">
                <label>Opacity: {middleShadowOpacity.toFixed(2)}</label>
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
                <label>Indicator Shadow</label>
                <input type="color" value={indicatorShadowColor} onChange={(e) => setIndicatorShadowColor(e.target.value)} />
              </div>

              <div className="setting-item">
                <label>Opacity: {indicatorShadowOpacity.toFixed(2)}</label>
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

      <main className="main-content">
        <div className="header">
          <h1>Prize Wheel Demo</h1>
          <p>Configure and test your prize wheel</p>
        </div>

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
          {isSpinning ? 'Spinning...' : winner ? `Spin Again - Last: ${winner.label}` : 'Spin the Wheel'}
        </button>
      </main>
    </div>
  );
}

export default App;
