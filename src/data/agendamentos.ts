// Dados mockados das telas de agenda. Quando o backend estiver pronto,
// troque as funções abaixo por chamadas em src/services (o restante das telas não muda).

export type StatusAgendamento =
  | 'PENDENTE'
  | 'CONFIRMADO'
  | 'CONCLUIDO'
  | 'CANCELADO';

export type Avaliacao = {
  nota: number;
  destaques: string[];
  comentario: string;
};

export type Agendamento = {
  id: string;
  status: StatusAgendamento;
  servico: string;
  valor: number;
  prestador: {
    nome: string;
    nota: number;
    avaliacoes: number;
    telefone: string;
  };
  cliente: {
    nome: string;
    desde: string;
    telefone: string;
  };
  dia: number; // dia do mês, usado no calendário do prestador
  dataCurta: string; // "15 Mai"
  dataLonga: string; // "15 de Maio, Quarta-feira"
  periodo: 'Manhã' | 'Tarde' | 'Noite';
  horarioInicio: string; // "13:00"
  horario: string; // "13:00 às 17:00"
  cidade: string;
  regiao: string; // "Zona Sul"
  endereco: string;
  observacoes?: string;
  motivoCancelamento?: string;
  avaliacao?: Avaliacao;
};

let agendamentos: Agendamento[] = [
  {
    id: 'ag-1',
    status: 'CONFIRMADO',
    servico: 'Manutenção de Jardim',
    valor: 160,
    prestador: {
      nome: 'Francisco Oliveira',
      nota: 4.9,
      avaliacoes: 82,
      telefone: '(11) 98765-4321',
    },
    cliente: {
      nome: 'Mariana Oliveira',
      desde: '2023',
      telefone: '(11) 97654-3210',
    },
    dia: 15,
    dataCurta: '15 Mai',
    dataLonga: '15 de Maio, Quarta-feira',
    periodo: 'Tarde',
    horarioInicio: '13:00',
    horario: '13:00 às 17:00',
    cidade: 'São Paulo',
    regiao: 'Zona Sul',
    endereco: 'Rua das Flores, 123 - Apt 42',
    observacoes:
      'Preciso que faça a poda da grama, limpeza dos canteiros e adubação das roseiras. Tenho os produtos de adubação aqui.',
  },
  {
    id: 'ag-2',
    status: 'PENDENTE',
    servico: 'Manutenção de Jardim',
    valor: 160,
    prestador: {
      nome: 'Francisco Oliveira',
      nota: 4.9,
      avaliacoes: 82,
      telefone: '(11) 98765-4321',
    },
    cliente: {
      nome: 'Mariana Oliveira',
      desde: '2023',
      telefone: '(11) 97654-3210',
    },
    dia: 15,
    dataCurta: '15 Mai',
    dataLonga: '15 de Maio, Quarta-feira',
    periodo: 'Tarde',
    horarioInicio: '13:00',
    horario: '13:00 às 17:00',
    cidade: 'São Paulo',
    regiao: 'Zona Sul',
    endereco: 'Rua das Flores, 123 - Apt 42',
    observacoes: 'Portão azul, tocar o interfone do apartamento 42.',
  },
  {
    id: 'ag-3',
    status: 'CONCLUIDO',
    servico: 'Manutenção de Jardim',
    valor: 160,
    prestador: {
      nome: 'Francisco Oliveira',
      nota: 4.9,
      avaliacoes: 82,
      telefone: '(11) 98765-4321',
    },
    cliente: {
      nome: 'Mariana Oliveira',
      desde: '2023',
      telefone: '(11) 97654-3210',
    },
    dia: 2,
    dataCurta: '02 Mai',
    dataLonga: '2 de Maio, Quinta-feira',
    periodo: 'Manhã',
    horarioInicio: '08:00',
    horario: '08:00 às 12:00',
    cidade: 'São Paulo',
    regiao: 'Zona Sul',
    endereco: 'Rua das Flores, 123 - Apt 42',
  },
];

export const MOTIVOS_CANCELAMENTO = [
  'Mudança de planos',
  'Encontrei outro profissional',
  'Problema de agenda',
  'Valor acima do esperado',
  'Outro motivo',
];

export const DESTAQUES_AVALIACAO = [
  'Pontualidade',
  'Qualidade do Trabalho',
  'Gentileza',
  'Organização',
];

export function listarAgendamentos(): Agendamento[] {
  return [...agendamentos];
}

export function buscarAgendamento(id?: string): Agendamento | undefined {
  return agendamentos.find((a) => a.id === id);
}

function atualizar(id: string, mudancas: Partial<Agendamento>) {
  agendamentos = agendamentos.map((a) =>
    a.id === id ? { ...a, ...mudancas } : a
  );
}

export function atualizarStatus(id: string, status: StatusAgendamento) {
  atualizar(id, { status });
}

export function cancelarAgendamento(id: string, motivo: string) {
  atualizar(id, { status: 'CANCELADO', motivoCancelamento: motivo });
}

export function avaliarAgendamento(id: string, avaliacao: Avaliacao) {
  atualizar(id, { avaliacao });
}

export function formatarValor(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export function primeiroNome(nome: string): string {
  return nome.split(' ')[0];
}

export const STATUS_LABEL: Record<StatusAgendamento, string> = {
  PENDENTE: 'Pendente',
  CONFIRMADO: 'Confirmado',
  CONCLUIDO: 'Concluído',
  CANCELADO: 'Cancelado',
};
