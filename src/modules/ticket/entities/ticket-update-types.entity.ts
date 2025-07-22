import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TicketUpdateHistory } from './ticket-update-history.entity';

@Entity('ticket_update_types')
export class TicketUpdateType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  description: string;

  @OneToMany(
    () => TicketUpdateHistory,
    (updateHistory) => updateHistory.updateType,
  )
  ticketUpdateHistory: TicketUpdateHistory[];
}
