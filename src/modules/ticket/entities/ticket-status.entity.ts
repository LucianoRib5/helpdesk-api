import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity('ticket_status')
export class TicketStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  description: string;

  @OneToMany(() => Ticket, (ticket) => ticket.status)
  tickets: Ticket[];
}
