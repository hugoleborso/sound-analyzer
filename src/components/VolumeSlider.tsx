import './VolumeSlider.css';

interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
  isVisible: boolean;
}

export function VolumeSlider({ value, onChange, isVisible }: VolumeSliderProps) {
  if (!isVisible) return null;

  const percentage = (value * 100).toFixed(0);

  return (
    <div className="volume-slider-container">
      <label className="slider-label">
        Volume Threshold
      </label>

      <div className="slider-wrapper">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="slider-input"
        />
      </div>

      <div className="slider-value">{percentage}%</div>
    </div>
  );
}
