import { useReducer, useEffect, useRef } from 'react';
import { reducer, initialState } from './reducer.js';
import { TICK_MS } from './data.js';
import TopBar from './components/TopBar.jsx';
import BuildPanel from './components/BuildPanel.jsx';
import ZooGrid from './components/ZooGrid.jsx';
import InfoPanel from './components/InfoPanel.jsx';
import EnclosureModal from './components/EnclosureModal.jsx';
import MathModal from './components/MathModal.jsx';
import RenameModal from './components/RenameModal.jsx';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tickRef = useRef(null);

  // Game tick
  useEffect(() => {
    if (state.paused) { clearInterval(tickRef.current); return; }
    clearInterval(tickRef.current);
    tickRef.current = setInterval(() => dispatch({ type: 'TICK' }), TICK_MS[state.speed]);
    return () => clearInterval(tickRef.current);
  }, [state.paused, state.speed]);

  // Keyboard shortcut: Escape clears build mode
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') dispatch({ type: 'SELECT_BUILD', buildType: null });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const onCellClick = (r, c) => {
    const cell = state.grid[r][c];
    if (state.selectedBuild) {
      if (state.selectedBuild === 'demolish') {
        dispatch({ type: 'DEMOLISH', r, c });
      } else if (cell.type === 'empty') {
        dispatch({ type: 'PLACE_CELL', r, c, buildType: state.selectedBuild });
      }
    } else {
      const def = cell.type !== 'empty' ? true : false;
      if (def && cell.type.endsWith('_enc')) dispatch({ type: 'OPEN_ENC', r, c });
    }
  };

  return (
    <div className="app">
      <TopBar state={state} dispatch={dispatch} />
      <div className="game-layout">
        <BuildPanel state={state} dispatch={dispatch} />
        <ZooGrid state={state} onCellClick={onCellClick} />
        <InfoPanel state={state} />
      </div>

      {state.showEncModal && state.selectedCell && (
        <EnclosureModal state={state} dispatch={dispatch} />
      )}
      {state.showMathModal && state.mathChallenge && (
        <MathModal challenge={state.mathChallenge} dispatch={dispatch} />
      )}
      {state.showRenameModal && (
        <RenameModal zooName={state.zooName} dispatch={dispatch} />
      )}
    </div>
  );
}
