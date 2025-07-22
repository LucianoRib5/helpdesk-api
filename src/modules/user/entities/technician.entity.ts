import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TechnicianStatus } from './technician-status.entity';
import { User } from './user.entity';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';

@Entity('technicians')
export class Technician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'assigned_tickets_count' })
  assignedTicketsCount: number;

  @Column({ name: 'status_id' })
  statusId: number;

  @Column({ name: 'work_shift_start', type: 'time' })
  workShiftStart: string;

  @Column({ name: 'work_shift_end', type: 'time' })
  workShiftEnd: string;

  @OneToOne(() => User, (user) => user.technician)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => TechnicianStatus,
    (technicianStatus) => technicianStatus.technicians,
  )
  @JoinColumn({ name: 'status_id' })
  technicianStatus: TechnicianStatus;

  @OneToMany(() => Ticket, (ticket) => ticket.technician)
  tickets: Ticket[];
}
