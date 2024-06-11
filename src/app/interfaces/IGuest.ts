type status = 'pendente' | 'autorizado';

export interface IGuest {
  id: number;
  name: string;
  status: status;
  createdAt: string;
  authorizedAt: string | null;
}
