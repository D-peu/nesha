import { USE_MOCK } from '../config/env';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  Usuario,
} from '../types/auth';
import { ApiError, request } from './api';

// ---------------------------------------------------------------------------
// Endpoints reais (contrato em docs/API.md)
// ---------------------------------------------------------------------------

export async function login(data: LoginRequest): Promise<LoginResponse> {
  if (USE_MOCK) {
    return mockLogin(data);
  }
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: data,
    auth: false,
  });
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  if (USE_MOCK) {
    return mockRegister(data);
  }
  return request<RegisterResponse>('/clientes', {
    method: 'POST',
    body: data,
    auth: false,
  });
}

export async function getMe(): Promise<Usuario> {
  if (USE_MOCK) {
    return mockGetMe();
  }
  return request<Usuario>('/usuarios/me');
}

// ---------------------------------------------------------------------------
// Modo simulado (EXPO_PUBLIC_USE_MOCK=true): permite desenvolver sem o backend.
// Login válido: teste@nesha.com / Senha@123
// ---------------------------------------------------------------------------

const MOCK_USER: Usuario = {
  id: 'mock-1',
  nome: 'Usuário de Teste',
  email: 'teste@nesha.com',
  perfil: 'CLIENTE',
};

const MOCK_TOKEN = 'mock-token';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mockLogin({ email, senha }: LoginRequest): Promise<LoginResponse> {
  await delay(800);

  if (email.toLowerCase() !== MOCK_USER.email || senha !== 'Senha@123') {
    throw new ApiError(401, 'CREDENCIAIS_INVALIDAS', 'E-mail ou senha incorretos.');
  }

  return {
    accessToken: MOCK_TOKEN,
    tokenType: 'Bearer',
    expiresIn: 3600,
    usuario: MOCK_USER,
  };
}

async function mockRegister(data: RegisterRequest): Promise<RegisterResponse> {
  await delay(800);

  if (data.email.toLowerCase() === MOCK_USER.email) {
    throw new ApiError(
      409,
      'EMAIL_JA_CADASTRADO',
      'Este e-mail já está cadastrado.',
      { email: 'Este e-mail já está cadastrado.' }
    );
  }

  return {
    usuario: {
      id: 'mock-2',
      nome: data.nome,
      email: data.email,
      perfil: 'CLIENTE',
    },
  };
}

async function mockGetMe(): Promise<Usuario> {
  await delay(300);
  return MOCK_USER;
}
