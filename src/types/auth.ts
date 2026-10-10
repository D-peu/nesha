// Tipos do contrato com o backend. Mantenha em sincronia com docs/API.md.

export type Perfil = 'CLIENTE' | 'PRESTADOR';

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
};

// POST /auth/login
export type LoginRequest = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number; // segundos
  usuario: Usuario;
};

// POST /clientes
export type EnderecoRequest = {
  cep: string; // só dígitos
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type RegisterRequest = {
  nome: string;
  cpf: string; // só dígitos
  telefone: string; // só dígitos
  email: string;
  senha: string;
  endereco: EnderecoRequest;
};

export type RegisterResponse = {
  usuario: Usuario;
};

// Corpo padrão de erro devolvido pelo backend.
export type ApiErrorBody = {
  codigo: string;
  mensagem: string;
  campos?: Record<string, string>; // chave = caminho do campo, ex.: "endereco.cep"
};
