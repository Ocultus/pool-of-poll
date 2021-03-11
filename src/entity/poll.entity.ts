import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";
import { User } from "./user.entity";

@Entity()
export class Poll {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    multipleChoice: Boolean

    @ManyToMany(()=> User, user=>user.participatePolls)
    participants: User[]

    @ManyToOne(()=> User, user => user.polls)
    author: User;

    @OneToMany(()=>Answer, answer => answer.poll)
    answers: Answer[]
}