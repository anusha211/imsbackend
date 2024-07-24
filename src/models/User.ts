import { Entity, PrimaryGeneratedColumn, Column, IntegerType, ManyToOne } from 'typeorm';

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


/*
  @ManyToOne(() => User, (user: { internships: any; }) => user.internships)
    user: User | undefined;
 */ 
}
