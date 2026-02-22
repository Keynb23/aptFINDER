# aptFINDER - Commute Sweet Spot

A powerful spatial analysis tool designed to help two people find the perfect neighborhood to live in based on their individual commute requirements. 

## 🗺️ Project Overview

The core goal of **aptFINDER** is to solve the "where should we live?" dilemma for couples or roommates working in different locations. By calculating travel time isochrones (areas reachable within a certain time) for both individuals, the app identifies the "Sweet Spot" – the overlapping area that satisfies both commute constraints simultaneously.

### Key Features
- **Dynamic Isochrones**: Real-time calculation of driving reachable areas using Mapbox API.
- **Intersection Analysis**: Uses Turf.js to compute the spatial intersection of two commute polygons.
- **Interactive Map**: A high-performance Mapbox GL JS map with dual-person commute visualization.
- **Dual Controls**: Independent sliders for each person to adjust their maximum acceptable commute time.
- **Theme Support**: Polished Light and Dark modes with glassmorphism UI elements.

## 🛠️ Tech Stack

- **Frontend**: 
  - React 19 + Vite
  - Tailwind CSS (Premium minimalist styling)
  - Framer Motion (Subtle UI animations)
  - Zustand (State management)
  - Mapbox GL JS + React Map GL (Mapping engine)
  - Turf.js (Geospatial logic)
  - React Aria Components (Accessible UI)
- **Backend**:
  - Node.js + Express (Mock API for future listing integration)

## 🚀 Future Roadmap

This project is designed for extensibility. Potential future updates include:
- **Real-time Listings**: Integrating Zillow/Apartments.com APIs to show available rentals within the "Sweet Spot".
- **Advanced Filtering**: 
  - 🚔 Crime Rate Overlays
  - 💰 Cost of Living data
  - 🚗 Real-time Traffic adjustments
  - 🏫 Proximity to high-rated schools
  - 🚌 Public Transportation accessibility
- **Multi-modal Transit**: Options for walking, cycling, or public transit isochrones instead of just driving.

## 🔒 Security & Best Practices

- **Environment Variables**: API keys and backend URLs are managed via `.env` files (excluded from version control).
- **Clean Architecture**: Separated logic for geospatial calculations (`hooks/useIsochrones.js`), global state (`store/`), and presentation components.
- **Performance**: Optimized re-renders using `useMemo` and TanStack Query for efficient API caching.

---
*Created with focus on spatial precision and premium user experience.*
