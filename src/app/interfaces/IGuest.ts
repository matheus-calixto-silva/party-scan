type status = 'pendente' | 'autorizado';

export interface IGuest {
  id: number;
  nome: string;
  status: status;
  createdAt: string;
  authorizedAt: string | null;
}
