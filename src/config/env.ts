// Variáveis EXPO_PUBLIC_* ficam disponíveis no app. Veja .env.example.
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').replace(/\/+$/, '');

// Quando true, o app usa respostas simuladas (src/services/auth.ts) em vez do backend.
export const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

export const API_TIMEOUT_MS = 15000;
