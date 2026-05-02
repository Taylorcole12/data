// ===== CONSTANTS =====
export const GRID_SIZE    = 10;
export const TICKET_PRICE = 15;
export const START_MONEY  = 5000;
export const HUNGER_DAYS  = 4;
export const MATH_BONUS   = 200;
export const MATH_EVERY   = 5;
export const TICK_MS      = { normal: 5000, fast: 1500 };

// ===== HABITATS =====
export const HABITATS = {
  savanna:    { label: 'Savanna',    emoji: '🌅', color: '#e9a84c', bg: '#3d2009' },
  rainforest: { label: 'Rainforest', emoji: '🌿', color: '#52b788', bg: '#0d2a18' },
  arctic:     { label: 'Arctic',     emoji: '❄️', color: '#74c0fc', bg: '#0c2040' },
  ocean:      { label: 'Ocean',      emoji: '🌊', color: '#339af0', bg: '#0c1e38' },
  desert:     { label: 'Desert',     emoji: '🏜️', color: '#f4c430', bg: '#2a1e06' },
  grassland:  { label: 'Grassland',  emoji: '🌾', color: '#95d5b2', bg: '#0d2518' },
  forest:     { label: 'Forest',     emoji: '🌲', color: '#40916c', bg: '#0d1f14' },
  wetlands:   { label: 'Wetlands',   emoji: '🪷', color: '#48cae4', bg: '#08202e' },
};

// ===== CELL DEFINITIONS =====
export const CELL_DEFS = {
  empty:      { label: 'Grass',           bg: '#3a6642', cost: 0,    dailyCost: 0,  visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0 },
  path:       { label: 'Path',            bg: '#7a5c36', cost: 25,   dailyCost: 0,  visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0,  icon: '🟫' },
  bench:      { label: 'Bench',           bg: '#4a6e52', cost: 100,  dailyCost: 0,  visitorBonus: 2,  incomeBonus: 0,  happinessBonus: 4,  icon: '🪑' },
  food_stand: { label: 'Food Stand',      bg: '#b06820', cost: 400,  dailyCost: 20, visitorBonus: 15, incomeBonus: 0,  happinessBonus: 0,  icon: '🍖' },
  gift_shop:  { label: 'Gift Shop',       bg: '#6a3d9a', cost: 600,  dailyCost: 30, visitorBonus: 8,  incomeBonus: 60, happinessBonus: 0,  icon: '🎁' },
  small_enc:  { label: 'Small Enclosure', bg: '#1c5c7a', cost: 300,  dailyCost: 15, visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0,  capacity: 2, encSize: 'small'  },
  medium_enc: { label: 'Med. Enclosure',  bg: '#7a6810', cost: 700,  dailyCost: 30, visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0,  capacity: 3, encSize: 'medium' },
  large_enc:  { label: 'Large Enclosure', bg: '#7a2020', cost: 1500, dailyCost: 50, visitorBonus: 0,  incomeBonus: 0,  happinessBonus: 0,  capacity: 4, encSize: 'large'  },
};

// ===== 100 ANIMALS ACROSS 8 HABITATS =====
export const ANIMALS = [
  // =================== SAVANNA (13) ===================
  { id: 'lion',         name: 'Lion',           emoji: '🦁', habitat: 'savanna',    sizes: ['medium','large'], cost: 800,  dailyCost: 40,  visitorBonus: 60,  happinessBonus: 15, fact: "A lion's roar can be heard 5 miles away — that's as far as driving across a whole town!" },
  { id: 'elephant',     name: 'Elephant',       emoji: '🐘', habitat: 'savanna',    sizes: ['large'],          cost: 2000, dailyCost: 80,  visitorBonus: 120, happinessBonus: 25, fact: 'Elephants never forget! They remember friends and family members for decades.' },
  { id: 'giraffe',      name: 'Giraffe',        emoji: '🦒', habitat: 'savanna',    sizes: ['large'],          cost: 1500, dailyCost: 60,  visitorBonus: 100, happinessBonus: 20, fact: 'Giraffes have purple-black tongues that are 18 inches long — perfect for grabbing leaves!' },
  { id: 'zebra',        name: 'Zebra',          emoji: '🦓', habitat: 'savanna',    sizes: ['medium','large'], cost: 600,  dailyCost: 30,  visitorBonus: 45,  happinessBonus: 12, fact: 'Every zebra has a totally unique stripe pattern — just like your fingerprints!' },
  { id: 'cheetah',      name: 'Cheetah',        emoji: '🐆', habitat: 'savanna',    sizes: ['medium','large'], cost: 850,  dailyCost: 42,  visitorBonus: 62,  happinessBonus: 14, fact: 'Cheetahs are the fastest land animals and can go from 0 to 60 mph in just 3 seconds!' },
  { id: 'hippo',        name: 'Hippo',          emoji: '🦛', habitat: 'savanna',    sizes: ['large'],          cost: 1300, dailyCost: 55,  visitorBonus: 85,  happinessBonus: 18, fact: 'Hippos can hold their breath underwater for 5 whole minutes!' },
  { id: 'rhino',        name: 'Rhino',          emoji: '🦏', habitat: 'savanna',    sizes: ['large'],          cost: 1400, dailyCost: 58,  visitorBonus: 90,  happinessBonus: 19, fact: "A rhino's horn is made of keratin — the same stuff as your fingernails!" },
  { id: 'warthog',      name: 'Warthog',        emoji: '🐗', habitat: 'savanna',    sizes: ['small','medium','large'], cost: 250, dailyCost: 12, visitorBonus: 15, happinessBonus: 6, fact: 'Warthogs kneel on their front legs to eat because their necks are too short to reach the ground!' },
  { id: 'wildebeest',   name: 'Wildebeest',     emoji: '🐃', habitat: 'savanna',    sizes: ['medium','large'], cost: 500,  dailyCost: 25,  visitorBonus: 38,  happinessBonus: 11, fact: 'Over 1.5 million wildebeest migrate together every year in the biggest animal movement on Earth!' },
  { id: 'ostrich',      name: 'Ostrich',        emoji: '🦤', habitat: 'savanna',    sizes: ['medium','large'], cost: 450,  dailyCost: 22,  visitorBonus: 35,  happinessBonus: 10, fact: "Ostriches are the biggest birds on Earth but can't fly — they run at 45 mph instead!" },
  { id: 'vulture',      name: 'Vulture',        emoji: '🦅', habitat: 'savanna',    sizes: ['small','medium','large'], cost: 300, dailyCost: 15, visitorBonus: 20, happinessBonus: 7, fact: "Vultures have stomach acid 100 times stronger than ours — they can digest bones!" },
  { id: 'wild_dog',     name: 'African Wild Dog',emoji: '🐕', habitat: 'savanna',   sizes: ['small','medium','large'], cost: 400, dailyCost: 20, visitorBonus: 28, happinessBonus: 9, fact: 'African wild dogs have a 80% hunting success rate — lions only succeed 30% of the time!' },
  { id: 'meerkat',      name: 'Meerkat',        emoji: '🦦', habitat: 'savanna',    sizes: ['small','medium','large'], cost: 200, dailyCost: 10, visitorBonus: 18, happinessBonus: 8, fact: 'Meerkats are immune to certain snake venoms and scorpion stings!' },

  // =================== RAINFOREST (13) ===================
  { id: 'gorilla',      name: 'Gorilla',        emoji: '🦍', habitat: 'rainforest', sizes: ['medium','large'], cost: 1000, dailyCost: 50,  visitorBonus: 70,  happinessBonus: 18, fact: 'Gorillas share 98% of their DNA with humans and can learn sign language!' },
  { id: 'tiger',        name: 'Tiger',          emoji: '🐯', habitat: 'rainforest', sizes: ['medium','large'], cost: 900,  dailyCost: 45,  visitorBonus: 65,  happinessBonus: 15, fact: 'Every tiger has a completely unique stripe pattern — no two are alike!' },
  { id: 'orangutan',    name: 'Orangutan',      emoji: '🦧', habitat: 'rainforest', sizes: ['medium','large'], cost: 1100, dailyCost: 50,  visitorBonus: 72,  happinessBonus: 19, fact: 'Orangutans build a brand-new nest in the trees every single night to sleep in!' },
  { id: 'parrot',       name: 'Parrot',         emoji: '🦜', habitat: 'rainforest', sizes: ['small','medium','large'], cost: 200, dailyCost: 8,  visitorBonus: 12, happinessBonus: 7, fact: 'Some parrots can learn over 1,000 words and even understand what they mean!' },
  { id: 'tree_frog',    name: 'Tree Frog',      emoji: '🐸', habitat: 'rainforest', sizes: ['small','medium','large'], cost: 100, dailyCost: 5,  visitorBonus: 6,  happinessBonus: 4, fact: 'Tree frogs have sticky toe pads that let them walk up glass!' },
  { id: 'chameleon',    name: 'Chameleon',      emoji: '🦎', habitat: 'rainforest', sizes: ['small','medium','large'], cost: 250, dailyCost: 12, visitorBonus: 16, happinessBonus: 6, fact: "Chameleons change colour to show feelings, not just to hide — it's like wearing your emotions!" },
  { id: 'python',       name: 'Python',         emoji: '🐍', habitat: 'rainforest', sizes: ['small','medium','large'], cost: 350, dailyCost: 18, visitorBonus: 25, happinessBonus: 7, fact: 'Pythons can eat a whole deer and then not need to eat again for months!' },
  { id: 'sloth',        name: 'Sloth',          emoji: '🦥', habitat: 'rainforest', sizes: ['small','medium','large'], cost: 400, dailyCost: 15, visitorBonus: 30, happinessBonus: 10, fact: 'Sloths move so slowly that algae actually grows on their fur, turning them green!' },
  { id: 'monkey',       name: 'Capuchin Monkey',emoji: '🐒', habitat: 'rainforest', sizes: ['small','medium','large'], cost: 350, dailyCost: 16, visitorBonus: 26, happinessBonus: 9, fact: 'Capuchin monkeys wash their hands and feet with urine — scientists think it repels insects!' },
  { id: 'jaguar',       name: 'Jaguar',         emoji: '🐈', habitat: 'rainforest', sizes: ['medium','large'],        cost: 950, dailyCost: 46, visitorBonus: 66, happinessBonus: 15, fact: 'Jaguars are the only big cats that love to swim — they even hunt fish!' },
  { id: 'toucan',       name: 'Toucan',         emoji: '🦜', habitat: 'rainforest', sizes: ['small','medium','large'], cost: 300, dailyCost: 14, visitorBonus: 22, happinessBonus: 8, fact: "A toucan's giant bill is hollow and light — and it acts like an air conditioner to keep them cool!" },
  { id: 'tapir',        name: 'Tapir',          emoji: '🐴', habitat: 'rainforest', sizes: ['medium','large'],        cost: 600, dailyCost: 28, visitorBonus: 40, happinessBonus: 11, fact: 'Tapirs use their bendy nose like a snorkel when swimming underwater!' },
  { id: 'poison_frog',  name: 'Poison Dart Frog',emoji: '🐸', habitat: 'rainforest',sizes: ['small','medium','large'], cost: 280, dailyCost: 14, visitorBonus: 20, happinessBonus: 7, fact: 'Poison dart frogs are tiny but one frog has enough poison to stop 10 people in their tracks!' },

  // =================== ARCTIC (12) ===================
  { id: 'polar_bear',   name: 'Polar Bear',     emoji: '🐻‍❄️', habitat: 'arctic', sizes: ['large'],          cost: 1800, dailyCost: 70, visitorBonus: 110, happinessBonus: 22, fact: 'Polar bears have BLACK skin under their white fur — it soaks up sunlight to keep them warm!' },
  { id: 'arctic_fox',   name: 'Arctic Fox',     emoji: '🦊', habitat: 'arctic',     sizes: ['small','medium','large'], cost: 350, dailyCost: 16, visitorBonus: 24, happinessBonus: 8, fact: 'Arctic foxes change color with the seasons — white in winter, brown in summer!' },
  { id: 'snowy_owl',    name: 'Snowy Owl',      emoji: '🦉', habitat: 'arctic',     sizes: ['small','medium','large'], cost: 400, dailyCost: 18, visitorBonus: 28, happinessBonus: 9, fact: 'Snowy owls can hear a mouse under 2 feet of snow — like having super hearing powers!' },
  { id: 'penguin',      name: 'Penguin',        emoji: '🐧', habitat: 'arctic',     sizes: ['small','medium','large'], cost: 300, dailyCost: 15, visitorBonus: 22, happinessBonus: 8, fact: 'Penguins propose to their mates by giving them a special pebble as a gift!' },
  { id: 'walrus',       name: 'Walrus',         emoji: '🦭', habitat: 'arctic',     sizes: ['large'],          cost: 1200, dailyCost: 54, visitorBonus: 82, happinessBonus: 17, fact: "A walrus's tusks can grow up to 3 feet long and are used like an ice pick to climb out of water!" },
  { id: 'arctic_wolf',  name: 'Arctic Wolf',    emoji: '🐺', habitat: 'arctic',     sizes: ['medium','large'], cost: 700,  dailyCost: 32, visitorBonus: 48, happinessBonus: 13, fact: 'Arctic wolves can survive temperatures of -30°F (-34°C) — colder than a freezer!' },
  { id: 'reindeer',     name: 'Reindeer',       emoji: '🦌', habitat: 'arctic',     sizes: ['medium','large'], cost: 550,  dailyCost: 26, visitorBonus: 40, happinessBonus: 11, fact: "Reindeer eyes change color from gold in summer to blue in winter — like magic sunglasses!" },
  { id: 'beluga_whale', name: 'Beluga Whale',   emoji: '🐋', habitat: 'arctic',     sizes: ['large'],          cost: 2200, dailyCost: 88, visitorBonus: 130, happinessBonus: 26, fact: 'Beluga whales are called the "canaries of the sea" because they make so many different sounds!' },
  { id: 'narwhal',      name: 'Narwhal',        emoji: '🦄', habitat: 'arctic',     sizes: ['large'],          cost: 2000, dailyCost: 82, visitorBonus: 125, happinessBonus: 24, fact: "A narwhal's spiral horn is actually a giant tooth that can grow 10 feet long!" },
  { id: 'puffin',       name: 'Puffin',         emoji: '🐦', habitat: 'arctic',     sizes: ['small','medium','large'], cost: 250, dailyCost: 12, visitorBonus: 18, happinessBonus: 7, fact: 'Puffins can carry up to 10 fish in their beak at once — without dropping a single one!' },
  { id: 'wolverine',    name: 'Wolverine',      emoji: '🦡', habitat: 'arctic',     sizes: ['small','medium','large'], cost: 500, dailyCost: 24, visitorBonus: 35, happinessBonus: 10, fact: 'Wolverines are so tough they have been seen chasing bears away from their food!' },
  { id: 'snow_leopard', name: 'Snow Leopard',   emoji: '🐆', habitat: 'arctic',     sizes: ['medium','large'], cost: 1600, dailyCost: 64, visitorBonus: 105, happinessBonus: 21, fact: 'Snow leopards use their super-long fluffy tails as a blanket to cover their nose in the cold!' },

  // =================== OCEAN (13) ===================
  { id: 'shark',        name: 'Great White Shark',emoji: '🦈', habitat: 'ocean',   sizes: ['large'],          cost: 2500, dailyCost: 100, visitorBonus: 150, happinessBonus: 30, fact: 'Great white sharks can detect a single drop of blood from 3 miles away!' },
  { id: 'dolphin',      name: 'Bottlenose Dolphin',emoji: '🐬', habitat: 'ocean',  sizes: ['large'],          cost: 1600, dailyCost: 65, visitorBonus: 108, happinessBonus: 22, fact: 'Dolphins call each other by name using special whistles — just like people do!' },
  { id: 'blue_whale',   name: 'Blue Whale',     emoji: '🐋', habitat: 'ocean',     sizes: ['large'],          cost: 3000, dailyCost: 120, visitorBonus: 180, happinessBonus: 35, fact: 'Blue whales are the largest animals to ever live on Earth — their heart is the size of a car!' },
  { id: 'octopus',      name: 'Octopus',        emoji: '🐙', habitat: 'ocean',     sizes: ['small','medium','large'], cost: 400, dailyCost: 18, visitorBonus: 30, happinessBonus: 9, fact: 'Octopuses have 3 hearts, blue blood, and can squeeze through any hole bigger than their beak!' },
  { id: 'jellyfish',    name: 'Jellyfish',      emoji: '🪼', habitat: 'ocean',     sizes: ['small','medium','large'], cost: 200, dailyCost: 8,  visitorBonus: 14, happinessBonus: 5, fact: 'One type of jellyfish can live forever — it resets back to a baby when it gets old!' },
  { id: 'sea_turtle',   name: 'Sea Turtle',     emoji: '🐢', habitat: 'ocean',     sizes: ['medium','large'], cost: 800,  dailyCost: 36, visitorBonus: 55, happinessBonus: 13, fact: 'Sea turtles have navigated the oceans for over 100 million years — they outlived the dinosaurs!' },
  { id: 'clownfish',    name: 'Clownfish',      emoji: '🐠', habitat: 'ocean',     sizes: ['small','medium','large'], cost: 150, dailyCost: 6,  visitorBonus: 10, happinessBonus: 5, fact: "All clownfish are born male — the biggest one in the group changes into a female!" },
  { id: 'sea_lion',     name: 'Sea Lion',       emoji: '🦭', habitat: 'ocean',     sizes: ['medium','large'], cost: 900,  dailyCost: 40, visitorBonus: 62, happinessBonus: 14, fact: 'Sea lions are one of the few non-human mammals that can keep a beat to music!' },
  { id: 'lobster',      name: 'Lobster',        emoji: '🦞', habitat: 'ocean',     sizes: ['small','medium','large'], cost: 200, dailyCost: 9,  visitorBonus: 12, happinessBonus: 4, fact: 'Lobsters can live to be 100 years old and never stop growing — the biggest ever found was 44 lbs!' },
  { id: 'crab',         name: 'Crab',           emoji: '🦀', habitat: 'ocean',     sizes: ['small','medium','large'], cost: 150, dailyCost: 7,  visitorBonus: 10, happinessBonus: 4, fact: "Crabs' teeth are in their stomachs, not their mouths — they grind food from the inside!" },
  { id: 'pufferfish',   name: 'Pufferfish',     emoji: '🐡', habitat: 'ocean',     sizes: ['small','medium','large'], cost: 350, dailyCost: 16, visitorBonus: 24, happinessBonus: 7, fact: 'Pufferfish puff up to 3 times their normal size when scared — like a living balloon!' },
  { id: 'squid',        name: 'Giant Squid',    emoji: '🦑', habitat: 'ocean',     sizes: ['medium','large'], cost: 1200, dailyCost: 52, visitorBonus: 80, happinessBonus: 16, fact: 'Giant squids have eyes the size of basketballs — the biggest eyes of any animal on Earth!' },
  { id: 'manta_ray',    name: 'Manta Ray',      emoji: '🐟', habitat: 'ocean',     sizes: ['large'],          cost: 1400, dailyCost: 58, visitorBonus: 92, happinessBonus: 18, fact: "Manta rays have the biggest brains of any fish and can even recognize themselves in a mirror!" },

  // =================== DESERT (12) ===================
  { id: 'camel',        name: 'Dromedary Camel', emoji: '🐪', habitat: 'desert',   sizes: ['medium','large'], cost: 700,  dailyCost: 32, visitorBonus: 48, happinessBonus: 12, fact: "Camel humps store fat as an energy reserve — not water! They can last weeks without drinking." },
  { id: 'fennec_fox',   name: 'Fennec Fox',     emoji: '🦊', habitat: 'desert',    sizes: ['small','medium','large'], cost: 300, dailyCost: 14, visitorBonus: 22, happinessBonus: 8, fact: "Fennec foxes have enormous ears that act like air conditioners to keep them cool in the heat!" },
  { id: 'scorpion',     name: 'Scorpion',       emoji: '🦂', habitat: 'desert',    sizes: ['small','medium','large'], cost: 150, dailyCost: 7,  visitorBonus: 12, happinessBonus: 4, fact: 'Scorpions glow blue-green under ultraviolet light — no one knows exactly why!' },
  { id: 'rattlesnake',  name: 'Rattlesnake',    emoji: '🐍', habitat: 'desert',    sizes: ['small','medium','large'], cost: 300, dailyCost: 14, visitorBonus: 20, happinessBonus: 6, fact: 'Rattlesnakes can sense heat with special pits near their eyes — like built-in night vision!' },
  { id: 'gila_monster', name: 'Gila Monster',   emoji: '🦎', habitat: 'desert',    sizes: ['small','medium','large'], cost: 400, dailyCost: 18, visitorBonus: 28, happinessBonus: 7, fact: 'Gila monsters store fat in their tails and can survive a whole year on just 3 big meals!' },
  { id: 'bactrian_camel',name: 'Bactrian Camel',emoji: '🐫', habitat: 'desert',    sizes: ['large'],          cost: 900,  dailyCost: 40, visitorBonus: 60, happinessBonus: 13, fact: "Bactrian camels have TWO humps. They can drink 30 gallons of water in just 13 minutes!" },
  { id: 'roadrunner',   name: 'Roadrunner',     emoji: '🐦', habitat: 'desert',    sizes: ['small','medium','large'], cost: 200, dailyCost: 9,  visitorBonus: 14, happinessBonus: 5, fact: "Real roadrunners run at 20 mph and prefer running to flying — just like the cartoon!" },
  { id: 'falcon',       name: 'Peregrine Falcon',emoji: '🦅', habitat: 'desert',   sizes: ['small','medium','large'], cost: 500, dailyCost: 22, visitorBonus: 36, happinessBonus: 10, fact: 'Peregrine falcons are the fastest animals on Earth — diving at over 240 mph!' },
  { id: 'jackrabbit',   name: 'Jackrabbit',     emoji: '🐰', habitat: 'desert',    sizes: ['small','medium','large'], cost: 130, dailyCost: 6,  visitorBonus: 8,  happinessBonus: 4, fact: "Jackrabbit ears work like solar panels — they release body heat to stay cool in the desert!" },
  { id: 'addax',        name: 'Addax',          emoji: '🦌', habitat: 'desert',    sizes: ['medium','large'], cost: 600,  dailyCost: 28, visitorBonus: 42, happinessBonus: 11, fact: 'Addax antelopes never need to drink water — they get all the moisture they need from plants!' },
  { id: 'sand_cat',     name: 'Sand Cat',       emoji: '🐱', habitat: 'desert',    sizes: ['small','medium','large'], cost: 450, dailyCost: 20, visitorBonus: 32, happinessBonus: 9, fact: 'Sand cats can survive in temperatures from -5°F to 126°F — the toughest cat on Earth!' },
  { id: 'desert_tortoise',name: 'Desert Tortoise',emoji: '🐢', habitat: 'desert',  sizes: ['small','medium','large'], cost: 200, dailyCost: 8,  visitorBonus: 12, happinessBonus: 5, fact: 'Desert tortoises can live up to 80 years and store a whole year of water in their bladder!' },

  // =================== GRASSLAND (12) ===================
  { id: 'bison',        name: 'American Bison',  emoji: '🦬', habitat: 'grassland', sizes: ['large'],          cost: 1200, dailyCost: 54, visitorBonus: 82, happinessBonus: 17, fact: 'Bison look slow but can sprint 40 mph and jump over a 6-foot fence from a standing start!' },
  { id: 'kangaroo',     name: 'Kangaroo',        emoji: '🦘', habitat: 'grassland', sizes: ['medium','large'], cost: 650,  dailyCost: 28, visitorBonus: 48, happinessBonus: 13, fact: 'A baby kangaroo (called a joey) is born the size of a jellybean and crawls to its mom\'s pouch!' },
  { id: 'giant_panda',  name: 'Giant Panda',     emoji: '🐼', habitat: 'grassland', sizes: ['medium','large'], cost: 1200, dailyCost: 50, visitorBonus: 85, happinessBonus: 20, fact: 'Giant pandas eat bamboo for 14 hours a day — but bamboo has almost no nutrition!' },
  { id: 'grey_wolf',    name: 'Grey Wolf',       emoji: '🐺', habitat: 'grassland', sizes: ['medium','large'], cost: 700,  dailyCost: 32, visitorBonus: 50, happinessBonus: 13, fact: "Wolves howl to communicate with their pack — each wolf's howl sounds different from all others!" },
  { id: 'elk',          name: 'Elk',             emoji: '🦌', habitat: 'grassland', sizes: ['large'],          cost: 800,  dailyCost: 35, visitorBonus: 55, happinessBonus: 14, fact: "Male elk grow the biggest antlers of any deer species — up to 4 feet wide!" },
  { id: 'cottontail',   name: 'Cottontail Rabbit',emoji: '🐰', habitat: 'grassland', sizes: ['small','medium','large'], cost: 120, dailyCost: 6,  visitorBonus: 7,  happinessBonus: 4, fact: 'Cottontail rabbits can run in a zigzag pattern at 18 mph to escape predators!' },
  { id: 'bald_eagle',   name: 'Bald Eagle',      emoji: '🦅', habitat: 'grassland', sizes: ['small','medium','large'], cost: 600, dailyCost: 26, visitorBonus: 45, happinessBonus: 11, fact: 'Bald eagles build the biggest nests of any North American bird — one weighed over 2 tons!' },
  { id: 'prairie_dog',  name: 'Prairie Dog',     emoji: '🐿️', habitat: 'grassland', sizes: ['small','medium','large'], cost: 150, dailyCost: 7,  visitorBonus: 10, happinessBonus: 5, fact: 'Prairie dogs have their own language with different sounds for different predators!' },
  { id: 'red_fox',      name: 'Red Fox',         emoji: '🦊', habitat: 'grassland', sizes: ['small','medium','large'], cost: 280, dailyCost: 13, visitorBonus: 18, happinessBonus: 7, fact: 'Red foxes use Earth\'s magnetic field like a compass to pounce precisely on prey under snow!' },
  { id: 'wild_boar',    name: 'Wild Boar',       emoji: '🐗', habitat: 'grassland', sizes: ['medium','large'], cost: 400,  dailyCost: 18, visitorBonus: 28, happinessBonus: 8, fact: "Wild boars are incredibly smart — they've been seen using sticks as tools!" },
  { id: 'crane',        name: 'Sandhill Crane',  emoji: '🦢', habitat: 'grassland', sizes: ['small','medium','large'], cost: 350, dailyCost: 16, visitorBonus: 24, happinessBonus: 8, fact: 'Sandhill cranes do an elaborate dance to impress a mate — jumping, bowing, and spreading wings!' },
  { id: 'hedgehog',     name: 'Hedgehog',        emoji: '🦔', habitat: 'grassland', sizes: ['small','medium','large'], cost: 180, dailyCost: 9,  visitorBonus: 10, happinessBonus: 6, fact: 'Hedgehogs are immune to snake venom! They can eat a venomous snake without getting sick.' },

  // =================== FOREST (13) ===================
  { id: 'koala',        name: 'Koala',           emoji: '🐨', habitat: 'forest',    sizes: ['small','medium','large'], cost: 500, dailyCost: 20, visitorBonus: 28, happinessBonus: 10, fact: 'Koalas sleep up to 22 hours a day because eucalyptus leaves have very little energy!' },
  { id: 'red_panda',    name: 'Red Panda',       emoji: '🦊', habitat: 'forest',    sizes: ['small','medium','large'], cost: 600, dailyCost: 25, visitorBonus: 40, happinessBonus: 12, fact: 'Red pandas use their fluffy tails as a blanket in winter and a sun umbrella in summer!' },
  { id: 'barn_owl',     name: 'Barn Owl',        emoji: '🦉', habitat: 'forest',    sizes: ['small','medium','large'], cost: 350, dailyCost: 16, visitorBonus: 24, happinessBonus: 8, fact: 'Barn owls can hear a mouse moving under leaves from 75 feet away in complete darkness!' },
  { id: 'badger',       name: 'Honey Badger',    emoji: '🦡', habitat: 'forest',    sizes: ['small','medium','large'], cost: 400, dailyCost: 18, visitorBonus: 26, happinessBonus: 8, fact: 'Honey badgers are so tough they have been seen surviving cobra bites and bouncing back within hours!' },
  { id: 'squirrel',     name: 'Red Squirrel',    emoji: '🐿️', habitat: 'forest',    sizes: ['small','medium','large'], cost: 100, dailyCost: 5,  visitorBonus: 6,  happinessBonus: 4, fact: 'Squirrels plant thousands of trees every year by forgetting where they buried their acorns!' },
  { id: 'raccoon',      name: 'Raccoon',         emoji: '🦝', habitat: 'forest',    sizes: ['small','medium','large'], cost: 200, dailyCost: 9,  visitorBonus: 13, happinessBonus: 5, fact: "Raccoons' hands are incredibly sensitive — they can identify objects just by touching them!" },
  { id: 'brown_bear',   name: 'Brown Bear',      emoji: '🐻', habitat: 'forest',    sizes: ['large'],          cost: 1400, dailyCost: 58, visitorBonus: 92, happinessBonus: 19, fact: 'Brown bears can run at 35 mph and swim for miles — and they love to eat honey just like Winnie the Pooh!' },
  { id: 'white_deer',   name: 'White-tailed Deer',emoji: '🦌', habitat: 'forest',   sizes: ['medium','large'], cost: 450,  dailyCost: 22, visitorBonus: 34, happinessBonus: 10, fact: 'White-tailed deer can jump 8 feet high and 30 feet across in a single leap!' },
  { id: 'lynx',         name: 'Canada Lynx',     emoji: '🐱', habitat: 'forest',    sizes: ['medium','large'], cost: 750,  dailyCost: 34, visitorBonus: 52, happinessBonus: 13, fact: 'Canada lynx have giant snowshoe paws that spread wide to walk on top of deep snow!' },
  { id: 'moose',        name: 'Moose',           emoji: '🫎', habitat: 'forest',    sizes: ['large'],          cost: 1000, dailyCost: 44, visitorBonus: 68, happinessBonus: 16, fact: 'Moose are excellent swimmers and can dive 20 feet underwater to eat plants on the lake bottom!' },
  { id: 'porcupine',    name: 'Porcupine',       emoji: '🦔', habitat: 'forest',    sizes: ['small','medium','large'], cost: 220, dailyCost: 10, visitorBonus: 14, happinessBonus: 6, fact: 'Porcupines have 30,000 quills and grow new ones to replace any they lose!' },
  { id: 'black_bear',   name: 'Black Bear',      emoji: '🐻', habitat: 'forest',    sizes: ['large'],          cost: 1100, dailyCost: 48, visitorBonus: 75, happinessBonus: 17, fact: 'Black bears are not true hibernators — they can wake up during winter and go back to sleep!' },
  { id: 'wild_turkey',  name: 'Wild Turkey',     emoji: '🦃', habitat: 'forest',    sizes: ['small','medium','large'], cost: 200, dailyCost: 9,  visitorBonus: 12, happinessBonus: 5, fact: 'Wild turkeys can fly at 55 mph in short bursts and roost in trees to sleep safely at night!' },

  // =================== WETLANDS (12) ===================
  { id: 'flamingo',     name: 'Flamingo',        emoji: '🦩', habitat: 'wetlands',  sizes: ['medium','large'], cost: 550,  dailyCost: 25, visitorBonus: 40, happinessBonus: 12, fact: 'Flamingos are born white — they turn pink from eating shrimp and algae!' },
  { id: 'alligator',    name: 'Alligator',       emoji: '🐊', habitat: 'wetlands',  sizes: ['large'],          cost: 1100, dailyCost: 50, visitorBonus: 75, happinessBonus: 15, fact: 'Alligators have been on Earth for 37 million years and are living relatives of dinosaurs!' },
  { id: 'otter',        name: 'River Otter',     emoji: '🦦', habitat: 'wetlands',  sizes: ['small','medium','large'], cost: 350, dailyCost: 16, visitorBonus: 25, happinessBonus: 9, fact: 'Otters hold hands while sleeping so they do not float away from each other!' },
  { id: 'beaver',       name: 'Beaver',          emoji: '🦫', habitat: 'wetlands',  sizes: ['small','medium','large'], cost: 280, dailyCost: 13, visitorBonus: 18, happinessBonus: 7, fact: "Beavers are nature's best engineers — their dams create entire ponds from scratch!" },
  { id: 'bullfrog',     name: 'Bullfrog',        emoji: '🐸', habitat: 'wetlands',  sizes: ['small','medium','large'], cost: 120, dailyCost: 6,  visitorBonus: 7,  happinessBonus: 4, fact: 'Bullfrogs never stop growing and can live up to 16 years in the wild!' },
  { id: 'heron',        name: 'Great Blue Heron',emoji: '🦢', habitat: 'wetlands',  sizes: ['medium','large'], cost: 500,  dailyCost: 22, visitorBonus: 36, happinessBonus: 10, fact: 'Great blue herons stand completely still for minutes at a time waiting for fish — like living statues!' },
  { id: 'snap_turtle',  name: 'Snapping Turtle', emoji: '🐢', habitat: 'wetlands',  sizes: ['small','medium','large'], cost: 250, dailyCost: 11, visitorBonus: 16, happinessBonus: 5, fact: 'Snapping turtles can live to 40 years and their jaws can exert 1000 Newtons of force!' },
  { id: 'manatee',      name: 'Manatee',         emoji: '🦭', habitat: 'wetlands',  sizes: ['large'],          cost: 1500, dailyCost: 62, visitorBonus: 98, happinessBonus: 20, fact: 'Manatees are related to elephants and their closest living land relative is the hyrax — a tiny furry animal!' },
  { id: 'egret',        name: 'Great Egret',     emoji: '🕊️', habitat: 'wetlands',  sizes: ['small','medium','large'], cost: 300, dailyCost: 14, visitorBonus: 20, happinessBonus: 7, fact: 'Great egrets were nearly hunted to extinction for their feathers — conservation saved them!' },
  { id: 'duck',         name: 'Mallard Duck',    emoji: '🦆', habitat: 'wetlands',  sizes: ['small','medium','large'], cost: 120, dailyCost: 5,  visitorBonus: 7,  happinessBonus: 4, fact: 'Mallard ducks can sleep with one eye open to watch for danger — even while napping!' },
  { id: 'catfish',      name: 'Catfish',         emoji: '🐟', habitat: 'wetlands',  sizes: ['small','medium','large'], cost: 150, dailyCost: 6,  visitorBonus: 9,  happinessBonus: 4, fact: 'Catfish have taste buds all over their entire body — they can taste food without even opening their mouth!' },
  { id: 'crane_whooping',name: 'Whooping Crane', emoji: '🦢', habitat: 'wetlands',  sizes: ['medium','large'], cost: 700,  dailyCost: 30, visitorBonus: 50, happinessBonus: 12, fact: 'Whooping cranes were almost extinct with only 15 left in 1941 — today there are over 800 thanks to conservation!' },
];

// ===== WEATHERS =====
export const WEATHERS = [
  { emoji: '☀️', label: 'Sunny',   multiplier: 1.25, chance: 0.35 },
  { emoji: '⛅', label: 'Cloudy',  multiplier: 1.0,  chance: 0.35 },
  { emoji: '🌧️', label: 'Rainy',  multiplier: 0.65, chance: 0.20 },
  { emoji: '❄️', label: 'Snowy',   multiplier: 0.75, chance: 0.08 },
  { emoji: '🌈', label: 'Rainbow', multiplier: 1.6,  chance: 0.02 },
];

export function pickWeather() {
  const r = Math.random();
  let cum = 0;
  for (const w of WEATHERS) { cum += w.chance; if (r < cum) return w; }
  return WEATHERS[0];
}

export function initGrid() {
  return Array.from({ length: GRID_SIZE }, (_, r) =>
    Array.from({ length: GRID_SIZE }, (_, c) => ({
      type: 'empty', animals: [], fedDay: 1, r, c,
    }))
  );
}

// ===== MATH CHALLENGE =====
const MATH_EMOJIS = ['🐘','🦁','🐨','🐧','🦒','🦓','🐼','🦊','🐰','🦩','🦘','🦏','🐊','🦬','🐯'];

export function generateMathChallenge() {
  const emoji = MATH_EMOJIS[Math.floor(Math.random() * MATH_EMOJIS.length)];
  const type  = Math.random() < 0.4 ? 'count' : (Math.random() < 0.5 ? 'add' : 'subtract');

  if (type === 'count') {
    const n = Math.floor(Math.random() * 7) + 1;
    return { instruction: 'Count the animals! How many do you see?', display: Array(n).fill(emoji), answer: n };
  } else if (type === 'add') {
    const a = Math.floor(Math.random() * 4) + 1;
    const b = Math.floor(Math.random() * 4) + 1;
    const e2 = MATH_EMOJIS[(MATH_EMOJIS.indexOf(emoji) + 4) % MATH_EMOJIS.length];
    return { instruction: 'How many animals are there in total?', displayA: Array(a).fill(emoji), displayB: Array(b).fill(e2), answer: a + b };
  } else {
    const total = Math.floor(Math.random() * 4) + 3;
    const gone  = Math.floor(Math.random() * (total - 1)) + 1;
    return { instruction: `There are ${total} animals. ${gone} go home. How many are left?`, display: Array(total).fill(emoji), answer: total - gone };
  }
}
