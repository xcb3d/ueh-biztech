// Defines the core data structures for the application.

import { CraftVillage } from "@/data/craft-villages";

// Basic coordinate type
export interface Coordinate {
  lat: number;
  lng: number;
}

// Represents a user of the application
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

// Danh mục di tích
export type Category = 
  | 'kien-truc-nghe-thuat' 
  | 'lich-su' 
  | 'khao-co' 
  | 'danh-lam-thang-canh' 
  | 'bao-tang';

// Represents a physical location on the map with official information
export interface Location {
  id: string; // Used for URL slug, e.g., "ho-guom"
  name: string;
  coordinates: Coordinate;
  region: 'Bắc' | 'Trung' | 'Nam';
  heroImage: string; // Main image for the location
  summary: string; // Short description for map preview sidebar
  articleContent: string; // Full markdown content for the location's dedicated page
  category: Category;
  historicalFact: string;
  type: 'location';
  moments?: Moment[];
}

// Represents an event that occurs at a specific location
export interface Event {
  id: string; // e.g., "tet-ha-noi-2024"
  name: string;
  locationId: string; // Links the event to a location
  heroImage: string;
  summary: string;
  articleContent: string; // Full markdown content
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  themes: string[]; // e.g., ['culture', 'festival']
}

// Represents a user-generated story or "memory" associated with a Location
export interface Moment {
  id: string;
  locationId: string;
  title: string;
  content: string;
  author: User;
  createdAt: string; // ISO 8601 date string
  imageUrl?: string; // Legacy: Single image URL (for backward compatibility)
  images?: string[]; // Array of image URLs
  category?: string; // Category of the moment (e.g., 'cultural', 'historical', 'food', etc.)
  feeling?: string; // e.g., 'happy', 'nostalgic'
  hashtags?: string[];
  commentIds?: string[]; // Mảng ID của các bình luận
}

// Represents a user-generated comment on a Moment
export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string; // ISO 8601 date string
}

// Represents a geographical region for map navigation
export interface Region {
  name: string;
  center: [number, number];
  zoom: number;
}

export interface RegionMap {
  [key: string]: Region;
}

export type MapPoint = Location | CraftVillage;

// Simplified context state for the map
export interface MapContextState {
  selectedLocation: MapPoint | null;
  selectedTheme: string | null;
  isSidebarOpen: boolean;
  showOnlyLocationsWithEvents: boolean;
}

// Actions for the map context
export type MapContextAction = 
  | { type: 'SELECT_LOCATION'; payload: MapPoint | null }
  | { type: 'SET_THEME'; payload: string | null }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_EVENTS_FILTER' }; 