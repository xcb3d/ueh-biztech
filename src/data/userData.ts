import type { User } from '@/types/map-types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'An Nguyễn',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-1',
  },
  {
    id: 'user-2',
    name: 'Bảo Lê',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-2',
  },
  {
    id: 'user-3',
    name: 'Chi Phạm',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-3',
  },
  {
    id: 'user-4',
    name: 'Dũng Trần',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-4',
  },
];

export const userMap = new Map(users.map((user) => [user.id, user])); 