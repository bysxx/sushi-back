/* eslint-disable indent */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sushi')
export class Sushi {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'password' })
  name: string;

  @Column('varchar', { name: 'location' })
  location: string;

  @Column('varchar', { name: 'phone' })
  phone: string;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
