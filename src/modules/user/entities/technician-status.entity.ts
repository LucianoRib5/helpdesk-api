import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Technician } from './technician.entity';

@Entity('technicians_status')
export class TechnicianStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  description: string;

  @OneToMany(() => Technician, (technician) => technician.technicianStatus)
  technicians: Technician[];
}
