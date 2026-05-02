import { CELL_DEFS, HUNGER_DAYS } from '../data.js';

export default function InfoPanel({ state }) {
  const { grid, day, totalVisitors, money, log } = state;

  let animals = 0, enclosures = 0, hungry = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (CELL_DEFS[cell.type]?.encSize) {
        enclosures++;
        animals += cell.animals.length;
        if (cell.animals.length > 0 && (day - cell.fedDay) >= HUNGER_DAYS) hungry++;
      }
    }
  }

  return (
    <aside className="info-panel">
      <div className="panel-heading">Zoo Stats</div>
      <div className="stats-list">
        <StatRow icon="🐾" label="Animals"         value={animals} />
        <StatRow icon="🏗️" label="Enclosures"      value={enclosures} />
        {hungry > 0 && <StatRow icon="🍽️" label="Hungry" value={hungry} warn />}
        <StatRow icon="👥" label="Total Visitors"  value={totalVisitors.toLocaleString()} />
        <StatRow icon="💰" label="Cash"            value={`$${money.toLocaleString()}`} />
      </div>

      <div className="panel-heading" style={{ marginTop: '1.25rem' }}>Activity Log</div>
      <div className="log-scroll">
        {log.map((entry, i) => (
          <div key={i} className={`log-entry${i === 0 ? ' log-new' : ''}`}>{entry}</div>
        ))}
      </div>
    </aside>
  );
}

function StatRow({ icon, label, value, warn }) {
  return (
    <div className={`stat-row${warn ? ' stat-warn' : ''}`}>
      <span>{icon} {label}</span>
      <strong>{value}</strong>
    </div>
  );
}
