// Comprehensive Indian States and Cities dataset for Programmatic SEO routing
export const STATES_AND_CITIES = [
  {
    stateName: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    capital: "Chennai",
    cities: [
      { id: "tn-chennai", name: "Chennai", slug: "chennai", tier: 1, lat: 13.0827, lng: 80.2707, neighbors: ["chengalpattu", "kancheepuram", "tiruvallur"] },
      { id: "tn-coimbatore", name: "Coimbatore", slug: "coimbatore", tier: 2, lat: 11.0168, lng: 76.9558, neighbors: ["tiruppur", "erode", "palakkad", "salem"] },
      { id: "tn-madurai", name: "Madurai", slug: "madurai", tier: 2, lat: 9.9252, lng: 78.1198, neighbors: ["dindigul", "virudhunagar", "theni", "sivaganga"] },
      { id: "tn-trichy", name: "Tiruchirappalli", slug: "tiruchirappalli", tier: 2, lat: 10.7905, lng: 78.7047, neighbors: ["thanjavur", "pudukkottai", "karur", "perambalur"] },
      { id: "tn-salem", name: "Salem", slug: "salem", tier: 2, lat: 11.6643, lng: 78.1460, neighbors: ["dharmapuri", "namakkal", "erode"] },
      { id: "tn-tirunelveli", name: "Tirunelveli", slug: "tirunelveli", tier: 3, lat: 8.7139, lng: 77.7567, neighbors: ["thoothukudi", "tenkasi", "kanyakumari"] }
    ]
  },
  {
    stateName: "Maharashtra",
    stateSlug: "maharashtra",
    capital: "Mumbai",
    cities: [
      { id: "mh-mumbai", name: "Mumbai", slug: "mumbai", tier: 1, lat: 19.0760, lng: 72.8777, neighbors: ["thane", "navi-mumbai", "pune"] },
      { id: "mh-pune", name: "Pune", slug: "pune", tier: 1, lat: 18.5204, lng: 73.8567, neighbors: ["mumbai", "satara", "solapur", "ahmednagar"] },
      { id: "mh-nagpur", name: "Nagpur", slug: "nagpur", tier: 2, lat: 21.1458, lng: 79.0882, neighbors: ["wardha", "amravati", "chandrapur"] },
      { id: "mh-nashik", name: "Nashik", slug: "nashik", tier: 2, lat: 19.9975, lng: 73.7898, neighbors: ["aurangabad", "mumbai", "pune"] }
    ]
  },
  {
    stateName: "Karnataka",
    stateSlug: "karnataka",
    capital: "Bengaluru",
    cities: [
      { id: "ka-bengaluru", name: "Bengaluru", slug: "bengaluru", tier: 1, lat: 12.9716, lng: 77.5946, neighbors: ["mysuru", "tumakuru", "hosur", "kolar"] },
      { id: "ka-mysuru", name: "Mysuru", slug: "mysuru", tier: 2, lat: 12.2958, lng: 76.6394, neighbors: ["bengaluru", "mandya", "hassan"] },
      { id: "ka-hubballi", name: "Hubballi-Dharwad", slug: "hubballi", tier: 2, lat: 15.3647, lng: 75.1240, neighbors: ["belagavi", "gadag", "haveri"] },
      { id: "ka-mangaluru", name: "Mangaluru", slug: "mangaluru", tier: 2, lat: 12.9141, lng: 74.8560, neighbors: ["udupi", "kasaragod", "bengaluru"] }
    ]
  },
  {
    stateName: "Delhi NCT",
    stateSlug: "delhi",
    capital: "New Delhi",
    cities: [
      { id: "dl-delhi", name: "New Delhi", slug: "delhi", tier: 1, lat: 28.6139, lng: 77.2090, neighbors: ["noida", "gurugram", "ghaziabad", "faridabad"] }
    ]
  },
  {
    stateName: "Telangana",
    stateSlug: "telangana",
    capital: "Hyderabad",
    cities: [
      { id: "tg-hyderabad", name: "Hyderabad", slug: "hyderabad", tier: 1, lat: 17.3850, lng: 78.4867, neighbors: ["secunderabad", "warangal", "rangareddy", "sangareddy"] },
      { id: "tg-warangal", name: "Warangal", slug: "warangal", tier: 2, lat: 17.9689, lng: 79.5941, neighbors: ["hyderabad", "karimnagar", "khammam"] }
    ]
  },
  {
    stateName: "Gujarat",
    stateSlug: "gujarat",
    capital: "Gandhinagar",
    cities: [
      { id: "gj-ahmedabad", name: "Ahmedabad", slug: "ahmedabad", tier: 1, lat: 23.0225, lng: 72.5714, neighbors: ["gandhinagar", "vadodara", "surat"] },
      { id: "gj-surat", name: "Surat", slug: "surat", tier: 2, lat: 21.1702, lng: 72.8311, neighbors: ["vadodara", "navsari", "bharuch"] },
      { id: "gj-vadodara", name: "Vadodara", slug: "vadodara", tier: 2, lat: 22.3072, lng: 73.1812, neighbors: ["ahmedabad", "anand", "bharuch"] }
    ]
  },
  {
    stateName: "West Bengal",
    stateSlug: "west-bengal",
    capital: "Kolkata",
    cities: [
      { id: "wb-kolkata", name: "Kolkata", slug: "kolkata", tier: 1, lat: 22.5726, lng: 88.3639, neighbors: ["howrah", "salt-lake", "hooghly"] },
      { id: "wb-howrah", name: "Howrah", slug: "howrah", tier: 2, lat: 22.5958, lng: 88.2636, neighbors: ["kolkata", "hooghly", "kharagpur"] }
    ]
  },
  {
    stateName: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    capital: "Lucknow",
    cities: [
      { id: "up-lucknow", name: "Lucknow", slug: "lucknow", tier: 2, lat: 26.8467, lng: 80.9462, neighbors: ["kanpur", "ayodhya", "barabanki"] },
      { id: "up-kanpur", name: "Kanpur", slug: "kanpur", tier: 2, lat: 26.4499, lng: 80.3319, neighbors: ["lucknow", "unnao", "fatehpur"] },
      { id: "up-noida", name: "Noida", slug: "noida", tier: 1, lat: 28.5355, lng: 77.3910, neighbors: ["delhi", "greater-noida", "ghaziabad"] },
      { id: "up-varanasi", name: "Varanasi", slug: "varanasi", tier: 2, lat: 25.3176, lng: 82.9739, neighbors: ["prayagraj", "mirzapur", "jaunpur"] }
    ]
  },
  {
    stateName: "Rajasthan",
    stateSlug: "rajasthan",
    capital: "Jaipur",
    cities: [
      { id: "rj-jaipur", name: "Jaipur", slug: "jaipur", tier: 2, lat: 26.9124, lng: 75.7873, neighbors: ["ajmer", "jodhpur", "alwar", "kota"] },
      { id: "rj-jodhpur", name: "Jodhpur", slug: "jodhpur", tier: 2, lat: 26.2389, lng: 73.0243, neighbors: ["jaipur", "bikaner", "pali"] }
    ]
  },
  {
    stateName: "Kerala",
    stateSlug: "kerala",
    capital: "Thiruvananthapuram",
    cities: [
      { id: "kl-kochi", name: "Kochi", slug: "kochi", tier: 2, lat: 9.9312, lng: 76.2673, neighbors: ["alappuzha", "thrissur", "kottayam"] },
      { id: "kl-trivandrum", name: "Thiruvananthapuram", slug: "thiruvananthapuram", tier: 2, lat: 8.5241, lng: 76.9366, neighbors: ["kollam", "kanyakumari"] }
    ]
  }
];

// Flat city list helper
export const ALL_CITIES = STATES_AND_CITIES.flatMap(state => 
  state.cities.map(city => ({
    ...city,
    stateName: state.stateName,
    stateSlug: state.stateSlug
  }))
);

// Lookups
export const getCityBySlugs = (stateSlug, citySlug) => {
  return ALL_CITIES.find(
    c => c.stateSlug.toLowerCase() === stateSlug.toLowerCase() && 
         c.slug.toLowerCase() === citySlug.toLowerCase()
  );
};

export const getStateBySlug = (stateSlug) => {
  return STATES_AND_CITIES.find(s => s.stateSlug.toLowerCase() === stateSlug.toLowerCase());
};
