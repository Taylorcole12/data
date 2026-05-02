import { useState } from 'react';
import { CELL_DEFS, ANIMALS, HABITATS, HUNGER_DAYS } from '../data.js';

export default function EnclosureModal({ state, dispatch }) {
  const { selectedCell, grid, day, money } = state;
  const { r, c } = selectedCell;
  const cell = grid[r][c];
  const def  = CELL_DEFS[cell.type];

  const [habitatFilter, setHabitatFilter] = useState('all');

  if (!def?.encSize) return null;

  const hungry    = cell.animals.length > 0 && (day - cell.fedDay) >= HUNGER_DAYS;
  const feedCost  = cell.animals.length * 8;
  const upkeep    = def.dailyCost + cell.animals.reduce((s, id) => s + (ANIMALS.find(a => a.id === id)?.dailyCost || 0), 0);
  const factAnimal = cell.animals.length > 0 ? ANIMALS.find(a => a.id === cell.animals[Math.floor(Math.random() * cell.animals.length)]) : null;

  const compatible = ANIMALS.filter(a =>
    a.sizes.includes(def.encSize) &&
    (habitatFilter === 'all' || a.habitat === habitatFilter)
  );

  const close = () => dispatch({ type: 'CLOSE_ENC' });

  return (
    <div className="modal-overlay" onClick={e => e.target.classList.contains('modal-overlay') && close()}>
      <div className="modal-box enc-modal">
        <button className="modal-close" onClick={close}>✕</button>

        <h2 className="modal-title">{def.label}</h2>
        <p className="modal-sub">Capacity: {cell.animals.length}/{def.capacity} · Upkeep: ${upkeep}/day</p>

        {/* Hunger status */}
        <div className={`feed-row ${hungry ? 'is-hungry' : 'is-fed'}`}>
          <span>{hungry ? `⚠️ Animals are hungry! (${day - cell.fedDay} days since fed)` : `✅ Well-fed (${day - cell.fedDay} day${day - cell.fedDay !== 1 ? 's' : ''} ago)`}</span>
          {cell.animals.length > 0 && (
            <button
              className={`feed-btn${money < feedCost ? ' disabled' : ''}`}
              disabled={money < feedCost}
              onClick={() => dispatch({ type: 'FEED_ENC', r, c })}
            >
              Feed (${feedCost})
            </button>
          )}
        </div>

        {/* Current animals */}
        <div className="current-animals">
          {cell.animals.length === 0 ? (
            <p className="empty-hint">No animals yet — add some below!</p>
          ) : (
            cell.animals.map((id, idx) => {
              const a = ANIMALS.find(x => x.id === id);
              const refund = Math.round((a?.cost || 0) * 0.5);
              const hab = a ? HABITATS[a.habitat] : null;
              return (
                <div key={idx} className="current-animal">
                  <span className="ca-emoji">{a?.emoji}</span>
                  <span className="ca-name">{a?.name}</span>
                  <span className="ca-habitat" style={{ color: hab?.color }}>{hab?.emoji} {hab?.label}</span>
                  <button className="sell-btn" onClick={() => dispatch({ type: 'REMOVE_ANIMAL', r, c, idx })}>
                    Sell (${refund})
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Fun fact */}
        {factAnimal && (
          <div className="animal-fact">
            🎓 <strong>Did you know?</strong> {factAnimal.fact}
          </div>
        )}

        {/* Add animals section */}
        <div className="add-section">
          <div className="add-heading">Add an Animal</div>

          {/* Habitat filter tabs */}
          <div className="habitat-tabs">
            <button className={`hab-tab${habitatFilter === 'all' ? ' active' : ''}`} onClick={() => setHabitatFilter('all')}>All</button>
            {Object.entries(HABITATS).map(([key, h]) => (
              <button
                key={key}
                className={`hab-tab${habitatFilter === key ? ' active' : ''}`}
                style={habitatFilter === key ? { borderColor: h.color, background: h.bg } : {}}
                onClick={() => setHabitatFilter(key)}
              >
                {h.emoji} {h.label}
              </button>
            ))}
          </div>

          {/* Animal grid */}
          <div className="animal-shop">
            {compatible.map(a => {
              const here     = cell.animals.includes(a.id);
              const full     = cell.animals.length >= def.capacity;
              const noMoney  = money < a.cost;
              const disabled = here || full || noMoney;
              const reason   = here ? 'In enclosure' : full ? 'Full' : noMoney ? 'Need $' + a.cost.toLocaleString() : null;
              const hab      = HABITATS[a.habitat];
              return (
                <button
                  key={a.id}
                  className={`animal-card${disabled ? ' disabled' : ''}`}
                  disabled={disabled}
                  style={!disabled ? { '--hab-color': hab?.color, '--hab-bg': hab?.bg } : {}}
                  onClick={() => dispatch({ type: 'ADD_ANIMAL', r, c, animalId: a.id })}
                  title={a.fact}
                >
                  <span className="ac-emoji">{a.emoji}</span>
                  <span className="ac-name">{a.name}</span>
                  <span className="ac-habitat" style={{ color: hab?.color }}>{hab?.emoji}</span>
                  <span className="ac-cost">${a.cost.toLocaleString()}</span>
                  <span className="ac-bonus">{disabled && reason ? reason : `+${a.visitorBonus}/day`}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
