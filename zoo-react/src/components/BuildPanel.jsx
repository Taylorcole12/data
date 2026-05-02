import { CELL_DEFS } from '../data.js';

const INFRA = [
  { type: 'path',       label: 'Path',       icon: '🟫', cost: '$25'   },
  { type: 'bench',      label: 'Bench',      icon: '🪑', cost: '$100'  },
  { type: 'food_stand', label: 'Food Stand', icon: '🍖', cost: '$400'  },
  { type: 'gift_shop',  label: 'Gift Shop',  icon: '🎁', cost: '$600'  },
];

const ENCLOSURES = [
  { type: 'small_enc',  label: 'Small Enc.',  icon: '🔵', cost: '$300',   desc: 'Holds 2 animals' },
  { type: 'medium_enc', label: 'Medium Enc.', icon: '🟡', cost: '$700',   desc: 'Holds 3 animals' },
  { type: 'large_enc',  label: 'Large Enc.',  icon: '🔴', cost: '$1,500', desc: 'Holds 4 animals' },
];

export default function BuildPanel({ state, dispatch }) {
  const { selectedBuild, money } = state;

  const select = type => dispatch({ type: 'SELECT_BUILD', buildType: type });

  return (
    <aside className="build-panel">
      <div className="panel-heading">Build</div>

      <div className="build-group">
        <div className="build-group-label">Paths &amp; Amenities</div>
        {INFRA.map(item => (
          <BuildBtn
            key={item.type}
            {...item}
            active={selectedBuild === item.type}
            disabled={money < (CELL_DEFS[item.type]?.cost || 0)}
            onClick={() => select(item.type)}
          />
        ))}
      </div>

      <div className="build-group">
        <div className="build-group-label">Enclosures</div>
        {ENCLOSURES.map(item => (
          <BuildBtn
            key={item.type}
            {...item}
            active={selectedBuild === item.type}
            disabled={money < (CELL_DEFS[item.type]?.cost || 0)}
            onClick={() => select(item.type)}
          />
        ))}
      </div>

      <div className="build-group">
        <BuildBtn
          type="demolish" label="Demolish" icon="🗑️" cost="Free"
          active={selectedBuild === 'demolish'}
          isDemolish
          onClick={() => select('demolish')}
        />
      </div>

      {selectedBuild && (
        <div className="build-hint">
          {selectedBuild === 'demolish'
            ? 'Click any built cell to remove it.'
            : `Click a green grass cell to place. Press Esc to cancel.`}
        </div>
      )}
      {!selectedBuild && (
        <div className="build-hint">Select something above, then click the map to build.</div>
      )}
    </aside>
  );
}

function BuildBtn({ type, label, icon, cost, desc, active, disabled, isDemolish, onClick }) {
  return (
    <button
      className={`build-btn${active ? ' active' : ''}${isDemolish ? ' demolish' : ''}${disabled && !active ? ' cant-afford' : ''}`}
      onClick={onClick}
    >
      <span className="bb-icon">{icon}</span>
      <span className="bb-text">
        <span className="bb-label">{label}</span>
        {desc && <span className="bb-desc">{desc}</span>}
      </span>
      <span className="bb-cost">{cost}</span>
    </button>
  );
}
