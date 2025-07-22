import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { TicketUpdateType } from './ticket-update-types.entity';

@Entity()
export class TicketUpdateHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ticket_id' })
  ticketId: number;

  @Column({ name: 'updated_by' })
  updatedBy: number;

  @Column({ name: 'update_type_id' })
  updateTypeId: number;

  @Column({ name: 'old_value', length: 255 })
  oldValue: string;

  @Column({ name: 'new_value', length: 255 })
  newValue: string;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ length: 255, nullable: true })
  comment: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.updateHistory)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => User, (user) => user.updateHistory)
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: User;

  @ManyToOne(
    () => TicketUpdateType,
    (updateType) => updateType.ticketUpdateHistory,
  )
  @JoinColumn({ name: 'update_type_id' })
  updateType: TicketUpdateType;
}
