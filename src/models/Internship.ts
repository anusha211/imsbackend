import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, IntegerType } from 'typeorm';
import { User } from './User';
import { date } from 'joi';

@Entity()
export class Internship {
    @PrimaryGeneratedColumn()
    id!: IntegerType;

    @Column()
    mentorName!: string;

    @Column({type:'date'})
    joinedDate!: Date;

    @Column({ nullable: true,type:'date' })
    completedDate!: Date;

    @Column()
    isCertified!: boolean;


}
