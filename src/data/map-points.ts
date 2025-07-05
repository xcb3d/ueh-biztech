import { locations } from './locationData';
import { craftVillages } from './craft-villages';
import { MapPoint } from '@/types/map-types';

// Chúng ta cần ép kiểu (cast) vì TypeScript không tự động kết hợp chúng
// dù cấu trúc đã tương thích.
export const mapPoints: MapPoint[] = [
    ...(locations as MapPoint[]), 
    ...(craftVillages as MapPoint[])
]; 