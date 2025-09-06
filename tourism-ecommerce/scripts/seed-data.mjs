#!/usr/bin/env node

import fetch from 'node-fetch';

const API_BASE_URL = 'http://kilafy-backed.us-east-1.elasticbeanstalk.com/api';

// Realistic tourism data
const providers = [
  {
    userId: "93bc1bf0-3af9-4830-95b9-0b4829fb1b94", // Existing user ID
    companyName: "Adventure Colombia Tours",
    legalName: "Adventure Colombia Tours SAS",
    vatNumber: "900123456-1",
    description: "Leading adventure tourism company in Colombia offering authentic experiences",
    verified: true
  },
  {
    userId: "93bc1bf0-3af9-4830-95b9-0b4829fb1b94", // Existing user ID
    companyName: "Cartagena Heritage Tours",
    legalName: "Cartagena Heritage Tours Ltda",
    vatNumber: "900234567-2",
    description: "Historical and cultural tours in Cartagena and surrounding areas",
    verified: true
  },
  {
    userId: "93bc1bf0-3af9-4830-95b9-0b4829fb1b94", // Existing user ID
    companyName: "Andes Trekking Co",
    legalName: "Andes Trekking Company SAS",
    vatNumber: "900345678-3", 
    description: "Mountain trekking and hiking specialists in the Colombian Andes",
    verified: false
  }
];

const categories = [
  {
    name: "City Tours",
    slug: "city-tours"
  },
  {
    name: "Adventure Sports", 
    slug: "adventure-sports"
  },
  {
    name: "Cultural Experiences",
    slug: "cultural-experiences"
  },
  {
    name: "Food & Dining",
    slug: "food-dining"
  },
  {
    name: "Nature & Wildlife",
    slug: "nature-wildlife"
  },
  {
    name: "Water Activities",
    slug: "water-activities"
  }
];

const locations = [
  {
    country: "Colombia",
    region: "Bolivar",
    city: "Cartagena",
    lat: 10.4236,
    lon: -75.5378,
    slug: "cartagena-colombia"
  },
  {
    country: "Colombia", 
    region: "Cundinamarca",
    city: "Bogota",
    lat: 4.7110,
    lon: -74.0721,
    slug: "bogota-colombia"
  },
  {
    country: "Colombia",
    region: "Antioquia", 
    city: "Medellin",
    lat: 6.2442,
    lon: -75.5812,
    slug: "medellin-colombia"
  },
  {
    country: "Colombia",
    region: "Valle del Cauca",
    city: "Cali",
    lat: 3.4516,
    lon: -76.5320,
    slug: "cali-colombia"
  },
  {
    country: "Colombia",
    region: "Magdalena",
    city: "Santa Marta", 
    lat: 11.2408,
    lon: -74.1990,
    slug: "santa-marta-colombia"
  }
];

const services = [
  {
    title: "Historic Cartagena Walking Tour",
    shortDescription: "Explore the colonial architecture and rich history of Cartagena's Old Town",
    longDescription: "Discover the magic of Cartagena on this comprehensive walking tour through the UNESCO World Heritage Old Town. Visit the iconic Clock Tower, walk along the ancient city walls, explore colorful colonial streets, and learn about the fascinating history of this Caribbean gem.",
    durationMinutes: 180,
    languageOffered: ["English", "Spanish", "French"],
    maxCapacity: 15,
    minCapacity: 2,
    status: "active"
  },
  {
    title: "Coffee Farm Experience in Zona Cafetera",
    shortDescription: "Learn about Colombian coffee production with tastings and farm tour",
    longDescription: "Immerse yourself in Colombia's coffee culture with a visit to a traditional coffee farm. Learn about the entire coffee production process from bean to cup, participate in coffee picking (seasonal), enjoy professional tastings, and take home premium Colombian coffee.",
    durationMinutes: 240,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 12,
    minCapacity: 1,
    status: "active"
  },
  {
    title: "Salsa Dancing Class in Cali",
    shortDescription: "Learn to dance salsa in the world capital of salsa music",
    longDescription: "Experience the rhythm of Cali with authentic salsa dancing lessons taught by professional instructors. Learn basic steps, turns, and styling in the city where salsa lives and breathes. Includes welcome cocktail and live music session.",
    durationMinutes: 120,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 20,
    minCapacity: 2,
    status: "active"
  },
  {
    title: "Monserrate Cable Car & City Tour",
    shortDescription: "Panoramic views of Bogota from the famous Monserrate mountain",
    longDescription: "Take the cable car up to Monserrate mountain for breathtaking 360-degree views of Bogota. Visit the sanctuary at the top, enjoy traditional Colombian lunch, and continue with a city tour including La Candelaria historic district and Gold Museum.",
    durationMinutes: 300,
    languageOffered: ["English", "Spanish", "Portuguese"],
    maxCapacity: 25,
    minCapacity: 1,
    status: "active"
  },
  {
    title: "Paragliding Over Medellin",
    shortDescription: "Tandem paragliding adventure with stunning views of the City of Eternal Spring",
    longDescription: "Soar above Medellin with an experienced certified instructor on this thrilling tandem paragliding adventure. Enjoy spectacular aerial views of the city, surrounding mountains, and valleys. All equipment included, no experience necessary.",
    durationMinutes: 150,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 8,
    minCapacity: 1,
    status: "active"
  },
  {
    title: "Tayrona National Park Day Trip",
    shortDescription: "Pristine beaches and tropical rainforest in Colombia's most beautiful national park",
    longDescription: "Explore the stunning biodiversity of Tayrona National Park. Hike through tropical rainforest trails, relax on pristine Caribbean beaches, spot exotic wildlife, and swim in crystal-clear waters. Transportation from Santa Marta included.",
    durationMinutes: 480,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 16,
    minCapacity: 2,
    status: "active"
  },
  {
    title: "Zipline Adventure in Colombian Andes",
    shortDescription: "Adrenaline-pumping zipline course through cloud forest canopy",
    longDescription: "Experience the thrill of flying through the Colombian Andes on this exciting zipline adventure. Navigate multiple cables through cloud forest canopy, enjoy stunning mountain views, and learn about local ecosystem from expert guides.",
    durationMinutes: 180,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 12,
    minCapacity: 2,
    status: "active"
  },
  {
    title: "Street Food Tour in Bogota",
    shortDescription: "Taste authentic Colombian street food with a local foodie guide",
    longDescription: "Discover Bogota's incredible street food scene with a passionate local guide. Try traditional snacks like arepas, empanadas, fresh fruit, and more. Visit local markets, food stalls, and hidden gems that tourists rarely find.",
    durationMinutes: 210,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 10,
    minCapacity: 2,
    status: "active"
  }
];

// High-quality tourism images from Unsplash
const mediaData = [
  // Historic Cartagena Walking Tour images
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1605993440937-8a5b35b72e52?w=800&q=80",
    altText: "Colorful colonial buildings in Cartagena Old Town",
    mimeType: "image/jpeg",
    position: 1
  },
  {
    ownerType: "service", 
    url: "https://images.unsplash.com/photo-1564399915543-37a2ee10b67b?w=800&q=80",
    altText: "Cartagena city walls at sunset",
    mimeType: "image/jpeg",
    position: 2
  },
  // Coffee Farm Experience images
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    altText: "Coffee plantation in Colombian mountains",
    mimeType: "image/jpeg", 
    position: 1
  },
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=800&q=80",
    altText: "Fresh coffee beans being roasted",
    mimeType: "image/jpeg",
    position: 2
  },
  // Salsa Dancing Class images  
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    altText: "Couple dancing salsa in Cali",
    mimeType: "image/jpeg",
    position: 1
  },
  // Monserrate Cable Car images
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?w=800&q=80", 
    altText: "Panoramic view of Bogota from Monserrate",
    mimeType: "image/jpeg",
    position: 1
  },
  // Paragliding images
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80",
    altText: "Paragliding over green valleys",
    mimeType: "image/jpeg", 
    position: 1
  },
  // Tayrona National Park images
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1570197526852-16a95c9b0f88?w=800&q=80",
    altText: "Pristine beach in Tayrona National Park",
    mimeType: "image/jpeg",
    position: 1
  },
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    altText: "Tropical rainforest trail in Tayrona",
    mimeType: "image/jpeg",
    position: 2
  },
  // Zipline Adventure images
  {
    ownerType: "service", 
    url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    altText: "Zipline through cloud forest canopy",
    mimeType: "image/jpeg",
    position: 1
  },
  // Street Food Tour images
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1586471835542-21c3cb3ee6b0?w=800&q=80",
    altText: "Colombian street food arepas", 
    mimeType: "image/jpeg",
    position: 1
  },
  {
    ownerType: "service",
    url: "https://images.unsplash.com/photo-1604719312566-878b25d4dfe4?w=800&q=80",
    altText: "Colorful fruits at Colombian market",
    mimeType: "image/jpeg",
    position: 2
  }
];

// API helper functions
async function apiRequest(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error ${response.status}: ${errorText}`);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Request failed for ${endpoint}:`, error.message);
    return null;
  }
}

async function seedData() {
  console.log('🌱 Starting data seeding...');
  
  try {
    // Create providers first
    console.log('📦 Creating providers...');
    const createdProviders = [];
    for (const provider of providers) {
      const result = await apiRequest('/providers', 'POST', provider);
      if (result) {
        createdProviders.push(result);
        console.log(`✅ Created provider: ${provider.companyName}`);
      }
    }
    
    // Create categories
    console.log('📂 Creating categories...');
    const createdCategories = [];
    for (const category of categories) {
      const result = await apiRequest('/categories', 'POST', category);
      if (result) {
        createdCategories.push(result);
        console.log(`✅ Created category: ${category.name}`);
      }
    }
    
    // Create locations
    console.log('📍 Creating locations...');
    const createdLocations = [];
    for (const location of locations) {
      const result = await apiRequest('/locations', 'POST', location);
      if (result) {
        createdLocations.push(result);
        console.log(`✅ Created location: ${location.city}`);
      }
    }
    
    // Create services
    console.log('🎯 Creating services...');
    const createdServices = [];
    for (let i = 0; i < services.length; i++) {
      const service = {
        ...services[i],
        providerId: createdProviders[i % createdProviders.length]?.id || "provider1"
      };
      
      const result = await apiRequest('/services', 'POST', service);
      if (result) {
        createdServices.push(result);
        console.log(`✅ Created service: ${service.title}`);
      }
    }
    
    // Create media
    console.log('🖼️ Creating media...');
    for (let i = 0; i < mediaData.length; i++) {
      const media = {
        ...mediaData[i],
        ownerId: createdServices[Math.floor(i / 2)]?.id || "service1"
      };
      
      const result = await apiRequest('/media', 'POST', media);
      if (result) {
        console.log(`✅ Created media for service`);
      }
    }
    
    console.log('🎉 Data seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Providers: ${createdProviders.length}`);
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Locations: ${createdLocations.length}`);
    console.log(`   - Services: ${createdServices.length}`);
    console.log(`   - Media: ${mediaData.length}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

// Run the seeding
seedData();
