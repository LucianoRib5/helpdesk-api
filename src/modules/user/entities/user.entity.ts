import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from './user-types.entity';
import { UserStatus } from './user-status.entity';

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

  @Column()
  typeId: number;

  @Column()
  statusId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn({ name: 'typeId' })
  userType: UserType;

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.users)
  @JoinColumn({ name: 'statusId' })
  userStatus: UserStatus;
}
