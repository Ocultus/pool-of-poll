import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "../../answer/entity/answer.entity";
import { Poll } from "../../poll/entity/poll.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    countOwnPoll: number


    @ManyToMany(()=> Poll, poll => poll.participants, {
        cascade: true
    })
    @JoinTable()
    participatePolls: Poll[]

    @ManyToMany(()=>Answer,answer => answer.participants,{
        cascade: true
    })
    @JoinTable()
    participateAnswer: Answer[]

    @OneToMany(()=> Poll, poll => poll.author)
    polls: Poll[]
}