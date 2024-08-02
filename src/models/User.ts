import { Entity, PrimaryGeneratedColumn, Column, IntegerType, ManyToOne, JoinColumn } from 'typeorm';
import { Internship } from './Internship';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  age!:Number;


  @ManyToOne(() => Internship, (internship) => internship.users, {
    onDelete: 'CASCADE', // Matches migration behavior
    onUpdate: 'CASCADE', // Matches migration behavior
  })
  @JoinColumn({ name: 'internshipId' }) // Explicitly specify join column
  internship!: Internship;

}
