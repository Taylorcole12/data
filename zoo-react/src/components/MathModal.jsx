import { useState } from 'react';
import { MATH_BONUS } from '../data.js';

export default function MathModal({ challenge, dispatch }) {
  const [selected, setSelected] = useState(null);

  const { instruction, display, displayA, displayB, answer } = challenge;
  const correct = answer;

  // Build 5 answer choices
  const choiceSet = new Set([correct]);
  let attempts = 0;
  while (choiceSet.size < 5 && attempts < 50) {
    attempts++;
    const d = Math.max(0, correct + Math.floor(Math.random() * 5) - 2);
    choiceSet.add(d);
  }
  const choices = [...choiceSet].sort((a, b) => a - b);

  const answered = selected !== null;

  const pick = val => {
    if (answered) return;
    setSelected(val);
    if (val === correct) dispatch({ type: 'CORRECT_MATH' });
  };

  const dismiss = () => dispatch({ type: 'DISMISS_MATH' });

  return (
    <div className="modal-overlay math-overlay">
      <div className="modal-box math-modal">
        <div className="math-star">⭐</div>
        <h2 className="math-title">Math Challenge!</h2>
        <div className="math-badge">Correct answer = <strong>${MATH_BONUS} bonus!</strong></div>

        <p className="math-instruction">{instruction}</p>

        {/* Animal display */}
        <div className="math-display">
          {displayA && (
            <>
              <div className="math-row">{displayA.map((e, i) => <span key={i} className="math-emoji">{e}</span>)}</div>
              <div className="math-plus">+</div>
              <div className="math-row">{displayB.map((e, i) => <span key={i} className="math-emoji">{e}</span>)}</div>
            </>
          )}
          {display && (
            <div className="math-row">{display.map((e, i) => <span key={i} className="math-emoji">{e}</span>)}</div>
          )}
        </div>

        {/* Answer buttons */}
        <div className="math-choices">
          {choices.map(n => {
            let cls = 'math-btn';
            if (answered) {
              if (n === correct) cls += ' correct';
              else if (n === selected) cls += ' wrong';
              else cls += ' faded';
            }
            return (
              <button key={n} className={cls} onClick={() => pick(n)} disabled={answered}>
                {n}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && selected !== correct && (
          <div className="math-feedback wrong">💪 Good try! The answer was <strong>{correct}</strong>. You&apos;ll get it next time!</div>
        )}

        {/* Continue / skip */}
        <div className="math-actions">
          {answered
            ? <button className="math-continue" onClick={dismiss}>Keep Building! ▶</button>
            : <button className="math-skip" onClick={dismiss}>Skip for now</button>
          }
        </div>
      </div>
    </div>
  );
}
