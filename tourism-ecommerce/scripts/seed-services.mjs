#!/usr/bin/env node

import fetch from 'node-fetch';

const API_BASE_URL = 'https://guests-services.munnity.app/api';

// Use existing provider ID
const EXISTING_PROVIDER_ID = "09403eaa-9327-4149-bc98-bf6aacb1d803";

const services = [
  {
    title: "Historic Cartagena Walking Tour",
    shortDescription: "Explore the colonial architecture and rich history of Cartagena's Old Town",
    longDescription: "Discover the magic of Cartagena on this comprehensive walking tour through the UNESCO World Heritage Old Town. Visit the iconic Clock Tower, walk along the ancient city walls, explore colorful colonial streets, and learn about the fascinating history of this Caribbean gem.",
    durationMinutes: 180,
    languageOffered: ["English", "Spanish", "French"],
    maxCapacity: 15,
    minCapacity: 2,
    status: "active",
    providerId: EXISTING_PROVIDER_ID
  },
  {
    title: "Coffee Farm Experience in Zona Cafetera",
    shortDescription: "Learn about Colombian coffee production with tastings and farm tour",
    longDescription: "Immerse yourself in Colombia's coffee culture with a visit to a traditional coffee farm. Learn about the entire coffee production process from bean to cup, participate in coffee picking (seasonal), enjoy professional tastings, and take home premium Colombian coffee.",
    durationMinutes: 240,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 12,
    minCapacity: 1,
    status: "active",
    providerId: EXISTING_PROVIDER_ID
  },
  {
    title: "Salsa Dancing Class in Cali",
    shortDescription: "Learn to dance salsa in the world capital of salsa music",
    longDescription: "Experience the rhythm of Cali with authentic salsa dancing lessons taught by professional instructors. Learn basic steps, turns, and styling in the city where salsa lives and breathes. Includes welcome cocktail and live music session.",
    durationMinutes: 120,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 20,
    minCapacity: 2,
    status: "active",
    providerId: EXISTING_PROVIDER_ID
  },
  {
    title: "Monserrate Cable Car & City Tour",
    shortDescription: "Panoramic views of Bogota from the famous Monserrate mountain",
    longDescription: "Take the cable car up to Monserrate mountain for breathtaking 360-degree views of Bogota. Visit the sanctuary at the top, enjoy traditional Colombian lunch, and continue with a city tour including La Candelaria historic district and Gold Museum.",
    durationMinutes: 300,
    languageOffered: ["English", "Spanish", "Portuguese"],
    maxCapacity: 25,
    minCapacity: 1,
    status: "active",
    providerId: EXISTING_PROVIDER_ID
  },
  {
    title: "Paragliding Over Medellin",
    shortDescription: "Tandem paragliding adventure with stunning views of the City of Eternal Spring",
    longDescription: "Soar above Medellin with an experienced certified instructor on this thrilling tandem paragliding adventure. Enjoy spectacular aerial views of the city, surrounding mountains, and valleys. All equipment included, no experience necessary.",
    durationMinutes: 150,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 8,
    minCapacity: 1,
    status: "active",
    providerId: EXISTING_PROVIDER_ID
  },
  {
    title: "Tayrona National Park Day Trip",
    shortDescription: "Pristine beaches and tropical rainforest in Colombia's most beautiful national park",
    longDescription: "Explore the stunning biodiversity of Tayrona National Park. Hike through tropical rainforest trails, relax on pristine Caribbean beaches, spot exotic wildlife, and swim in crystal-clear waters. Transportation from Santa Marta included.",
    durationMinutes: 480,
    languageOffered: ["English", "Spanish"],
    maxCapacity: 16,
    minCapacity: 2,
    status: "active",
    providerId: EXISTING_PROVIDER_ID
  }
];

// High-quality tourism images from Unsplash
const mediaTemplates = [
  {
    url: "https://images.unsplash.com/photo-1605993440937-8a5b35b72e52?w=800&q=80",
    altText: "Colorful colonial buildings in Cartagena Old Town",
    mimeType: "image/jpeg",
    position: 1
  },
  {
    url: "https://images.unsplash.com/photo-1564399915543-37a2ee10b67b?w=800&q=80",
    altText: "Cartagena city walls at sunset",
    mimeType: "image/jpeg",
    position: 2
  },
  {
    url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    altText: "Coffee plantation in Colombian mountains",
    mimeType: "image/jpeg", 
    position: 1
  },
  {
    url: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=800&q=80",
    altText: "Fresh coffee beans being roasted",
    mimeType: "image/jpeg",
    position: 2
  },
  {
    url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    altText: "Couple dancing salsa in Cali",
    mimeType: "image/jpeg",
    position: 1
  },
  {
    url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?w=800&q=80", 
    altText: "Panoramic view of Bogota from Monserrate",
    mimeType: "image/jpeg",
    position: 1
  },
  {
    url: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80",
    altText: "Paragliding over green valleys",
    mimeType: "image/jpeg", 
    position: 1
  },
  {
    url: "https://images.unsplash.com/photo-1570197526852-16a95c9b0f88?w=800&q=80",
    altText: "Pristine beach in Tayrona National Park",
    mimeType: "image/jpeg",
    position: 1
  }
];

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

async function seedServicesAndMedia() {
  console.log('🌱 Starting services and media seeding...');
  
  try {
    // Create services
    console.log('🎯 Creating services...');
    const createdServices = [];
    for (const service of services) {
      const result = await apiRequest('/services', 'POST', service);
      if (result) {
        createdServices.push(result);
        console.log(`✅ Created service: ${service.title}`);
      }
    }
    
    // Create media for services
    console.log('🖼️ Creating media...');
    let mediaCount = 0;
    for (let i = 0; i < createdServices.length && i < mediaTemplates.length; i++) {
      const media = {
        ...mediaTemplates[i],
        ownerType: "service",
        ownerId: createdServices[i].id
      };
      
      const result = await apiRequest('/media', 'POST', media);
      if (result) {
        mediaCount++;
        console.log(`✅ Created media for service: ${createdServices[i].title}`);
      }
    }
    
    console.log('🎉 Services and media seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Services: ${createdServices.length}`);
    console.log(`   - Media: ${mediaCount}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

// Run the seeding
seedServicesAndMedia();
