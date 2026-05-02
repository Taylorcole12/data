import { CELL_DEFS, ANIMALS, HABITATS, HUNGER_DAYS, TICKET_PRICE, MATH_BONUS, pickWeather, initGrid } from './data.js';

export const initialState = {
  money: 5000,
  day: 1,
  todayVisitors: 0,
  totalVisitors: 0,
  happiness: 80,
  zooName: 'My Zoo',
  grid: initGrid(),
  selectedBuild: null,
  paused: false,
  speed: 'normal',
  weather: { emoji: '⛅', label: 'Cloudy', multiplier: 1.0 },
  log: ['🎉 Welcome! Build enclosures, add animals, grow your zoo!',
        '💡 Animals get hungry every 4 days — click an enclosure to feed them.',
        '⭐ Every 5 days a Math Challenge appears — earn $200 for correct answers!'],
  showEncModal: false,
  selectedCell: null,
  showMathModal: false,
  mathChallenge: null,
  showRenameModal: false,
};

function calcTick(state) {
  const weather = pickWeather();
  let visitorBonus = 0, incomeBonus = 0, dailyCosts = 0, happyTotal = 0, happyItems = 0, hungryCount = 0;

  for (const row of state.grid) {
    for (const cell of row) {
      const def = CELL_DEFS[cell.type];
      if (!def || cell.type === 'empty') continue;
      dailyCosts   += def.dailyCost;
      visitorBonus += def.visitorBonus;
      incomeBonus  += def.incomeBonus;
      if (def.happinessBonus) { happyTotal += def.happinessBonus; happyItems++; }

      if (def.encSize && cell.animals.length > 0) {
        const hungry = (state.day - cell.fedDay) >= HUNGER_DAYS;
        if (hungry) hungryCount++;
        for (const aid of cell.animals) {
          const a = ANIMALS.find(x => x.id === aid);
          if (!a) continue;
          dailyCosts += a.dailyCost;
          if (!hungry) visitorBonus += a.visitorBonus;
          happyTotal += hungry ? 0 : a.happinessBonus;
          happyItems++;
        }
      }
    }
  }

  const jitter   = Math.round(Math.random() * 8 - 4);
  const visitors = Math.max(0, Math.round((10 + visitorBonus + jitter) * weather.multiplier));
  const revenue  = visitors * TICKET_PRICE + incomeBonus;
  const net      = revenue - dailyCosts;
  const newMoney = state.money + net;
  const happiness = happyItems > 0 ? Math.min(100, Math.round((happyTotal / happyItems) * 5)) : 65;
  const sign = net >= 0 ? '+' : '';
  let msg = `Day ${state.day} ${weather.emoji}: ${visitors} visitors · +$${revenue} · -$${dailyCosts} · Net ${sign}$${net}`;
  if (hungryCount > 0) msg += ` ⚠️ ${hungryCount} hungry!`;

  return { weather, visitors, revenue, net, newMoney, happiness, msg };
}

function immutableGridUpdate(grid, r, c, updater) {
  return grid.map((row, ri) =>
    ri !== r ? row : row.map((cell, ci) => ci !== c ? cell : updater(cell))
  );
}

export function reducer(state, action) {
  switch (action.type) {
    case 'TICK': {
      const { weather, visitors, newMoney, happiness, msg } = calcTick(state);
      const bankrupt = newMoney < -2000;
      return {
        ...state,
        money: newMoney,
        day: state.day + 1,
        todayVisitors: visitors,
        totalVisitors: state.totalVisitors + visitors,
        happiness,
        weather,
        log: bankrupt
          ? ['💸 GAME OVER — Went bankrupt! Refresh to try again.', msg, ...state.log].slice(0, 40)
          : [msg, ...state.log].slice(0, 40),
      };
    }

    case 'SELECT_BUILD':
      return { ...state, selectedBuild: state.selectedBuild === action.buildType ? null : action.buildType };

    case 'PLACE_CELL': {
      const { r, c } = action;
      const cell = state.grid[r][c];
      const def  = CELL_DEFS[action.buildType];
      if (cell.type !== 'empty' || state.money < def.cost) return state;
      const newGrid = immutableGridUpdate(state.grid, r, c, () => ({
        type: action.buildType, animals: [], fedDay: state.day, r, c,
      }));
      return {
        ...state,
        money: state.money - def.cost,
        grid: newGrid,
        log: [`Built ${def.label} ($${def.cost}).`, ...state.log].slice(0, 40),
      };
    }

    case 'DEMOLISH': {
      const { r, c } = action;
      if (state.grid[r][c].type === 'empty') return state;
      const newGrid = immutableGridUpdate(state.grid, r, c, () => ({ type: 'empty', animals: [], fedDay: 1, r, c }));
      return { ...state, grid: newGrid, log: [`Demolished cell (${r + 1},${c + 1}).`, ...state.log].slice(0, 40) };
    }

    case 'OPEN_ENC':
      return { ...state, showEncModal: true, selectedCell: { r: action.r, c: action.c } };

    case 'CLOSE_ENC':
      return { ...state, showEncModal: false, selectedCell: null };

    case 'ADD_ANIMAL': {
      const { r, c, animalId } = action;
      const cell = state.grid[r][c];
      const def  = CELL_DEFS[cell.type];
      const a    = ANIMALS.find(x => x.id === animalId);
      if (!a || state.money < a.cost || cell.animals.length >= def.capacity) return state;
      const newGrid = immutableGridUpdate(state.grid, r, c, old => ({ ...old, animals: [...old.animals, animalId] }));
      return {
        ...state,
        money: state.money - a.cost,
        grid: newGrid,
        log: [`Added ${a.emoji} ${a.name} for $${a.cost.toLocaleString()}. 🎓 ${a.fact}`, ...state.log].slice(0, 40),
      };
    }

    case 'REMOVE_ANIMAL': {
      const { r, c, idx } = action;
      const cell   = state.grid[r][c];
      const animalId = cell.animals[idx];
      const a      = ANIMALS.find(x => x.id === animalId);
      const refund = Math.round((a?.cost || 0) * 0.5);
      const newGrid = immutableGridUpdate(state.grid, r, c, old => ({
        ...old, animals: old.animals.filter((_, i) => i !== idx),
      }));
      return {
        ...state,
        money: state.money + refund,
        grid: newGrid,
        log: [`Sold ${a?.emoji || ''} ${a?.name || 'animal'} for $${refund}.`, ...state.log].slice(0, 40),
      };
    }

    case 'FEED_ENC': {
      const { r, c } = action;
      const cell     = state.grid[r][c];
      const feedCost = cell.animals.length * 8;
      if (state.money < feedCost) return state;
      const newGrid = immutableGridUpdate(state.grid, r, c, old => ({ ...old, fedDay: state.day }));
      return {
        ...state,
        money: state.money - feedCost,
        grid: newGrid,
        log: [`Fed enclosure (${r + 1},${c + 1}) for $${feedCost}.`, ...state.log].slice(0, 40),
      };
    }

    case 'SHOW_MATH':
      return { ...state, showMathModal: true, mathChallenge: action.challenge };

    case 'DISMISS_MATH':
      return { ...state, showMathModal: false, mathChallenge: null };

    case 'CORRECT_MATH':
      return {
        ...state,
        money: state.money + MATH_BONUS,
        showMathModal: false,
        mathChallenge: null,
        log: [`⭐ Math challenge correct! Earned $${MATH_BONUS} bonus!`, ...state.log].slice(0, 40),
      };

    case 'SET_PAUSE':
      return { ...state, paused: action.paused };

    case 'SET_SPEED':
      return { ...state, speed: action.speed, paused: false };

    case 'SHOW_RENAME':
      return { ...state, showRenameModal: true };

    case 'RENAME_ZOO':
      return { ...state, zooName: action.name, showRenameModal: false };

    case 'CLOSE_RENAME':
      return { ...state, showRenameModal: false };

    default:
      return state;
  }
}
