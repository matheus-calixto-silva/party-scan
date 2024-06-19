import { useGuests } from '@app/contexts/GuestContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@views/components/ui/table';

import { Badge } from './ui/badge';

const GuestTable = () => {
  const { guests } = useGuests();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Hora da entrada</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {guests.map((guest) => (
          <TableRow key={guest.id}>
            <TableCell className="font-medium">{guest.name}</TableCell>
            <TableCell>
              <Badge
                variant={
                  guest.status === 'autorizado' ? 'default' : 'secondary'
                }
              >
                {guest.status}
              </Badge>
            </TableCell>
            <TableCell>
              {guest.authorizedAt ? guest.authorizedAt : 'pendente'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GuestTable;
