 🏡 HousingMadeEasy  
Simplifying Real Estate & Hotel Bookings  

HousingMadeEasy is a **modern mobile-first application** designed to revolutionize the way users discover properties and hotels. Built with **React Native, Expo, and Appwrite**, it provides a seamless booking experience, real-time listings, offline resilience, and secure authentication — all in one place.  

---

📱 Demo  
Check out the application in action:  
Video file: `src/assets/HousingMadeEasy_demo.mp4`  

---

✨ Features  

🏠 **Property & Hotel Listings**  
- Browse curated listings with images, ratings, and reviews  
- Filter by location, type, or price  
- Smooth mobile-first UI with quick navigation  

🔑 **Authentication & Security**  
- Google OAuth2 login via Appwrite  
- Secure session management  
- Streamlined signup/login flow  

📊 **Booking & Details**  
- Hotel booking interface with availability and facilities  
- Detailed property pages with descriptions, photos, ratings  
- Real-time updates from Appwrite  

📡 **Offline & Fallback Support**  
- Mock data fallback if backend/API is unavailable  
- Demo-ready even without internet  
- Friendly error handling and messages  

🤝 **Agent & Review System**  
- Agents can list properties with images  
- Reviews and ratings integrated  
- Ready for future marketplace expansion  

---

🛠️ Tech Stack  

**Mobile Framework**  
- React Native + Expo → Cross-platform mobile app  
- TypeScript → Type-safe development  

**Backend & APIs**  
- Appwrite → Authentication, Database, File Storage, Realtime APIs  
- Google OAuth2 → Secure user login  

**UI/UX Libraries**  
- React Navigation → Smooth navigation system  
- Context API → State management  
- Expo Assets → Image & video handling  

**Error & Data Handling**  
- Mock Data Layer → Offline & fallback handling  
- Modular Components → Reusable, scalable design  

---

🚀 Getting Started  

### Prerequisites  
- Node.js (>= 16.x)  
- npm or yarn  

### Installation  

Clone the repository  
```bash
git clone https://github.com/RajPrakash681/housingMadeeasy.git
cd housingMadeeasy
npm install
npm run start

📁 Project Structure

housingMadeeasy/
├── src/
│   ├── assets/               # Images, demo video
│   ├── components/           # Reusable UI components
│   │   ├── Card.tsx          # Property/Hotel card UI
│   │   ├── Listing.tsx       # Listing grid
│   │   └── ...
│   ├── screens/              # App screens
│   │   ├── HomeScreen.tsx    # Main dashboard
│   │   ├── LoginScreen.tsx   # Google OAuth2 login
│   │   ├── DetailsScreen.tsx # Property/Hotel details
│   │   ├── BookingScreen.tsx # Hotel booking flow
│   │   └── ProfileScreen.tsx # User profile & settings
│   ├── context/              # App context & state
│   ├── utils/                # Helpers, mock data, API calls
│   ├── App.tsx               # Main application component
│   └── ...
├── package.json              # Dependencies
├── app.json                  # Expo configuration
└── README.md                 # Documentation

## 🎯 Key Components

### 🧭 Navigation System
- Stack & tab-based navigation  
- Login flow → **Home → Details → Booking → Profile**  
- Mobile-optimized bottom navigation  

### 📱 Feature Screens
- **HomeScreen** → Explore property/hotel cards  
- **DetailsScreen** → Full description, reviews, and media  
- **BookingScreen** → Reserve hotel rooms instantly  
- **LoginScreen** → Google OAuth2 authentication  
- **ProfileScreen** → Manage user details  

### 📡 Offline Fallback
- Uses mock data when API fails  
- Ensures uninterrupted browsing experience  

---

## 🌟 Unique Value Proposition
- 📲 **Mobile-First Real Estate** → Designed for iOS & Android users  
- 🏨 **Hotel Booking + Property Listings** → All-in-one app  
- ⚡ **Offline Resilience** → Works even when backend is down  
- 🔐 **Appwrite Integration** → Realtime data + secure authentication  
- 👥 **Agent & Reviews Support** → Future-ready for scaling into a marketplace  

---

## 🔮 Roadmap
- 🌐 Multi-language support (Hindi & regional)  
- 🤖 AI-powered property recommendations  
- 📊 Price comparison & analytics dashboard  
- 🧩 Smart filters (budget, amenities, location proximity)  
- 📡 Offline-first booking capability  
- 💳 Integration with payment gateways  
- 🏘️ Expansion into rentals & co-living spaces  

---

## 🤝 Contributing

Contributions = ❤️  

1. Fork 🍴 the repo  
2. Create your branch 👉  
   ```bash
   git checkout -b feature-name
