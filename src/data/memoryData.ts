import { moments } from './momentData';

// Alias moments as memories for backward compatibility
export const memories = moments;

// Memory types used in MomentDetail.tsx
export const memoryTypes = {
  'cultural': {
    name: 'Văn hóa',
    color: '#3b82f6', // blue-500
  },
  'historical': {
    name: 'Lịch sử',
    color: '#ef4444', // red-500
  },
  'nature': {
    name: 'Thiên nhiên',
    color: '#10b981', // emerald-500
  },
  'food': {
    name: 'Ẩm thực',
    color: '#f59e0b', // amber-500
  },
  'spiritual': {
    name: 'Tâm linh',
    color: '#8b5cf6', // violet-500
  },
  'default': {
    name: 'Khác',
    color: '#6b7280', // gray-500
  }
}; 