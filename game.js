'use strict';

// ===== CONFIG =====
const GRID_SIZE = 10;
const TICK_MS_NORMAL = 5000;
const TICK_MS_FAST   = 1500;
const TICKET_PRICE   = 15;
const START_MONEY    = 5000;

// ===== CELL DEFINITIONS =====
const CELL_DEFS = {
  empty:      { label: 'Grass',           bg: '#4a7c55', cost: 0,    dailyCost: 0,  visitorBonus: 0,  incomeBonus: 0, happinessBonus: 0 },
  path:       { label: 'Path',            bg: '#8b6f47', cost: 25,   dailyCost: 0,  visitorBonus: 0,  incomeBonus: 0, happinessBonus: 0, icon: '🟫' },
  bench:      { label: 'Bench',           bg: '#5a7a60', cost: 100,  dailyCost: 0,  visitorBonus: 2,  incomeBonus: 0, happinessBonus: 4, icon: '🪑' },
  food_stand: { label: 'Food Stand',      bg: '#c47c2a', cost: 400,  dailyCost: 20, visitorBonus: 15, incomeBonus: 0, happinessBonus: 0, icon: '🍖' },
  gift_shop:  { label: 'Gift Shop',       bg: '#6a3d9a', cost: 600,  dailyCost: 30, visitorBonus: 8,  incomeBonus: 60, happinessBonus: 0, icon: '🎁' },
  small_enc:  { label: 'Small Enclosure', bg: '#2c6e8a', cost: 300,  dailyCost: 15, visitorBonus: 0,  incomeBonus: 0, happinessBonus: 0, capacity: 2, encSize: 'small' },
  medium_enc: { label: 'Med. Enclosure',  bg: '#8a7a1a', cost: 700,  dailyCost: 30, visitorBonus: 0,  incomeBonus: 0, happinessBonus: 0, capacity: 3, encSize: 'medium' },
  large_enc:  { label: 'Large Enclosure', bg: '#8a2c2c', cost: 1500, dailyCost: 50, visitorBonus: 0,  incomeBonus: 0, happinessBonus: 0, capacity: 4, encSize: 'large' },
};

// ===== ANIMAL CATALOG =====
const ANIMALS = [
  { id: 'rabbit',     name: 'Rabbit',      emoji: '🐰', cost: 150,  dailyCost: 8,   visitorBonus: 8,   happinessBonus: 5,  sizes: ['small','medium','large'] },
  { id: 'parrot',     name: 'Parrot',      emoji: '🦜', cost: 200,  dailyCost: 8,   visitorBonus: 12,  happinessBonus: 7,  sizes: ['small','medium','large'] },
  { id: 'fox',        name: 'Fox',         emoji: '🦊', cost: 250,  dailyCost: 12,  visitorBonus: 15,  happinessBonus: 6,  sizes: ['small','medium','large'] },
  { id: 'penguin',    name: 'Penguin',     emoji: '🐧', cost: 300,  dailyCost: 15,  visitorBonus: 22,  happinessBonus: 8,  sizes: ['small','medium','large'] },
  { id: 'koala',      name: 'Koala',       emoji: '🐨', cost: 500,  dailyCost: 20,  visitorBonus: 28,  happinessBonus: 10, sizes: ['small','medium','large'] },
  { id: 'zebra',      name: 'Zebra',       emoji: '🦓', cost: 600,  dailyCost: 30,  visitorBonus: 45,  happinessBonus: 12, sizes: ['medium','large'] },
  { id: 'lion',       name: 'Lion',        emoji: '🦁', cost: 800,  dailyCost: 40,  visitorBonus: 60,  happinessBonus: 15, sizes: ['medium','large'] },
  { id: 'tiger',      name: 'Tiger',       emoji: '🐯', cost: 900,  dailyCost: 45,  visitorBonus: 65,  happinessBonus: 15, sizes: ['medium','large'] },
  { id: 'gorilla',    name: 'Gorilla',     emoji: '🦍', cost: 1000, dailyCost: 50,  visitorBonus: 70,  happinessBonus: 18, sizes: ['medium','large'] },
  { id: 'panda',      name: 'Giant Panda', emoji: '🐼', cost: 1200, dailyCost: 50,  visitorBonus: 85,  happinessBonus: 20, sizes: ['medium','large'] },
  { id: 'hippo',      name: 'Hippo',       emoji: '🦛', cost: 1300, dailyCost: 55,  visitorBonus: 85,  happinessBonus: 18, sizes: ['large'] },
  { id: 'giraffe',    name: 'Giraffe',     emoji: '🦒', cost: 1500, dailyCost: 60,  visitorBonus: 100, happinessBonus: 20, sizes: ['large'] },
  { id: 'polar_bear', name: 'Polar Bear',  emoji: '🐻‍❄️', cost: 1800, dailyCost: 70, visitorBonus: 110, happinessBonus: 22, sizes: ['large'] },
  { id: 'elephant',   name: 'Elephant',    emoji: '🐘', cost: 2000, dailyCost: 80,  visitorBonus: 120, happinessBonus: 25, sizes: ['large'] },
  { id: 'shark',      name: 'Shark',       emoji: '🦈', cost: 2500, dailyCost: 100, visitorBonus: 150, happinessBonus: 30, sizes: ['large'] },
];

// ===== GAME STATE =====
const state = {
  money: START_MONEY,
  day: 1,
  todayVisitors: 0,
  totalVisitors: 0,
  happiness: 80,
  zooName: 'My Zoo',
  grid: [],
  selectedBuild: null,
  paused: false,
  speed: 'normal',
};

let tickTimer = null;

// ===== GRID INIT =====
function initGrid() {
  state.grid = Array.from({ length: GRID_SIZE }, (_, r) =>
    Array.from({ length: GRID_SIZE }, (_, c) => ({ type: 'empty', animals: [], r, c }))
  );
}

// ===== GAME TICK =====
function gameTick() {
  let visitorBonus  = 0;
  let incomeBonus   = 0;
  let dailyCosts    = 0;
  let happyTotal    = 0;
  let happyItems    = 0;

  for (const row of state.grid) {
    for (const cell of row) {
      const def = CELL_DEFS[cell.type];
      if (!def || cell.type === 'empty') continue;

      dailyCosts   += def.dailyCost;
      visitorBonus += def.visitorBonus;
      incomeBonus  += def.incomeBonus;
      if (def.happinessBonus) { happyTotal += def.happinessBonus; happyItems++; }

      if (def.encSize) {
        for (const aid of cell.animals) {
          const a = ANIMALS.find(x => x.id === aid);
          if (!a) continue;
          visitorBonus += a.visitorBonus;
          dailyCosts   += a.dailyCost;
          happyTotal   += a.happinessBonus;
          happyItems++;
        }
      }
    }
  }

  const jitter    = Math.round(Math.random() * 8 - 4);
  const visitors  = Math.max(0, 10 + visitorBonus + jitter);
  const revenue   = visitors * TICKET_PRICE + incomeBonus;
  const net       = revenue - dailyCosts;

  state.money         += net;
  state.todayVisitors  = visitors;
  state.totalVisitors += visitors;
  state.happiness      = happyItems > 0
    ? Math.min(100, Math.round((happyTotal / happyItems) * 5))
    : 65;
  state.day++;

  const sign = net >= 0 ? '+' : '';
  addLog(`Day ${state.day - 1}: ${visitors} visitors · +$${revenue} revenue · -$${dailyCosts} costs · Net ${sign}$${net}`);

  if (state.money < -2000) {
    addLog('💸 GAME OVER — You went bankrupt! Refresh to try again.');
    stopTick();
  }

  updateHUD();
  renderOverviewStats();
}

function startTick() {
  stopTick();
  const ms = state.speed === 'fast' ? TICK_MS_FAST : TICK_MS_NORMAL;
  tickTimer = setInterval(gameTick, ms);
}

function stopTick() {
  if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
}

// ===== RENDER GRID =====
function renderGrid() {
  const container = document.getElementById('zoo-grid');
  container.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 58px)`;
  container.innerHTML = '';

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = state.grid[r][c];
      const def  = CELL_DEFS[cell.type];
      const el   = document.createElement('div');
      el.className   = 'grid-cell';
      el.dataset.r   = r;
      el.dataset.c   = c;
      el.style.background = def.bg;

      if (def.encSize) {
        const animalEmojis = cell.animals
          .map(id => ANIMALS.find(a => a.id === id)?.emoji || '')
          .join('');
        el.classList.add('cell-enclosure');
        el.innerHTML = `
          <div class="cell-enc-label">${def.encSize}</div>
          <div class="cell-animals">${animalEmojis || '<span style="opacity:.4;font-size:.9rem">+</span>'}</div>
        `;
      } else if (def.icon) {
        el.innerHTML = `<span class="cell-icon">${def.icon}</span>`;
      }

      if (state.selectedBuild) el.classList.add('cell-buildable');

      el.addEventListener('click',      () => onCellClick(r, c));
      el.addEventListener('mouseenter', () => showTooltip(r, c, el));
      el.addEventListener('mouseleave', hideTooltip);
      container.appendChild(el);
    }
  }
}

// ===== CELL CLICK =====
function onCellClick(r, c) {
  const cell = state.grid[r][c];
  const def  = CELL_DEFS[cell.type];

  if (state.selectedBuild) {
    if (state.selectedBuild === 'demolish') {
      if (cell.type === 'empty') return;
      cell.type = 'empty';
      cell.animals = [];
      addLog(`Demolished cell at row ${r + 1}, col ${c + 1}.`);
      renderGrid();
      updateHUD();
      return;
    }

    if (cell.type !== 'empty') {
      flashLog('That cell is already occupied!');
      return;
    }

    const buildDef = CELL_DEFS[state.selectedBuild];
    if (!buildDef) return;

    if (state.money < buildDef.cost) {
      flashLog(`Need $${buildDef.cost.toLocaleString()} — only $${state.money.toLocaleString()} available.`);
      return;
    }

    state.money  -= buildDef.cost;
    cell.type     = state.selectedBuild;
    cell.animals  = [];
    addLog(`Built ${buildDef.label} ($${buildDef.cost.toLocaleString()}).`);
    renderGrid();
    updateHUD();
    return;
  }

  // No build mode — open enclosure if applicable
  if (def && def.encSize) openEnclosureModal(r, c);
}

// ===== ENCLOSURE MODAL =====
function openEnclosureModal(r, c) {
  const cell = state.grid[r][c];
  const def  = CELL_DEFS[cell.type];
  const body = document.getElementById('enc-modal-body');

  const compatibleAnimals = ANIMALS.filter(a => a.sizes.includes(def.encSize));
  const count    = cell.animals.length;
  const capacity = def.capacity;

  const currentHTML = count === 0
    ? '<p class="hint-text">No animals yet — add some below!</p>'
    : cell.animals.map((id, idx) => {
        const a = ANIMALS.find(x => x.id === id);
        if (!a) return '';
        const refund = Math.round(a.cost * 0.5);
        return `
          <div class="current-animal">
            <span>${a.emoji} ${a.name}</span>
            <button class="remove-animal-btn" data-r="${r}" data-c="${c}" data-idx="${idx}">
              Sell ($${refund})
            </button>
          </div>`;
      }).join('');

  const addHTML = compatibleAnimals.map(a => {
    const alreadyHere = cell.animals.includes(a.id);
    const full        = count >= capacity;
    const cantAfford  = state.money < a.cost;
    const disabled    = alreadyHere || full || cantAfford;
    const reason      = alreadyHere ? 'Already here' : (full ? 'Full' : (cantAfford ? "Can't afford" : ''));
    return `
      <button class="animal-option-btn ${disabled ? 'disabled' : ''}"
        data-animal="${a.id}" data-r="${r}" data-c="${c}"
        ${disabled ? 'disabled' : ''}>
        <span class="ao-emoji">${a.emoji}</span>
        <span class="ao-name">${a.name}</span>
        <span class="ao-cost">$${a.cost.toLocaleString()}</span>
        <span class="ao-bonus">${disabled && reason ? reason : `+${a.visitorBonus} visitors/day`}</span>
      </button>`;
  }).join('');

  body.innerHTML = `
    <div class="enc-modal-title">${def.label}</div>
    <div class="enc-modal-sub">Capacity: ${count}/${capacity} · Daily upkeep: $${def.dailyCost + cell.animals.reduce((s, id) => s + (ANIMALS.find(x => x.id === id)?.dailyCost || 0), 0)}/day</div>
    <div class="current-animals-list">${currentHTML}</div>
    <div class="enc-add-heading">Add an Animal</div>
    <div class="animal-options-grid">${addHTML}</div>
  `;

  document.getElementById('enc-modal-overlay').classList.add('open');

  body.querySelectorAll('.animal-option-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = ANIMALS.find(x => x.id === btn.dataset.animal);
      if (!a || state.money < a.cost || cell.animals.length >= capacity) return;
      state.money -= a.cost;
      cell.animals.push(a.id);
      addLog(`Added ${a.emoji} ${a.name} to enclosure for $${a.cost.toLocaleString()}.`);
      openEnclosureModal(r, c);
      renderGrid();
      updateHUD();
    });
  });

  body.querySelectorAll('.remove-animal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx    = parseInt(btn.dataset.idx, 10);
      const [id]   = cell.animals.splice(idx, 1);
      const a      = ANIMALS.find(x => x.id === id);
      const refund = Math.round((a?.cost || 0) * 0.5);
      state.money += refund;
      addLog(`Sold ${a?.emoji || ''} ${a?.name || 'animal'} for $${refund}.`);
      openEnclosureModal(r, c);
      renderGrid();
      updateHUD();
    });
  });
}

// ===== TOOLTIP =====
function showTooltip(r, c, el) {
  const cell = state.grid[r][c];
  const def  = CELL_DEFS[cell.type];
  const tip  = document.getElementById('grid-tooltip');

  if (cell.type === 'empty') { tip.style.display = 'none'; return; }

  let text = def.label;
  if (def.encSize && cell.animals.length > 0) {
    const names = cell.animals.map(id => ANIMALS.find(a => a.id === id)?.name).filter(Boolean);
    text += ` — ${names.join(', ')}`;
  } else if (def.encSize) {
    text += ' — empty (click to add animals)';
  }

  tip.textContent = text;
  tip.style.display = 'block';

  const gridRect = document.getElementById('grid-area').getBoundingClientRect();
  const elRect   = el.getBoundingClientRect();
  tip.style.left = (elRect.left - gridRect.left) + 'px';
  tip.style.top  = (elRect.top  - gridRect.top - 30) + 'px';
}

function hideTooltip() {
  document.getElementById('grid-tooltip').style.display = 'none';
}

// ===== HUD UPDATE =====
function updateHUD() {
  const moneyEl = document.getElementById('money');
  moneyEl.textContent = `$${state.money.toLocaleString()}`;
  moneyEl.className   = 'hud-value' + (state.money < 0 ? ' danger' : state.money < 500 ? ' warning' : '');

  document.getElementById('day').textContent      = state.day;
  document.getElementById('visitors').textContent = state.todayVisitors.toLocaleString();
  document.getElementById('happiness').textContent = `${state.happiness}%`;
}

// ===== OVERVIEW STATS =====
function renderOverviewStats() {
  let animalCount = 0, enclosureCount = 0, pathCount = 0;
  for (const row of state.grid) {
    for (const cell of row) {
      const def = CELL_DEFS[cell.type];
      if (def?.encSize) { enclosureCount++; animalCount += cell.animals.length; }
      if (cell.type === 'path') pathCount++;
    }
  }

  document.getElementById('overview-stats').innerHTML = `
    <div class="ov-stat"><span>🐾 Animals</span><span>${animalCount}</span></div>
    <div class="ov-stat"><span>🏗️ Enclosures</span><span>${enclosureCount}</span></div>
    <div class="ov-stat"><span>🛤️ Path tiles</span><span>${pathCount}</span></div>
    <div class="ov-stat"><span>👥 All-time visitors</span><span>${state.totalVisitors.toLocaleString()}</span></div>
    <div class="ov-stat"><span>💰 Cash</span><span>$${state.money.toLocaleString()}</span></div>
  `;
}

// ===== LOG =====
function addLog(msg) {
  const list = document.getElementById('log-list');
  const li   = document.createElement('li');
  li.textContent = msg;
  list.prepend(li);
  while (list.children.length > 30) list.removeChild(list.lastChild);
}

function flashLog(msg) {
  addLog('⚠️ ' + msg);
}

// ===== BUILD BUTTONS =====
function setupBuildButtons() {
  document.querySelectorAll('.build-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      if (state.selectedBuild === type) {
        state.selectedBuild = null;
        document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('build-hint').textContent = 'Click a button above, then click a grid cell to build.';
      } else {
        state.selectedBuild = type;
        document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cost = CELL_DEFS[type]?.cost;
        document.getElementById('build-hint').textContent =
          type === 'demolish'
            ? 'Click any built cell to demolish it (free).'
            : `Placing: ${CELL_DEFS[type]?.label}. Cost: $${cost?.toLocaleString() || 0}. Click a grass cell. Press Esc to cancel.`;
      }
      renderGrid();
    });
  });
}

// ===== SPEED CONTROLS =====
function setupSpeedControls() {
  const pauseBtn = document.getElementById('pause-btn');
  const playBtn  = document.getElementById('play-btn');
  const fastBtn  = document.getElementById('fast-btn');

  pauseBtn.addEventListener('click', () => {
    state.paused = true;
    stopTick();
    pauseBtn.classList.add('active');
    playBtn.classList.remove('active');
    fastBtn.classList.remove('active');
    addLog('Game paused.');
  });

  playBtn.addEventListener('click', () => {
    state.paused = false;
    state.speed  = 'normal';
    startTick();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
    fastBtn.classList.remove('active');
  });

  fastBtn.addEventListener('click', () => {
    state.paused = false;
    state.speed  = 'fast';
    startTick();
    pauseBtn.classList.remove('active');
    playBtn.classList.remove('active');
    fastBtn.classList.add('active');
  });
}

// ===== MODALS =====
function setupModals() {
  document.getElementById('enc-modal-close').addEventListener('click', () => {
    document.getElementById('enc-modal-overlay').classList.remove('open');
  });
  document.getElementById('enc-modal-overlay').addEventListener('click', e => {
    if (e.target.id === 'enc-modal-overlay')
      document.getElementById('enc-modal-overlay').classList.remove('open');
  });

  document.getElementById('rename-btn').addEventListener('click', () => {
    document.getElementById('zoo-name-input').value = state.zooName;
    document.getElementById('name-modal-overlay').classList.add('open');
    document.getElementById('zoo-name-input').focus();
  });
  document.getElementById('zoo-name-save').addEventListener('click', saveZooName);
  document.getElementById('zoo-name-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveZooName();
  });
  document.getElementById('name-modal-overlay').addEventListener('click', e => {
    if (e.target.id === 'name-modal-overlay')
      document.getElementById('name-modal-overlay').classList.remove('open');
  });
}

function saveZooName() {
  const val = document.getElementById('zoo-name-input').value.trim();
  if (val) {
    state.zooName = val;
    document.getElementById('zoo-name-display').textContent = val;
    document.title = `${val} — Zoo Builder`;
  }
  document.getElementById('name-modal-overlay').classList.remove('open');
}

// ===== ESC KEY =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    state.selectedBuild = null;
    document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('build-hint').textContent = 'Click a button above, then click a grid cell to build.';
    document.getElementById('enc-modal-overlay').classList.remove('open');
    document.getElementById('name-modal-overlay').classList.remove('open');
    renderGrid();
  }
});

// ===== INIT =====
function init() {
  initGrid();
  renderGrid();
  updateHUD();
  renderOverviewStats();
  setupBuildButtons();
  setupSpeedControls();
  setupModals();

  addLog('🎉 Welcome to your zoo! Start by building enclosures, then add animals.');
  addLog('💡 Tip: Paths, benches, and food stands attract more visitors!');
  addLog('💡 Tip: Click an enclosure to add animals. Each animal costs daily upkeep.');

  startTick();
}

init();
