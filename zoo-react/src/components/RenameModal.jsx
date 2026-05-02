import { useState } from 'react';

export default function RenameModal({ zooName, dispatch }) {
  const [value, setValue] = useState(zooName);

  const save = () => {
    const trimmed = value.trim();
    if (trimmed) dispatch({ type: 'RENAME_ZOO', name: trimmed });
    else dispatch({ type: 'CLOSE_RENAME' });
  };

  return (
    <div className="modal-overlay" onClick={e => e.target.classList.contains('modal-overlay') && dispatch({ type: 'CLOSE_RENAME' })}>
      <div className="modal-box rename-modal">
        <h3 className="modal-title">Name Your Zoo</h3>
        <input
          className="rename-input"
          value={value}
          maxLength={30}
          placeholder="My Awesome Zoo"
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && save()}
          autoFocus
        />
        <button className="save-btn" onClick={save}>Save Name</button>
      </div>
    </div>
  );
}
