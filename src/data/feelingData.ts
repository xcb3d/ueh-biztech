export interface Feeling {
  text: string;
  emoji: string;
}

export interface FeelingData {
  [key: string]: Feeling;
}

export const feelings: FeelingData = {
  happy: { text: 'vui vẻ', emoji: '😃' },
  blessed: { text: 'thấy may mắn', emoji: '😇' },
  loved: { text: 'cảm thấy được yêu', emoji: '🥰' },
  sad: { text: 'buồn', emoji: '😢' },
  nostalgic: { text: 'hoài niệm', emoji: '😌' },
  peaceful: { text: 'bình yên', emoji: '🧘' },
  excited: { text: 'phấn khích', emoji: '🤩' },
  thoughtful: { text: 'suy tư', emoji: '🤔' },
}; 