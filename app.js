'use strict';

// ===== ANIMAL DATA =====
const animals = [
  {
    id: 1, name: 'African Lion', species: 'Panthera leo', emoji: '🦁',
    habitat: 'savanna',
    description: 'The African lion is the world\'s most social big cat, living in groups called prides. Males are known for their majestic manes, while females do most of the hunting.',
    diet: 'Carnivore', lifespan: '10–14 years', weight: '120–250 kg',
    tags: ['Big Cats', 'Endangered', 'Social'],
  },
  {
    id: 2, name: 'African Elephant', species: 'Loxodonta africana', emoji: '🐘',
    habitat: 'savanna',
    description: 'The largest land animal on Earth, African elephants are highly intelligent and live in tight-knit family groups led by a matriarch. They use infrasound to communicate over long distances.',
    diet: 'Herbivore', lifespan: '60–70 years', weight: '4,000–7,500 kg',
    tags: ['Megafauna', 'Vulnerable', 'Intelligent'],
  },
  {
    id: 3, name: 'Giraffe', species: 'Giraffa camelopardalis', emoji: '🦒',
    habitat: 'savanna',
    description: 'The tallest living terrestrial animal, giraffes use their long necks to reach leaves high in acacia trees. Each giraffe has a unique coat pattern, like a fingerprint.',
    diet: 'Herbivore', lifespan: '25 years', weight: '700–1,200 kg',
    tags: ['Vulnerable', 'Iconic'],
  },
  {
    id: 4, name: 'Zebra', species: 'Equus quagga', emoji: '🦓',
    habitat: 'savanna',
    description: 'Zebras are best known for their distinctive black-and-white stripes. No two zebras have exactly the same stripe pattern. They travel in large herds for protection.',
    diet: 'Herbivore', lifespan: '20–25 years', weight: '200–450 kg',
    tags: ['Herd Animal', 'Near Threatened'],
  },
  {
    id: 5, name: 'Gorilla', species: 'Gorilla gorilla', emoji: '🦍',
    habitat: 'jungle',
    description: 'Gorillas are the largest living primates. These gentle giants share 98% of their DNA with humans and live in close family groups. They communicate using vocalizations, body postures, and facial expressions.',
    diet: 'Herbivore', lifespan: '35–40 years', weight: '100–270 kg',
    tags: ['Great Ape', 'Critically Endangered', 'Intelligent'],
  },
  {
    id: 6, name: 'Jaguar', species: 'Panthera onca', emoji: '🐆',
    habitat: 'jungle',
    description: 'The jaguar is the largest wild cat in the Americas and an apex predator of the rainforest. Its powerful jaws can pierce turtle shells and are strong enough to bite through the skull of its prey.',
    diet: 'Carnivore', lifespan: '12–15 years', weight: '56–100 kg',
    tags: ['Big Cats', 'Near Threatened', 'Apex Predator'],
  },
  {
    id: 7, name: 'Red-Eyed Tree Frog', species: 'Agalychnis callidryas', emoji: '🐸',
    habitat: 'jungle',
    description: 'Known for their vivid red eyes and electric-green bodies, these nocturnal frogs use their striking coloring to startle predators. They sleep during the day with eyes shut, camouflaged on leaves.',
    diet: 'Insectivore', lifespan: '5 years', weight: '6–15 g',
    tags: ['Amphibian', 'Nocturnal', 'Colorful'],
  },
  {
    id: 8, name: 'Toucan', species: 'Ramphastos toco', emoji: '🦜',
    habitat: 'jungle',
    description: 'Toucans are famous for their oversized, colorful bills. Despite appearances, the bill is lightweight — made of a honeycomb of keratin. They are important seed dispersers in rainforest ecosystems.',
    diet: 'Omnivore', lifespan: '20 years', weight: '500–876 g',
    tags: ['Bird', 'Tropical', 'Colorful'],
  },
  {
    id: 9, name: 'Polar Bear', species: 'Ursus maritimus', emoji: '🐻‍❄️',
    habitat: 'arctic',
    description: 'Polar bears are the largest land carnivores and are perfectly adapted to life in the Arctic. Their fur appears white but is actually transparent, helping them blend into their snowy surroundings.',
    diet: 'Carnivore', lifespan: '20–30 years', weight: '350–680 kg',
    tags: ['Vulnerable', 'Arctic', 'Apex Predator'],
  },
  {
    id: 10, name: 'Snowy Owl', species: 'Bubo scandiacus', emoji: '🦉',
    habitat: 'arctic',
    description: 'Unlike most owls, snowy owls are active during the day (diurnal). Their thick feathers, even on their feet, keep them warm in extreme cold. Males become whiter with age.',
    diet: 'Carnivore', lifespan: '10 years', weight: '1.6–3 kg',
    tags: ['Bird', 'Diurnal', 'Vulnerable'],
  },
  {
    id: 11, name: 'Arctic Fox', species: 'Vulpes lagopus', emoji: '🦊',
    habitat: 'arctic',
    description: 'The Arctic fox changes color with the seasons — white in winter for camouflage in snow, and brown-grey in summer. Their thick fur provides insulation in temperatures down to -70°C.',
    diet: 'Omnivore', lifespan: '3–6 years', weight: '1.4–9.4 kg',
    tags: ['Least Concern', 'Seasonal Camouflage'],
  },
  {
    id: 12, name: 'Great White Shark', species: 'Carcharodon carcharias', emoji: '🦈',
    habitat: 'ocean',
    description: 'The great white shark is the ocean\'s most famous apex predator. Despite their fearsome reputation, attacks on humans are rare. They can detect blood in the water from up to 5 km away.',
    diet: 'Carnivore', lifespan: '70+ years', weight: '520–1,100 kg',
    tags: ['Vulnerable', 'Apex Predator', 'Ocean'],
  },
  {
    id: 13, name: 'Sea Turtle', species: 'Chelonia mydas', emoji: '🐢',
    habitat: 'ocean',
    description: 'Green sea turtles have navigated the world\'s oceans for over 100 million years. Females return to the exact beach where they were born to lay their eggs, guided by the Earth\'s magnetic field.',
    diet: 'Herbivore', lifespan: '80 years', weight: '68–190 kg',
    tags: ['Endangered', 'Ancient', 'Ocean'],
  },
  {
    id: 14, name: 'Dolphin', species: 'Tursiops truncatus', emoji: '🐬',
    habitat: 'ocean',
    description: 'Bottlenose dolphins are among the most intelligent animals on Earth, capable of recognizing themselves in mirrors. They live in social groups called pods and communicate using clicks and whistles.',
    diet: 'Carnivore', lifespan: '40–50 years', weight: '150–650 kg',
    tags: ['Intelligent', 'Social', 'Least Concern'],
  },
];

// ===== RENDER ANIMAL CARDS =====
function renderAnimals(filter = 'all') {
  const grid = document.getElementById('animal-grid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? animals : animals.filter(a => a.habitat === filter);
  filtered.forEach(animal => {
    const card = document.createElement('div');
    card.className = 'animal-card';
    card.dataset.id = animal.id;
    card.innerHTML = `
      <div class="animal-emoji">${animal.emoji}</div>
      <div class="animal-info">
        <div class="animal-name">${animal.name}</div>
        <div class="animal-species">${animal.species}</div>
        <span class="animal-habitat">${animal.habitat.charAt(0).toUpperCase() + animal.habitat.slice(1)}</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(animal.id));
    grid.appendChild(card);
  });
}

// ===== FILTER BUTTONS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAnimals(btn.dataset.filter);
  });
});

// ===== MODAL =====
function openModal(id) {
  const animal = animals.find(a => a.id === id);
  if (!animal) return;
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <div class="modal-emoji">${animal.emoji}</div>
    <div class="modal-details">
      <h2>${animal.name}</h2>
      <div class="species">${animal.species}</div>
      <p>${animal.description}</p>
      <p>
        <strong>Diet:</strong> ${animal.diet} &nbsp;|&nbsp;
        <strong>Lifespan:</strong> ${animal.lifespan} &nbsp;|&nbsp;
        <strong>Weight:</strong> ${animal.weight}
      </p>
      <div class="modal-tags">
        ${animal.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
      </div>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== MOBILE HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== NAVBAR SCROLL SHADOW =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.boxShadow = window.scrollY > 10 ? '0 2px 16px rgba(0,0,0,.3)' : 'none';
});

// ===== INIT =====
renderAnimals();
