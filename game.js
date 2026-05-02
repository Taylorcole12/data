'use strict';

// ===== CONFIG =====
const GRID_SIZE      = 10;
const TICK_MS_NORMAL = 5000;
const TICK_MS_FAST   = 1500;
const TICKET_PRICE   = 15;
const START_MONEY    = 5000;
const HUNGER_DAYS    = 4;   // days before animals get hungry
const MATH_BONUS     = 200; // $ reward for correct math answer
const MATH_EVERY     = 5;   // challenge appears every N days

// ===== CELL DEFINITIONS =====
const CELL_DEFS = {
  empty:      { label: 'Grass',           bg: '#4a7c55', cost: 0,    dailyCost: 0,  visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0 },
  path:       { label: 'Path',            bg: '#8b6f47', cost: 25,   dailyCost: 0,  visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0,  icon: '🟫' },
  bench:      { label: 'Bench',           bg: '#5a7a60', cost: 100,  dailyCost: 0,  visitorBonus: 2,  incomeBonus: 0,  happinessBonus: 4,  icon: '🪑' },
  food_stand: { label: 'Food Stand',      bg: '#c47c2a', cost: 400,  dailyCost: 20, visitorBonus: 15, incomeBonus: 0,  happinessBonus: 0,  icon: '🍖' },
  gift_shop:  { label: 'Gift Shop',       bg: '#6a3d9a', cost: 600,  dailyCost: 30, visitorBonus: 8,  incomeBonus: 60, happinessBonus: 0,  icon: '🎁' },
  small_enc:  { label: 'Small Enclosure', bg: '#2c6e8a', cost: 300,  dailyCost: 15, visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0,  capacity: 2, encSize: 'small'  },
  medium_enc: { label: 'Med. Enclosure',  bg: '#8a7a1a', cost: 700,  dailyCost: 30, visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0,  capacity: 3, encSize: 'medium' },
  large_enc:  { label: 'Large Enclosure', bg: '#8a2c2c', cost: 1500, dailyCost: 50, visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0,  capacity: 4, encSize: 'large'  },
};

// ===== ANIMAL CATALOG (28 animals) =====
const ANIMALS = [
  // ---- Small ----
  { id: 'hamster',   name: 'Hamster',     emoji: '🐹', cost: 80,   dailyCost: 5,   visitorBonus: 5,   happinessBonus: 4,  sizes: ['small','medium','large'], fact: 'Hamsters can stuff so much food in their cheeks that their heads double in size!' },
  { id: 'frog',      name: 'Frog',        emoji: '🐸', cost: 100,  dailyCost: 5,   visitorBonus: 6,   happinessBonus: 4,  sizes: ['small','medium','large'], fact: 'Frogs drink water through their skin instead of using their mouth!' },
  { id: 'duck',      name: 'Duck',        emoji: '🦆', cost: 120,  dailyCost: 6,   visitorBonus: 7,   happinessBonus: 5,  sizes: ['small','medium','large'], fact: 'Baby ducks follow the first moving thing they see after hatching — that is called imprinting!' },
  { id: 'rabbit',    name: 'Rabbit',      emoji: '🐰', cost: 150,  dailyCost: 8,   visitorBonus: 8,   happinessBonus: 5,  sizes: ['small','medium','large'], fact: 'Rabbits can leap up to 9 feet in one jump — almost as long as a car!' },
  { id: 'butterfly', name: 'Butterfly',   emoji: '🦋', cost: 150,  dailyCost: 7,   visitorBonus: 9,   happinessBonus: 6,  sizes: ['small','medium','large'], fact: 'Butterflies taste their food with their feet!' },
  { id: 'hedgehog',  name: 'Hedgehog',    emoji: '🦔', cost: 180,  dailyCost: 9,   visitorBonus: 10,  happinessBonus: 6,  sizes: ['small','medium','large'], fact: 'Hedgehogs have around 5,000 tiny spines on their back!' },
  { id: 'parrot',    name: 'Parrot',      emoji: '🦜', cost: 200,  dailyCost: 8,   visitorBonus: 12,  happinessBonus: 7,  sizes: ['small','medium','large'], fact: 'Parrots can learn to say hundreds of words and even sing songs!' },
  { id: 'fox',       name: 'Fox',         emoji: '🦊', cost: 250,  dailyCost: 12,  visitorBonus: 15,  happinessBonus: 6,  sizes: ['small','medium','large'], fact: 'Foxes use the Earth\'s magnetic field like a compass to hunt!' },
  { id: 'penguin',   name: 'Penguin',     emoji: '🐧', cost: 300,  dailyCost: 15,  visitorBonus: 22,  happinessBonus: 8,  sizes: ['small','medium','large'], fact: 'Penguins are amazing swimmers but their wings cannot fly!' },
  { id: 'koala',     name: 'Koala',       emoji: '🐨', cost: 500,  dailyCost: 20,  visitorBonus: 28,  happinessBonus: 10, sizes: ['small','medium','large'], fact: 'Koalas sleep up to 22 hours every day to save energy!' },
  // ---- Medium ----
  { id: 'deer',      name: 'Deer',        emoji: '🦌', cost: 450,  dailyCost: 22,  visitorBonus: 35,  happinessBonus: 11, sizes: ['medium','large'], fact: 'Male deer grow brand-new antlers every single year!' },
  { id: 'flamingo',  name: 'Flamingo',    emoji: '🦩', cost: 550,  dailyCost: 25,  visitorBonus: 40,  happinessBonus: 12, sizes: ['medium','large'], fact: 'Flamingos are pink because of the shrimp and algae they eat — baby flamingos are white!' },
  { id: 'zebra',     name: 'Zebra',       emoji: '🦓', cost: 600,  dailyCost: 30,  visitorBonus: 45,  happinessBonus: 12, sizes: ['medium','large'], fact: 'No two zebras have exactly the same stripe pattern — like fingerprints!' },
  { id: 'camel',     name: 'Camel',       emoji: '🐪', cost: 700,  dailyCost: 32,  visitorBonus: 45,  happinessBonus: 11, sizes: ['medium','large'], fact: 'Camel humps store fat for energy — not water!' },
  { id: 'kangaroo',  name: 'Kangaroo',    emoji: '🦘', cost: 650,  dailyCost: 28,  visitorBonus: 48,  happinessBonus: 13, sizes: ['medium','large'], fact: 'A baby kangaroo is called a joey and is the size of a grape when born!' },
  { id: 'lion',      name: 'Lion',        emoji: '🦁', cost: 800,  dailyCost: 40,  visitorBonus: 60,  happinessBonus: 15, sizes: ['medium','large'], fact: 'A lion\'s roar is so loud it can be heard 5 miles away!' },
  { id: 'cheetah',   name: 'Cheetah',     emoji: '🐆', cost: 850,  dailyCost: 42,  visitorBonus: 62,  happinessBonus: 14, sizes: ['medium','large'], fact: 'Cheetahs are the fastest land animals and can run as fast as a car on the highway!' },
  { id: 'tiger',     name: 'Tiger',       emoji: '🐯', cost: 900,  dailyCost: 45,  visitorBonus: 65,  happinessBonus: 15, sizes: ['medium','large'], fact: 'Every tiger has a completely unique stripe pattern — no two are the same!' },
  { id: 'gorilla',   name: 'Gorilla',     emoji: '🦍', cost: 1000, dailyCost: 50,  visitorBonus: 70,  happinessBonus: 18, sizes: ['medium','large'], fact: 'Gorillas share 98% of their DNA with humans!' },
  { id: 'panda',     name: 'Giant Panda', emoji: '🐼', cost: 1200, dailyCost: 50,  visitorBonus: 85,  happinessBonus: 20, sizes: ['medium','large'], fact: 'Giant pandas eat bamboo for up to 14 hours every single day!' },
  // ---- Large ----
  { id: 'crocodile', name: 'Crocodile',   emoji: '🐊', cost: 1100, dailyCost: 52,  visitorBonus: 80,  happinessBonus: 16, sizes: ['large'], fact: 'Crocodiles have been on Earth since the time of the dinosaurs!' },
  { id: 'hippo',     name: 'Hippo',       emoji: '🦛', cost: 1300, dailyCost: 55,  visitorBonus: 85,  happinessBonus: 18, sizes: ['large'], fact: 'Hippos can hold their breath underwater for up to 5 minutes!' },
  { id: 'rhino',     name: 'Rhino',       emoji: '🦏', cost: 1400, dailyCost: 58,  visitorBonus: 92,  happinessBonus: 19, sizes: ['large'], fact: 'A rhino\'s horn is made of keratin — the same material as your fingernails!' },
  { id: 'giraffe',   name: 'Giraffe',     emoji: '🦒', cost: 1500, dailyCost: 60,  visitorBonus: 100, happinessBonus: 20, sizes: ['large'], fact: 'Giraffes are the tallest animals on Earth and their tongues are dark purple!' },
  { id: 'bison',     name: 'Bison',       emoji: '🦬', cost: 1200, dailyCost: 54,  visitorBonus: 82,  happinessBonus: 17, sizes: ['large'], fact: 'Bison look slow but can run up to 40 mph — faster than most horses!' },
  { id: 'polar_bear',name: 'Polar Bear',  emoji: '🐻‍❄️', cost: 1800, dailyCost: 70, visitorBonus: 110, happinessBonus: 22, sizes: ['large'], fact: 'Polar bears have BLACK skin under their white fur to soak up the sun\'s heat!' },
  { id: 'elephant',  name: 'Elephant',    emoji: '🐘', cost: 2000, dailyCost: 80,  visitorBonus: 120, happinessBonus: 25, sizes: ['large'], fact: 'Elephants never forget — they remember friends and places for decades!' },
  { id: 'shark',     name: 'Shark',       emoji: '🦈', cost: 2500, dailyCost: 100, visitorBonus: 150, happinessBonus: 30, sizes: ['large'], fact: 'Sharks have been swimming in Earth\'s oceans for over 450 million years!' },
];

// ===== WEATHER =====
const WEATHERS = [
  { emoji: '☀️', label: 'Sunny',   multiplier: 1.25, chance: 0.35 },
  { emoji: '⛅', label: 'Cloudy',  multiplier: 1.0,  chance: 0.35 },
  { emoji: '🌧️', label: 'Rainy',  multiplier: 0.65, chance: 0.20 },
  { emoji: '❄️', label: 'Snowy',   multiplier: 0.75, chance: 0.08 },
  { emoji: '🌈', label: 'Rainbow', multiplier: 1.6,  chance: 0.02 },
];

function pickWeather() {
  const r = Math.random();
  let cum = 0;
  for (const w of WEATHERS) { cum += w.chance; if (r < cum) return w; }
  return WEATHERS[0];
}

// ===== MATH CHALLENGE EMOJIS =====
const MATH_EMOJIS = ['🐘','🦁','🐨','🐧','🦒','🦓','🐼','🦊','🐰','🦩','🦘','🦏','🐊','🦬','🦒'];

// ===== STATE =====
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
  weather: WEATHERS[1],
};

let tickTimer = null;

// ===== GRID INIT =====
function initGrid() {
  state.grid = Array.from({ length: GRID_SIZE }, (_, r) =>
    Array.from({ length: GRID_SIZE }, (_, c) => ({
      type: 'empty',
      animals: [],
      fedDay: 1,
      r, c,
    }))
  );
}

// ===== GAME TICK =====
function gameTick() {
  state.weather = pickWeather();

  let visitorBonus = 0;
  let incomeBonus  = 0;
  let dailyCosts   = 0;
  let happyTotal   = 0;
  let happyItems   = 0;
  let hungryCount  = 0;

  for (const row of state.grid) {
    for (const cell of row) {
      const def = CELL_DEFS[cell.type];
      if (!def || cell.type === 'empty') continue;

      dailyCosts   += def.dailyCost;
      visitorBonus += def.visitorBonus;
      incomeBonus  += def.incomeBonus;
      if (def.happinessBonus) { happyTotal += def.happinessBonus; happyItems++; }

      if (def.encSize) {
        const hungry = cell.animals.length > 0 && (state.day - cell.fedDay) >= HUNGER_DAYS;
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
  const visitors = Math.max(0, Math.round((10 + visitorBonus + jitter) * state.weather.multiplier));
  const revenue  = visitors * TICKET_PRICE + incomeBonus;
  const net      = revenue - dailyCosts;

  state.money         += net;
  state.todayVisitors  = visitors;
  state.totalVisitors += visitors;
  state.happiness = happyItems > 0 ? Math.min(100, Math.round((happyTotal / happyItems) * 5)) : 65;
  state.day++;

  const sign = net >= 0 ? '+' : '';
  let msg = `Day ${state.day - 1} ${state.weather.emoji}: ${visitors} visitors · +$${revenue} · -$${dailyCosts} · Net ${sign}$${net}`;
  if (hungryCount > 0) msg += ` ⚠️ ${hungryCount} hungry enclosure${hungryCount > 1 ? 's' : ''}!`;
  addLog(msg);

  if (state.money < -2000) {
    addLog('💸 GAME OVER — Went bankrupt! Refresh to try again.');
    stopTick();
  }

  updateHUD();
  renderOverviewStats();
  renderGrid();

  if (state.day % MATH_EVERY === 0) setTimeout(showMathChallenge, 600);
}

function startTick() {
  stopTick();
  const ms = state.speed === 'fast' ? TICK_MS_FAST : TICK_MS_NORMAL;
  tickTimer = setInterval(gameTick, ms);
}

function stopTick() {
  if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
}

// ===== MATH CHALLENGE =====
function generateMathChallenge() {
  const emoji = MATH_EMOJIS[Math.floor(Math.random() * MATH_EMOJIS.length)];
  const type  = Math.random() < 0.4 ? 'count' : (Math.random() < 0.5 ? 'add' : 'subtract');

  if (type === 'count') {
    const n = Math.floor(Math.random() * 7) + 1;
    return {
      instruction: 'Count the animals! How many do you see?',
      display: Array(n).fill(emoji).join('  '),
      answer: n,
    };
  } else if (type === 'add') {
    const a  = Math.floor(Math.random() * 4) + 1;
    const b  = Math.floor(Math.random() * 4) + 1;
    const e2 = MATH_EMOJIS[(MATH_EMOJIS.indexOf(emoji) + 4) % MATH_EMOJIS.length];
    return {
      instruction: 'How many animals are there in total?',
      display: `${Array(a).fill(emoji).join(' ')}  +  ${Array(b).fill(e2).join(' ')}`,
      answer: a + b,
    };
  } else {
    const total = Math.floor(Math.random() * 4) + 3;
    const gone  = Math.floor(Math.random() * (total - 1)) + 1;
    return {
      instruction: `There are ${total} animals. ${gone} go home. How many are left?`,
      display: Array(total).fill(emoji).join('  '),
      answer: total - gone,
    };
  }
}

function showMathChallenge() {
  const ch      = generateMathChallenge();
  const overlay = document.getElementById('math-modal-overlay');
  const body    = document.getElementById('math-modal-body');

  const correct  = ch.answer;
  const choiceSet = new Set([correct]);
  while (choiceSet.size < 5) {
    const d = Math.max(0, correct + Math.floor(Math.random() * 5) - 2);
    choiceSet.add(d);
  }
  const choices = [...choiceSet].sort((a, b) => a - b);

  body.innerHTML = `
    <div class="math-star">⭐</div>
    <div class="math-title">Math Challenge!</div>
    <div class="math-bonus-badge">Get it right → earn <strong>$${MATH_BONUS}</strong>!</div>
    <div class="math-instruction">${ch.instruction}</div>
    <div class="math-display">${ch.display}</div>
    <div class="math-choices">
      ${choices.map(n => `<button class="math-choice-btn" data-val="${n}">${n}</button>`).join('')}
    </div>
    <div class="math-feedback" id="math-feedback"></div>
    <button class="math-continue-btn" id="math-continue" style="display:none">Keep Building! ▶</button>
    <button class="math-skip-btn" id="math-skip">Skip</button>
  `;

  overlay.classList.add('open');
  let answered = false;

  body.querySelectorAll('.math-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const val = parseInt(btn.dataset.val, 10);
      const fb  = document.getElementById('math-feedback');

      body.querySelectorAll('.math-choice-btn').forEach(b => {
        b.disabled = true;
        b.classList.add(parseInt(b.dataset.val, 10) === correct ? 'correct' : 'wrong');
      });

      if (val === correct) {
        state.money += MATH_BONUS;
        updateHUD();
        fb.className = 'math-feedback correct';
        fb.textContent = `🎉 Amazing! That's right! You earned $${MATH_BONUS}!`;
        addLog(`⭐ Math challenge correct! Earned $${MATH_BONUS} bonus!`);
      } else {
        fb.className = 'math-feedback wrong';
        fb.textContent = `💪 Good try! The answer was ${correct}. You can do it next time!`;
      }

      document.getElementById('math-continue').style.display = 'inline-block';
    });
  });

  document.getElementById('math-skip').addEventListener('click',    () => overlay.classList.remove('open'));
  document.getElementById('math-continue').addEventListener('click', () => overlay.classList.remove('open'));
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
      el.className = 'grid-cell';
      el.dataset.r = r;
      el.dataset.c = c;
      el.style.background = def.bg;

      if (def.encSize) {
        const hungry = cell.animals.length > 0 && (state.day - cell.fedDay) >= HUNGER_DAYS;
        const emojis = cell.animals.map(id => ANIMALS.find(a => a.id === id)?.emoji || '').join('');
        el.classList.add('cell-enclosure');
        if (hungry) el.classList.add('cell-hungry');
        el.innerHTML = `
          <div class="cell-enc-label">${def.encSize}${hungry ? ' 🍽️' : ''}</div>
          <div class="cell-animals">${emojis || '<span style="opacity:.4;font-size:.9rem">+</span>'}</div>
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
      cell.type = 'empty'; cell.animals = []; cell.fedDay = 1;
      addLog(`Demolished cell at row ${r + 1}, col ${c + 1}.`);
      renderGrid(); updateHUD();
      return;
    }
    if (cell.type !== 'empty') { flashLog('That cell is already occupied!'); return; }
    const buildDef = CELL_DEFS[state.selectedBuild];
    if (!buildDef) return;
    if (state.money < buildDef.cost) { flashLog(`Need $${buildDef.cost.toLocaleString()} — only $${state.money.toLocaleString()} available.`); return; }
    state.money -= buildDef.cost;
    cell.type   = state.selectedBuild;
    cell.animals = [];
    cell.fedDay  = state.day;
    addLog(`Built ${buildDef.label} for $${buildDef.cost.toLocaleString()}.`);
    renderGrid(); updateHUD();
    return;
  }

  if (def && def.encSize) openEnclosureModal(r, c);
}

// ===== ENCLOSURE MODAL =====
function openEnclosureModal(r, c) {
  const cell = state.grid[r][c];
  const def  = CELL_DEFS[cell.type];
  const body = document.getElementById('enc-modal-body');

  const hungry    = cell.animals.length > 0 && (state.day - cell.fedDay) >= HUNGER_DAYS;
  const daysSince = state.day - cell.fedDay;
  const feedCost  = cell.animals.length * 8;
  const animalUpkeep = cell.animals.reduce((s, id) => s + (ANIMALS.find(x => x.id === id)?.dailyCost || 0), 0);

  // Random fun fact from one of the enclosure's animals
  const factAnimal = cell.animals.length > 0
    ? ANIMALS.find(x => x.id === cell.animals[Math.floor(Math.random() * cell.animals.length)])
    : null;

  const compatibleAnimals = ANIMALS.filter(a => a.sizes.includes(def.encSize));
  const count    = cell.animals.length;
  const capacity = def.capacity;

  const currentHTML = count === 0
    ? '<p class="hint-text">No animals yet — add some below!</p>'
    : cell.animals.map((id, idx) => {
        const a      = ANIMALS.find(x => x.id === id);
        const refund = Math.round((a?.cost || 0) * 0.5);
        return `<div class="current-animal">
          <span>${a?.emoji || ''} ${a?.name || '?'}</span>
          <button class="remove-animal-btn" data-r="${r}" data-c="${c}" data-idx="${idx}">Sell ($${refund})</button>
        </div>`;
      }).join('');

  const addHTML = compatibleAnimals.map(a => {
    const here      = cell.animals.includes(a.id);
    const full      = count >= capacity;
    const noMoney   = state.money < a.cost;
    const disabled  = here || full || noMoney;
    const reason    = here ? 'Here' : (full ? 'Full' : (noMoney ? 'No funds' : ''));
    return `<button class="animal-option-btn ${disabled ? 'disabled' : ''}"
        data-animal="${a.id}" data-r="${r}" data-c="${c}" ${disabled ? 'disabled' : ''}>
        <span class="ao-emoji">${a.emoji}</span>
        <span class="ao-name">${a.name}</span>
        <span class="ao-cost">$${a.cost.toLocaleString()}</span>
        <span class="ao-bonus">${disabled && reason ? reason : `+${a.visitorBonus} visitors/day`}</span>
      </button>`;
  }).join('');

  body.innerHTML = `
    <div class="enc-modal-title">${def.label}</div>
    <div class="enc-modal-sub">Capacity: ${count}/${capacity} · Upkeep: $${def.dailyCost + animalUpkeep}/day</div>

    <div class="enc-feed-row ${hungry ? 'enc-hungry' : 'enc-fed'}">
      <span>${hungry ? `⚠️ Animals are hungry! (${daysSince} days since last fed)` : `✅ Animals are well-fed (${daysSince} day${daysSince !== 1 ? 's' : ''} ago)`}</span>
      ${count > 0 ? `<button class="feed-btn ${state.money < feedCost ? 'disabled' : ''}" id="feed-enc-btn" ${state.money < feedCost ? 'disabled' : ''}>Feed ($${feedCost})</button>` : ''}
    </div>

    <div class="current-animals-list">${currentHTML}</div>

    ${factAnimal ? `<div class="animal-fact">🎓 <strong>Did you know?</strong> ${factAnimal.fact}</div>` : ''}

    <div class="enc-add-heading">Add an Animal</div>
    <div class="animal-options-grid">${addHTML}</div>
  `;

  document.getElementById('enc-modal-overlay').classList.add('open');

  const feedBtn = document.getElementById('feed-enc-btn');
  if (feedBtn) {
    feedBtn.addEventListener('click', () => {
      if (state.money < feedCost) return;
      state.money   -= feedCost;
      cell.fedDay    = state.day;
      addLog(`Fed animals in enclosure (${r + 1},${c + 1}) for $${feedCost}.`);
      openEnclosureModal(r, c);
      renderGrid(); updateHUD();
    });
  }

  body.querySelectorAll('.animal-option-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = ANIMALS.find(x => x.id === btn.dataset.animal);
      if (!a || state.money < a.cost || cell.animals.length >= capacity) return;
      state.money -= a.cost;
      cell.animals.push(a.id);
      addLog(`Added ${a.emoji} ${a.name} for $${a.cost.toLocaleString()}. Fun fact: ${a.fact}`);
      openEnclosureModal(r, c);
      renderGrid(); updateHUD();
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
      renderGrid(); updateHUD();
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
  if (def.encSize) {
    const hungry = cell.animals.length > 0 && (state.day - cell.fedDay) >= HUNGER_DAYS;
    if (hungry) text += ' ⚠️ HUNGRY';
    if (cell.animals.length > 0) {
      const names = cell.animals.map(id => ANIMALS.find(a => a.id === id)?.name).filter(Boolean);
      text += ` — ${names.join(', ')}`;
    } else {
      text += ' — empty (click to add animals)';
    }
  }

  tip.textContent    = text;
  tip.style.display  = 'block';
  const gridRect     = document.getElementById('grid-area').getBoundingClientRect();
  const elRect       = el.getBoundingClientRect();
  tip.style.left     = (elRect.left - gridRect.left) + 'px';
  tip.style.top      = (elRect.top  - gridRect.top - 30) + 'px';
}

function hideTooltip() {
  document.getElementById('grid-tooltip').style.display = 'none';
}

// ===== HUD =====
function updateHUD() {
  const moneyEl = document.getElementById('money');
  moneyEl.textContent = `$${state.money.toLocaleString()}`;
  moneyEl.className   = 'hud-value' + (state.money < 0 ? ' danger' : state.money < 500 ? ' warning' : '');

  document.getElementById('day').textContent      = state.day;
  document.getElementById('visitors').textContent = state.todayVisitors.toLocaleString();
  document.getElementById('happiness').textContent = `${state.happiness}%`;

  const weatherEl = document.getElementById('weather');
  if (weatherEl) weatherEl.textContent = `${state.weather.emoji} ${state.weather.label}`;
}

// ===== OVERVIEW STATS =====
function renderOverviewStats() {
  let animals = 0, enclosures = 0, hungry = 0;
  for (const row of state.grid) {
    for (const cell of row) {
      const def = CELL_DEFS[cell.type];
      if (def?.encSize) {
        enclosures++;
        animals += cell.animals.length;
        if (cell.animals.length > 0 && (state.day - cell.fedDay) >= HUNGER_DAYS) hungry++;
      }
    }
  }
  document.getElementById('overview-stats').innerHTML = `
    <div class="ov-stat"><span>🐾 Animals</span><span>${animals}</span></div>
    <div class="ov-stat"><span>🏗️ Enclosures</span><span>${enclosures}</span></div>
    ${hungry > 0 ? `<div class="ov-stat warn"><span>🍽️ Hungry enclosures</span><span>${hungry}</span></div>` : ''}
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

function flashLog(msg) { addLog('⚠️ ' + msg); }

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
        const def = CELL_DEFS[type];
        document.getElementById('build-hint').textContent = type === 'demolish'
          ? 'Click any built cell to remove it.'
          : `Placing: ${def?.label}. Cost: $${def?.cost?.toLocaleString() || 0}. Click a grass cell. Esc to cancel.`;
      }
      renderGrid();
    });
  });
}

// ===== SPEED CONTROLS =====
function setupSpeedControls() {
  const p = document.getElementById('pause-btn');
  const n = document.getElementById('play-btn');
  const f = document.getElementById('fast-btn');

  p.addEventListener('click', () => { state.paused = true;  stopTick();  p.classList.add('active'); n.classList.remove('active'); f.classList.remove('active'); addLog('Game paused.'); });
  n.addEventListener('click', () => { state.paused = false; state.speed = 'normal'; startTick(); p.classList.remove('active'); n.classList.add('active'); f.classList.remove('active'); });
  f.addEventListener('click', () => { state.paused = false; state.speed = 'fast';   startTick(); p.classList.remove('active'); n.classList.remove('active'); f.classList.add('active'); });
}

// ===== MODALS =====
function setupModals() {
  document.getElementById('enc-modal-close').addEventListener('click', () => {
    document.getElementById('enc-modal-overlay').classList.remove('open');
  });
  document.getElementById('enc-modal-overlay').addEventListener('click', e => {
    if (e.target.id === 'enc-modal-overlay') document.getElementById('enc-modal-overlay').classList.remove('open');
  });
  document.getElementById('math-modal-overlay').addEventListener('click', e => {
    if (e.target.id === 'math-modal-overlay') document.getElementById('math-modal-overlay').classList.remove('open');
  });
  document.getElementById('rename-btn').addEventListener('click', () => {
    document.getElementById('zoo-name-input').value = state.zooName;
    document.getElementById('name-modal-overlay').classList.add('open');
    document.getElementById('zoo-name-input').focus();
  });
  document.getElementById('zoo-name-save').addEventListener('click', saveZooName);
  document.getElementById('zoo-name-input').addEventListener('keydown', e => { if (e.key === 'Enter') saveZooName(); });
  document.getElementById('name-modal-overlay').addEventListener('click', e => {
    if (e.target.id === 'name-modal-overlay') document.getElementById('name-modal-overlay').classList.remove('open');
  });
}

function saveZooName() {
  const val = document.getElementById('zoo-name-input').value.trim();
  if (val) { state.zooName = val; document.getElementById('zoo-name-display').textContent = val; document.title = `${val} — Zoo Builder`; }
  document.getElementById('name-modal-overlay').classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    state.selectedBuild = null;
    document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('build-hint').textContent = 'Click a button above, then click a grid cell to build.';
    ['enc-modal-overlay','name-modal-overlay','math-modal-overlay'].forEach(id => {
      document.getElementById(id).classList.remove('open');
    });
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
  addLog('🎉 Welcome! Build enclosures, add animals, and grow your zoo!');
  addLog('💡 Animals get hungry after 4 days — click an enclosure to feed them.');
  addLog('💡 Weather changes daily and affects how many visitors come!');
  addLog('⭐ Every 5 days a Math Challenge appears — answer correctly for bonus cash!');
  startTick();
}

init();
