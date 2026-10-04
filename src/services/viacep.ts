import { onlyDigits } from '../utils/masks';

export type Endereco = {
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export class CepNotFoundError extends Error {
  constructor() {
    super('CEP não encontrado.');
    this.name = 'CepNotFoundError';
  }
}

// Consulta a API pública do ViaCEP (https://viacep.com.br). Não precisa de chave.
export async function buscarCep(cep: string): Promise<Endereco> {
  const digits = onlyDigits(cep);

  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);

  if (!response.ok) {
    throw new Error('Falha ao consultar o CEP.');
  }

  const data = await response.json();

  // Para CEP inexistente o ViaCEP responde 200 com { "erro": true }.
  if (data.erro) {
    throw new CepNotFoundError();
  }

  return {
    logradouro: data.logradouro ?? '',
    bairro: data.bairro ?? '',
    cidade: data.localidade ?? '',
    uf: data.uf ?? '',
  };
}