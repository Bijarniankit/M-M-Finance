export default function Slider({ value, onChange, min, max, step = 1, formatter = (v) => v, valueLabel }) {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-input"
      />
      <div className="mt-1.5 flex justify-between text-[12px] text-ink-500 font-medium">
        <span>{formatter(min)}</span>
        <span className="text-primary-700 font-semibold">{valueLabel ?? formatter(value)}</span>
        <span>{formatter(max)}</span>
      </div>
    </div>
  )
}
