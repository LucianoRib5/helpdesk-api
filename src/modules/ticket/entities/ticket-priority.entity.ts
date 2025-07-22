import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity('ticket_priorities')
export class TicketPriority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  description: string;

  @OneToMany(() => Ticket, (ticket) => ticket.priority)
  tickets: Ticket[];
}
