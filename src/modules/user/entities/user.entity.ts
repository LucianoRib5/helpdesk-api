import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from './user-types.entity';
import { UserStatus } from './user-status.entity';
import { Technician } from './technician.entity';
import { Customer } from './customer.entity';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';
import { TicketUpdateHistory } from 'src/modules/ticket/entities/ticket-update-history.entity';
import { UserStatusEnum } from '../enums/user-status.enum';
import { UserTypesEnum } from '../enums/user-types.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  cnpj: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ name: 'type_id', default: UserTypesEnum.CUSTOMER })
  typeId: number;

  @Column({ name: 'status_id', default: UserStatusEnum.ACTIVE })
  statusId: number;

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

  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn({ name: 'type_id' })
  userType: UserType;

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.users)
  @JoinColumn({ name: 'status_id' })
  userStatus: UserStatus;

  @OneToOne(() => Technician, (technician) => technician.user)
  technician: Technician;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;

  @OneToMany(() => Ticket, (ticket) => ticket.createdByUser)
  tickets: Ticket[];

  @OneToMany(
    () => TicketUpdateHistory,
    (updateHistory) => updateHistory.updatedByUser,
  )
  updateHistory: TicketUpdateHistory[];
}
