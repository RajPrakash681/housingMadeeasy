
import {
  Client,
  Account,
  ID,
  Databases,
  OAuthProvider,
  Avatars,
  Query,
  Storage,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

export const client = new Client();

if (!config.endpoint || !config.projectId) {
  console.error("Missing Appwrite configuration:", config);
  throw new Error("Appwrite configuration is incomplete");
}

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function checkAuthStatus() {
  try {
    await account.get();
    return true;
  } catch (error) {
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error: any) {
    // Check if it's an authentication error (user not logged in)
    if (error.code === 401 || error.message?.includes('missing scopes')) {
      console.log("User is not authenticated");
      return null;
    }
    console.log(error);
    return null;
  }
}

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );

    return result.documents;
  } catch (error) {
    console.error("Error fetching latest properties:", error);
    // Return mock data as fallback
    return [
      {
        $id: "1",
        name: "Luxury Villa",
        address: "123 Ocean View Dr, Miami, FL",
        price: 850000,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        type: "Villa",
        rating: 4.8,
        facilities: ["Gym", "Swimmingpool", "Wifi", "CarParking"]
      },
      {
        $id: "2", 
        name: "Modern Apartment",
        address: "456 Downtown Ave, New York, NY",
        price: 550000,
        image: "https://images.unsplash.com/photo-1605146768851-eda79da39897?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        type: "Apartment",
        rating: 4.5,
        facilities: ["Gym", "Wifi", "Laundry"]
      }
    ];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All")
      buildQuery.push(Query.equal("type", filter));

    // Remove search queries for now since fulltext indexes are not set up
    // if (query)
    //   buildQuery.push(
    //     Query.or([
    //       Query.search("name", query),
    //       Query.search("address", query),
    //       Query.search("type", query),
    //     ])
    //   );

    if (limit) buildQuery.push(Query.limit(limit));

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return result.documents;
  } catch (error) {
    console.error("Error fetching properties:", error);
    // Return mock data as fallback
    const mockProperties = [
      {
        $id: "1",
        name: "Luxury Villa",
        address: "123 Ocean View Dr, Miami, FL",
        price: 850000,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        type: "Villa",
        rating: 4.8,
        facilities: ["Gym", "Swimmingpool", "Wifi", "CarParking"]
      },
      {
        $id: "2", 
        name: "Modern Apartment",
        address: "456 Downtown Ave, New York, NY",
        price: 550000,
        image: "https://images.unsplash.com/photo-1605146768851-eda79da39897?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        type: "Apartment",
        rating: 4.5,
        facilities: ["Gym", "Wifi", "Laundry"]
      },
      {
        $id: "3",
        name: "Cozy House",
        address: "789 Suburban St, Austin, TX",
        price: 425000,
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        type: "House",
        rating: 4.3,
        facilities: ["Laundry", "CarParking", "Wifi"]
      },
      {
        $id: "4",
        name: "Downtown Condo",
        address: "321 City Center Blvd, San Francisco, CA",
        price: 720000,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 2,
        bathrooms: 2,
        area: 1100,
        type: "Condos",
        rating: 4.6,
        facilities: ["Gym", "Swimmingpool", "Wifi", "Concierge"]
      }
    ];

    // Apply filter if specified
    let filteredProperties = mockProperties;
    if (filter && filter !== "All") {
      filteredProperties = mockProperties.filter(property => property.type === filter);
    }

    // Apply limit if specified
    if (limit) {
      filteredProperties = filteredProperties.slice(0, limit);
    }

    return filteredProperties;
  }
}

// write function to get property by id
export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.error("Error fetching property by id:", error);
    // Return mock data as fallback
    const mockProperties = [
      {
        $id: "1",
        name: "Luxury Villa",
        address: "123 Ocean View Dr, Miami, FL",
        price: 850000,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        type: "Villa",
        rating: 4.8,
        facilities: ["Gym", "Swimmingpool", "Wifi", "CarParking"]
      },
      {
        $id: "2", 
        name: "Modern Apartment",
        address: "456 Downtown Ave, New York, NY",
        price: 550000,
        image: "https://images.unsplash.com/photo-1605146768851-eda79da39897?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        type: "Apartment",
        rating: 4.5,
        facilities: ["Gym", "Wifi", "Laundry"]
      },
      {
        $id: "3",
        name: "Cozy House",
        address: "789 Suburban St, Austin, TX",
        price: 425000,
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        type: "House",
        rating: 4.3,
        facilities: ["Laundry", "CarParking", "Wifi"]
      },
      {
        $id: "4",
        name: "Downtown Condo",
        address: "321 City Center Blvd, San Francisco, CA",
        price: 720000,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bedrooms: 2,
        bathrooms: 2,
        area: 1100,
        type: "Condos",
        rating: 4.6,
        facilities: ["Gym", "Swimmingpool", "Wifi", "Concierge"]
      }
    ];
    
    return mockProperties.find(property => property.$id === id) || null;
  }
}
