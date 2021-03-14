import { encryptOptions } from "src/config/config";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "../../answer/entity/answer.entity";
import { Poll } from "../../poll/entity/poll.entity";
import * as bcrypt from 'bcrypt';


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string

    @Column({nullable: true})
    lastname: string

    @Column({nullable: true})
    firstname: string

    @Column()
    email: string

    @Column({select: false })
    password: string

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword () {
      this.password =  await bcrypt.hash(this.password,encryptOptions.soil)
    }

    @Column({default: 5})
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
