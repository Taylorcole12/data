import { useState } from 'react';
import { CELL_DEFS, ANIMALS, HABITATS, HUNGER_DAYS } from '../data.js';

export default function ZooGrid({ state, onCellClick }) {
  const [tooltip, setTooltip] = useState(null);
  const { grid, day, selectedBuild } = state;

  return (
    <main className="grid-area">
      <div className="zoo-grid">
        {grid.flat().map(cell => (
          <GridCell
            key={`${cell.r}-${cell.c}`}
            cell={cell}
            day={day}
            selectedBuild={selectedBuild}
            onClick={() => onCellClick(cell.r, cell.c)}
            onEnter={e => setTooltip({ cell, rect: e.currentTarget.getBoundingClientRect() })}
            onLeave={() => setTooltip(null)}
          />
        ))}
      </div>
      {tooltip && <Tooltip tooltip={tooltip} day={day} />}
    </main>
  );
}

function GridCell({ cell, day, selectedBuild, onClick, onEnter, onLeave }) {
  const def    = CELL_DEFS[cell.type];
  const hungry = def?.encSize && cell.animals.length > 0 && (day - cell.fedDay) >= HUNGER_DAYS;

  // Determine background: enclosures tinted by first animal's habitat
  let bg = def?.bg || '#3a6642';
  if (def?.encSize && cell.animals.length > 0) {
    const firstAnimal = ANIMALS.find(a => a.id === cell.animals[0]);
    if (firstAnimal) bg = HABITATS[firstAnimal.habitat]?.bg || bg;
  }

  const classes = [
    'grid-cell',
    def?.encSize ? 'cell-enc' : '',
    hungry ? 'cell-hungry' : '',
    selectedBuild ? 'cell-buildable' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ background: bg }}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {def?.encSize ? (
        <EnclosureContent cell={cell} def={def} hungry={hungry} />
      ) : def?.icon ? (
        <span className="cell-icon">{def.icon}</span>
      ) : null}
    </div>
  );
}

function EnclosureContent({ cell, def, hungry }) {
  const emojis = cell.animals.map(id => ANIMALS.find(a => a.id === id)?.emoji || '');
  const firstAnimal = cell.animals.length > 0 ? ANIMALS.find(a => a.id === cell.animals[0]) : null;
  const habitatColor = firstAnimal ? HABITATS[firstAnimal.habitat]?.color : 'rgba(255,255,255,.3)';

  return (
    <>
      <div className="enc-badge" style={{ color: habitatColor }}>
        {def.encSize[0].toUpperCase()}{hungry ? '🍽️' : ''}
      </div>
      <div className="enc-animals">
        {emojis.length > 0
          ? emojis.map((e, i) => <span key={i} className="enc-emoji">{e}</span>)
          : <span className="enc-empty">+</span>}
      </div>
      <div className="enc-count" style={{ color: habitatColor }}>
        {cell.animals.length}/{def.capacity}
      </div>
    </>
  );
}

function Tooltip({ tooltip, day }) {
  const { cell } = tooltip;
  const def = CELL_DEFS[cell.type];
  if (!def || cell.type === 'empty') return null;

  const hungry = def.encSize && cell.animals.length > 0 && (day - cell.fedDay) >= HUNGER_DAYS;
  const names  = cell.animals.map(id => ANIMALS.find(a => a.id === id)?.name).filter(Boolean);

  return (
    <div className="grid-tooltip">
      <strong>{def.label}</strong>
      {def.encSize && <span> ({cell.animals.length}/{def.capacity})</span>}
      {hungry && <span className="tip-hungry"> ⚠️ Hungry!</span>}
      {names.length > 0 && <div className="tip-animals">{names.join(', ')}</div>}
      {def.encSize && cell.animals.length === 0 && <div className="tip-hint">Click to add animals</div>}
    </div>
  );
}
