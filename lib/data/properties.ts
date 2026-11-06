import type { Property, StayImage } from "@/lib/types";

function image(
  file: string,
  alt: string,
  photographer: string,
  license: string,
  sourceUrl: string,
): StayImage {
  return {
    src: `/images/${file}`,
    alt,
    credit: {
      photographer,
      license,
      source: "Wikimedia Commons",
      sourceUrl,
    },
  };
}

const colomboBeira = image(
  "colombo-beira.jpg",
  "Southwest Beira Lake in Colombo, with towers reflected in still water and a heron in the shallows.",
  "A. Savin",
  "Free Art License",
  "https://commons.wikimedia.org/wiki/File:SL_Colombo_asv2020-01_img16_Southwest_Beira_Lake.jpg",
);

const colomboSkyline = image(
  "colombo-skyline.jpg",
  "Colombo skyline across the waterfront, with the Lotus Tower visible among the high-rises.",
  "XKillSwitchXxx",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Colombo_Skyline_Jan_2022.jpg",
);

const colomboMarine = image(
  "colombo-marine.jpg",
  "The coast railway and road along Marine Drive in Colombo, with the sea on one side and the city on the other.",
  "Pol van den Scheetek",
  "CC BY 3.0",
  "https://commons.wikimedia.org/wiki/File:Marine_Drive_Colombo_-_panoramio.jpg",
);

const colomboDutch = image(
  "colombo-dutch-hospital.jpg",
  "The restored Dutch Hospital precinct in Colombo Fort.",
  "Kanatonian",
  "CC BY-SA 3.0",
  "https://commons.wikimedia.org/wiki/File:Dutch_Hospital.jpg",
);

const colomboSpices = image(
  "colombo-spices.jpg",
  "Bags of red spice stacked at a market stall in Pettah, Colombo.",
  "Adam Jones",
  "CC BY-SA 2.0",
  "https://commons.wikimedia.org/wiki/File:Bags_of_Spices_in_Market_-_Pettah_District_-_Colombo_-_Sri_Lanka_(13995169756).jpg",
);

const colomboArcade = image(
  "colombo-arcade.jpg",
  "The white colonial arcade at Independence Square in Colombo, with a lawn in front.",
  "Anuradha Dullewe Wijeyeratne",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Arcade_Independence_Square,_Colombo,_Sri_Lanka.jpg",
);

const kandyLake = image(
  "kandy-lake.jpg",
  "Kandy Lake with the Temple of the Sacred Tooth Relic complex on the far bank.",
  "Dan Arndt",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Kandy_Lake_-_Temple_of_the_Tooth.jpg",
);

const kandyGarden = image(
  "kandy-garden.jpg",
  "A lawn and mature trees in the Royal Botanical Gardens near Kandy.",
  "McKay Savage",
  "CC BY 2.0",
  "https://commons.wikimedia.org/wiki/File:Kandy_Botanical_Garden,_Sri_Lanka.jpg",
);

const kandyPeradeniya = image(
  "kandy-peradeniya.jpg",
  "Landscaped forest inside the Peradeniya Botanical Gardens near Kandy.",
  "Vyacheslav Argenberg",
  "CC BY 4.0",
  "https://commons.wikimedia.org/wiki/File:Sri_Lanka,_Peradeniya_Botanical_Gardens,_Landscaped_Forest.jpg",
);

const kandyTemple = image(
  "kandy-temple.jpg",
  "The Temple of the Sacred Tooth Relic in Kandy, seen from across the grounds.",
  "A. Savin",
  "Free Art License",
  "https://commons.wikimedia.org/wiki/File:SL_Kandy_asv2020-01_img34_Sacred_Tooth_Temple.jpg",
);

const kandyNight = image(
  "kandy-night.jpg",
  "The Temple of the Tooth lit at night, reflected in Kandy Lake.",
  "Nalin Adikaram",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Kandy_by_night.jpg",
);

const ellaPeak = image(
  "ella-peak.jpg",
  "The green ridge of Little Adam’s Peak above Ella, with forested hills beyond.",
  "Gayan Perera",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Little_adams_peak,_Ella_Sri_Lanka.jpg",
);

const ellaHills = image(
  "ella-hills.jpg",
  "Hills and railway country near Demodara, on the edge of Ella.",
  "A. Savin",
  "Free Art License",
  "https://commons.wikimedia.org/wiki/File:SL_Demodara_near_Ella_asv2020-01_img02.jpg",
);

const ellaBridgeWide = image(
  "ella-bridge-wide.jpg",
  "Nine Arches Bridge in Ella, curving through tea and forest.",
  "Ishan Shanuka",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Nine_arch_bridge,_Ella,_Sri_lanka.jpg",
);

const ellaBridge = image(
  "ella-bridge.jpg",
  "Walkers on the track across Nine Arches Bridge, with tea fields below the arches.",
  "Janith Pramuditha",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Nine_arch_Sri_Lanka.jpg",
);

const galleStreet = image(
  "galle-street.jpg",
  "A quiet street inside the ramparts of Galle Fort.",
  "Tom Worthington",
  "CC BY 2.0",
  "https://commons.wikimedia.org/wiki/File:Galle_Fort_Street_(45436649062).jpg",
);

const galleLighthouse = image(
  "galle-lighthouse.jpg",
  "The lighthouse and rampart wall of Galle Fort, with the sea on the right.",
  "Jan Kranendonk",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Galle_Fort_wall_and_lighthouse.jpg",
);

const galleSunset = image(
  "galle-sunset.jpg",
  "Galle Fort buildings lit at dusk beside the Indian Ocean.",
  "calflier001",
  "CC BY-SA 2.0",
  "https://commons.wikimedia.org/wiki/File:GALLE_FORT_AT_SUNSET_SRI_LANKA_JAN_2013_(8492293234).jpg",
);

const unawatuna = image(
  "unawatuna.jpg",
  "Unawatuna beach, with fishing boats pulled onto the sand under coconut palms.",
  "Bernard Gagnon",
  "CC BY-SA 3.0",
  "https://commons.wikimedia.org/wiki/File:Unawatuna.jpg",
);

const jungleBeach = image(
  "jungle-beach.jpg",
  "Jungle Beach at Unawatuna, a small cove near Galle.",
  "Hirushini Dematagoda",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Jungle_Beach,_Unawatuna,_Sri_Lanka.jpg",
);

const mirissaSea = image(
  "mirissa-sea.jpg",
  "The Mirissa coast, with surf, a sandy edge, and palms on the headland.",
  "Thedani Karasnagoda",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Mirissa_sea_1.jpg",
);

const mirissaSeaTwo = image(
  "mirissa-sea-2.jpg",
  "Open water and coastline at Mirissa.",
  "Thedani Karasnagoda",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Mirissa_sea_2.jpg",
);

const coconutHill = image(
  "coconut-hill.jpg",
  "Coconut palms and breaking waves on the south coast near Mirissa.",
  "Richard Mortel",
  "CC BY 4.0",
  "https://commons.wikimedia.org/wiki/File:Coconut_Tree_Hill,_southern_coast_of_Sri_Lanka.jpg",
);

const mirissaSecret = image(
  "mirissa-secret.jpg",
  "Rocks and turquoise water at Secret Beach, Mirissa.",
  "ShakiAbey",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Secret_Beach_Mirissa.jpg",
);

const teaEstate = image(
  "tea-estate.jpg",
  "Tea pluckers in the bushes above Nuwara Eliya, with the town in the valley behind them.",
  "Vyacheslav Argenberg",
  "CC BY 4.0",
  "https://commons.wikimedia.org/wiki/File:Sri_Lanka,_Tea_plantations_near_Nuwara_Eliya,_Tea_estate.jpg",
);

const teaPickers = image(
  "tea-pickers.jpg",
  "A tea plucker harvesting leaves on a hillside estate near Nuwara Eliya.",
  "Vyacheslav Argenberg",
  "CC BY 4.0",
  "https://commons.wikimedia.org/wiki/File:Sri_Lanka,_Tea_plantations,_Nuwara_Eliya,_Picking_tea_leaves.jpg",
);

const nuwaraPost = image(
  "nuwara-post.jpg",
  "The red-brick post office in Nuwara Eliya, with its clock tower and tiled roof.",
  "Dan Arndt",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Nuwara_Eliya_Post_Office_(1).jpg",
);

const gregoryLake = image(
  "gregory-lake.jpg",
  "Gregory Lake at sunrise, with mist on the hills around Nuwara Eliya.",
  "Kalana Jayatilake",
  "CC BY-SA 4.0",
  "https://commons.wikimedia.org/wiki/File:Gregory_Lake_Nuwara_Eliya_01.jpg",
);

export const heroImage = image(
  "hero.jpg",
  "Two coconut palms lean over the surf on Sri Lanka’s south coast.",
  "Richard Mortel",
  "CC BY 4.0",
  "https://commons.wikimedia.org/wiki/File:Coconut_Tree_Hill,_southern_Sri_Lanka.jpg",
);

export const properties: Property[] = [
  {
    slug: "marine-drive-loft",
    name: "Marine Drive Loft",
    destination: "Colombo",
    neighbourhood: "Colombo 03",
    type: "apartment",
    pricePerNightLkr: 34500,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    summary:
      "A bright third-floor apartment on Marine Drive, for city days and an evening walk by the sea.",
    description:
      "The loft sits above the coast road in Colombo 03. Mornings are for the marine breeze and a walk toward Galle Face. Afternoons are for the cafés on Duplication Road, or a desk by the window if you are in town for work.\n\nTwo bedrooms share a kitchen and a living room long enough for four people to eat together. A supermarket and a pharmacy are on the same block. The host can arrange a car to the airport if you ask a day ahead.",
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "Kitchen",
      "Washer",
      "Workspace",
      "Ocean breeze",
      "Lift",
    ],
    images: [colomboBeira, colomboSkyline, colomboMarine],
  },
  {
    slug: "pettah-house-hotel",
    name: "Pettah House Hotel",
    destination: "Colombo",
    neighbourhood: "Colombo Fort",
    type: "hotel",
    pricePerNightLkr: 16800,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    summary:
      "A small hotel beside the Fort, useful for a night between trains or a morning in Pettah.",
    description:
      "Pettah House is a short tuk-tuk from the Fort railway station and the Dutch Hospital precinct. Rooms are compact, with a proper bed, a desk, and blackout curtains for early trains.\n\nBreakfast is hoppers or toast in the courtyard, and the desk will point you to the floating market or the port-area cafés. It suits a couple, not a family.",
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "Breakfast",
      "Hot water",
      "Workspace",
      "Daily housekeeping",
    ],
    images: [colomboDutch, colomboSpices, colomboArcade],
  },
  {
    slug: "kandy-lake-pavilion",
    name: "Kandy Lake Pavilion",
    destination: "Kandy",
    neighbourhood: "Kandy Lake",
    type: "villa",
    pricePerNightLkr: 52000,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    featured: true,
    summary:
      "A two-storey villa above the lake, with a pool and room for three couples or a family.",
    description:
      "The pavilion looks down toward Kandy Lake and the temple roofs. Evenings are quiet enough to hear the city without being in it. The pool is small and private, and the veranda is where most guests end up with tea.\n\nThree bedrooms each have their own bathroom. A cook can be booked for rice and curry, and a driver is on call for the temple, the botanical gardens, or the train to Ella.",
    amenities: [
      "Wi-Fi",
      "Swimming pool",
      "Air conditioning",
      "Kitchen",
      "Parking",
      "Lake view",
      "Hot water",
    ],
    images: [kandyLake, kandyGarden, kandyPeradeniya],
  },
  {
    slug: "temple-street-guesthouse",
    name: "Temple Street Guesthouse",
    destination: "Kandy",
    neighbourhood: "Temple Street",
    type: "guesthouse",
    pricePerNightLkr: 9200,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    summary:
      "A family-run room a walk from the lake path, with rice and curry if you want it.",
    description:
      "The guesthouse is a family home with one guest room and a shared sitting room that faces the temple side of town. You will hear bells. That is the point of staying here.\n\nHot water is reliable in the evening. Breakfast is included, and dinner is the household curry if you say yes before noon. There is no pool and no air conditioning, only a fan and a window.",
    amenities: ["Wi-Fi", "Breakfast", "Fan", "Hot water", "Home-cooked dinner", "Lake path nearby"],
    images: [kandyTemple, kandyNight, kandyGarden],
  },
  {
    slug: "ella-gap-bungalow",
    name: "Ella Gap Bungalow",
    destination: "Ella",
    neighbourhood: "Ella Gap",
    type: "bungalow",
    pricePerNightLkr: 27500,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    summary:
      "A hill bungalow on the Ella gap, close to Little Adam’s Peak and cool enough for a blanket.",
    description:
      "The bungalow faces the gap, so the first thing you see is mist or a clear line of hills, depending on the hour. It is a short walk to the start of Little Adam’s Peak and a longer one down into Ella town.\n\nTwo bedrooms sleep five with the daybed. There is a fireplace for the colder nights and a kitchen if you would rather not eat in town every evening. The road is narrow. Tell the host your arrival time.",
    amenities: [
      "Wi-Fi",
      "Fireplace",
      "Kitchen",
      "Mountain view",
      "Hot water",
      "Parking",
      "Blankets",
    ],
    images: [ellaPeak, ellaHills, ellaBridgeWide],
  },
  {
    slug: "nine-arches-cabin",
    name: "Nine Arches Cabin",
    destination: "Ella",
    neighbourhood: "Nine Arches",
    type: "cabin",
    pricePerNightLkr: 14200,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    summary: "A one-room cabin a short walk from the bridge, timed for the blue train.",
    description:
      "The cabin is for two. There is a bed, a kettle, a small bathroom, and a balcony that faces the valley the train crosses. Most guests walk to Nine Arches Bridge in the morning and come back for tea.\n\nIt is simple on purpose. No kitchen beyond the kettle, and the road is steep after rain. The host lives next door and will tell you when the train is usually due.",
    amenities: ["Wi-Fi", "Kettle", "Balcony", "Hot water", "Mountain view", "Train walk"],
    images: [ellaBridge, ellaBridgeWide, ellaHills],
  },
  {
    slug: "rampart-house",
    name: "Rampart House",
    destination: "Galle",
    neighbourhood: "Galle Fort",
    type: "villa",
    pricePerNightLkr: 68000,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    featured: true,
    summary:
      "A restored house inside the Galle ramparts, with a courtyard and room for a whole group.",
    description:
      "Rampart House is a walk from the lighthouse, the fort walls, and the restaurants on Pedlar Street. The courtyard is the centre of the house: breakfast happens there, and so do late conversations.\n\nFour bedrooms sleep eight. One bathroom is shared by two of the smaller rooms. Air conditioning is in the bedrooms, not the courtyard. Cars stay outside the fort. The host arranges a porter from the gate.",
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "Courtyard",
      "Kitchen",
      "Housekeeping",
      "Fort location",
      "Hot water",
    ],
    images: [galleStreet, galleLighthouse, galleSunset],
  },
  {
    slug: "lighthouse-bay-hotel",
    name: "Lighthouse Bay Hotel",
    destination: "Galle",
    neighbourhood: "Galle",
    type: "hotel",
    pricePerNightLkr: 24600,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    summary: "A bay-facing hotel room just outside the fort, with a pool and a morning shuttle.",
    description:
      "The room looks toward the bay rather than into the fort lanes. You can walk the ramparts after breakfast or take the hotel shuttle to Unawatuna and be back before lunch.\n\nThe room sleeps two, with space for a child on the daybed. The pool is shared with the hotel. Dinner is a seafood grill downstairs, or you can walk into the fort.",
    amenities: [
      "Wi-Fi",
      "Air conditioning",
      "Swimming pool",
      "Breakfast",
      "Bay view",
      "Beach shuttle",
      "Housekeeping",
    ],
    images: [galleLighthouse, unawatuna, jungleBeach],
  },
  {
    slug: "coconut-hill-house",
    name: "Coconut Hill House",
    destination: "Mirissa",
    neighbourhood: "Mirissa",
    type: "villa",
    pricePerNightLkr: 41500,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    featured: true,
    summary:
      "A hill villa above Mirissa bay, with a pool and a dawn pickup for whale watching.",
    description:
      "The house sits above the bay, high enough that the road noise drops away. The pool faces the sea. Coconut trees fill the slope between the gate and the water.\n\nThree bedrooms share two bathrooms. The host can book the 6 a.m. whale boat and will have coffee ready before you leave. The kitchen is stocked for breakfast. Dinners are better in the bay restaurants, a ten-minute walk down.",
    amenities: [
      "Wi-Fi",
      "Swimming pool",
      "Air conditioning",
      "Kitchen",
      "Ocean view",
      "Whale-watch pickup",
      "Parking",
    ],
    images: [mirissaSea, coconutHill, mirissaSeaTwo],
  },
  {
    slug: "secret-beach-guesthouse",
    name: "Secret Beach Guesthouse",
    destination: "Mirissa",
    neighbourhood: "Secret Beach",
    type: "guesthouse",
    pricePerNightLkr: 11500,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    featured: false,
    summary: "Two simple rooms above a quiet cove, run by a family that still takes a boat out.",
    description:
      "The guesthouse is a pair of rooms over the family home, a short path from Secret Beach. Fans, mosquito nets, and a shared bathroom. It is not a resort, and it does not pretend to be.\n\nThe owner still fishes. If the weather is kind he will take guests out in the morning. Breakfast is fruit, bread, and tea. There is a kettle in each room and a cold shower that is honestly cold.",
    amenities: ["Wi-Fi", "Fan", "Mosquito nets", "Breakfast", "Beach path", "Kettle"],
    images: [mirissaSecret, mirissaSeaTwo, coconutHill],
  },
  {
    slug: "pedro-tea-bungalow",
    name: "Pedro Tea Bungalow",
    destination: "Nuwara Eliya",
    neighbourhood: "Pedro",
    type: "bungalow",
    pricePerNightLkr: 29800,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    featured: true,
    summary:
      "A planter’s bungalow beside a working tea estate, with fireplaces and an early mist.",
    description:
      "The bungalow is on the edge of a working estate above Nuwara Eliya. You can walk between the tea rows before breakfast. The town, the post office, and Gregory Lake are a short drive when you want them.\n\nFireplaces are in the sitting room and the larger bedroom. A cook comes with the house and knows the older estate recipes. Nights are cold. The blankets are part of the booking, not an extra.",
    amenities: [
      "Wi-Fi",
      "Fireplace",
      "Cook",
      "Tea-estate walks",
      "Hot water",
      "Parking",
      "Mountain view",
    ],
    images: [teaEstate, teaPickers, nuwaraPost],
  },
  {
    slug: "gregory-mist-hotel",
    name: "Gregory Mist Hotel",
    destination: "Nuwara Eliya",
    neighbourhood: "Gregory Lake",
    type: "hotel",
    pricePerNightLkr: 18900,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    featured: false,
    summary: "A tidy hotel room near Gregory Lake, with wool blankets and an English breakfast.",
    description:
      "The room is for two, a short walk from Gregory Lake and the racecourse lawn. It is the practical Nuwara Eliya stay: warm, clean, and close to town when the mist comes down.\n\nBreakfast is eggs, toast, and tea. There is no kitchen. The heater works, and the staff will call a car for the tea factories if you do not want to drive the hills yourself.",
    amenities: ["Wi-Fi", "Heater", "Breakfast", "Hot water", "Lake walk", "Housekeeping"],
    images: [gregoryLake, teaPickers, nuwaraPost],
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((property) => property.featured);
}

export const destinationGuides = [
  {
    destination: "Colombo" as const,
    image: colomboBeira,
    blurb: "Marine Drive, the Fort, and a night between trains.",
  },
  {
    destination: "Kandy" as const,
    image: kandyLake,
    blurb: "The lake, the temple, and a slower evening.",
  },
  {
    destination: "Ella" as const,
    image: ellaBridge,
    blurb: "The gap, the bridge, and the blue train.",
  },
  {
    destination: "Galle" as const,
    image: galleSunset,
    blurb: "Ramparts, the lighthouse, and the south-coast road.",
  },
  {
    destination: "Mirissa" as const,
    image: mirissaSea,
    blurb: "A bay, a cove, and an early boat.",
  },
  {
    destination: "Nuwara Eliya" as const,
    image: gregoryLake,
    blurb: "Tea, mist, and a fireplace after dark.",
  },
];
