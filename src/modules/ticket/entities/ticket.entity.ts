import { Customer } from 'src/modules/user/entities/customer.entity';
import { Technician } from 'src/modules/user/entities/technician.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketStatus } from './ticket-status.entity';
import { TicketPriority } from './ticket-priority.entity';
import { TicketUpdateHistory } from './ticket-update-history.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'technician_id' })
  technicianId: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ name: 'status_id' })
  statusId: number;

  @Column({ name: 'priority_id' })
  priorityId: number;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ nullable: true })
  rating: number;

  @Column({ name: 'rating_comment', length: 255, nullable: true })
  ratingComment: string;

  @ManyToOne(() => Customer, (customer) => customer.tickets)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Technician, (technician) => technician.tickets)
  @JoinColumn({ name: 'technician_id' })
  technician: Technician;

  @ManyToOne(() => TicketStatus, (ticketStatus) => ticketStatus.tickets)
  @JoinColumn({ name: 'status_id' })
  status: TicketStatus;

  @ManyToOne(() => TicketPriority, (ticketPriority) => ticketPriority.tickets)
  @JoinColumn({ name: 'priority_id' })
  priority: TicketPriority;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @OneToMany(() => TicketUpdateHistory, (updateHistory) => updateHistory.ticket)
  updateHistory: TicketUpdateHistory[];
}
