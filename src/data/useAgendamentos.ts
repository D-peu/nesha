import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  Agendamento,
  buscarAgendamento,
  listarAgendamentos,
} from './agendamentos';

// Recarrega os dados toda vez que a tela volta ao foco
// (ex.: depois de cancelar ou avaliar em outra tela).
export function useAgendamentos(): Agendamento[] {
  const [lista, setLista] = useState<Agendamento[]>(listarAgendamentos);

  useFocusEffect(
    useCallback(() => {
      setLista(listarAgendamentos());
    }, [])
  );

  return lista;
}

export function useAgendamento(id?: string): Agendamento | undefined {
  const [item, setItem] = useState<Agendamento | undefined>(() =>
    buscarAgendamento(id)
  );

  useFocusEffect(
    useCallback(() => {
      setItem(buscarAgendamento(id));
    }, [id])
  );

  return item;
}
