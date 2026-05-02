export default function TopBar({ state, dispatch }) {
  const { money, day, todayVisitors, happiness, weather, zooName, speed, paused } = state;

  const moneyClass = money < 0 ? 'hud-val danger' : money < 500 ? 'hud-val warn' : 'hud-val';

  return (
    <header className="top-bar">
      <div className="zoo-brand">
        <span className="brand-icon">🦁</span>
        <span className="brand-name">{zooName}</span>
        <button className="rename-btn" onClick={() => dispatch({ type: 'SHOW_RENAME' })} title="Rename zoo">✏️</button>
      </div>

      <div className="hud">
        <HudItem label="Money"    value={`$${money.toLocaleString()}`} valueClass={moneyClass} />
        <HudItem label="Day"      value={day} />
        <HudItem label="Visitors" value={todayVisitors.toLocaleString()} />
        <HudItem label="Mood"     value={`${happiness}%`} />
        <HudItem label="Weather"  value={`${weather.emoji} ${weather.label}`} />
      </div>

      <div className="speed-btns">
        <SpeedBtn label="⏸" title="Pause"        active={paused}                    onClick={() => dispatch({ type: 'SET_PAUSE', paused: true  })} />
        <SpeedBtn label="▶" title="Normal speed" active={!paused && speed==='normal'} onClick={() => dispatch({ type: 'SET_SPEED', speed: 'normal' })} />
        <SpeedBtn label="⏩" title="Fast forward" active={!paused && speed==='fast'}  onClick={() => dispatch({ type: 'SET_SPEED', speed: 'fast'   })} />
      </div>

      <a href="../index.html" className="back-link">← Zoo Site</a>
    </header>
  );
}

function HudItem({ label, value, valueClass = 'hud-val' }) {
  return (
    <div className="hud-item">
      <span className="hud-label">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

function SpeedBtn({ label, title, active, onClick }) {
  return (
    <button className={`speed-btn${active ? ' active' : ''}`} title={title} onClick={onClick}>
      {label}
    </button>
  );
}
