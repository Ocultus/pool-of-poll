import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Poll } from "../../poll/entity/poll.entity";
import { User } from "../../user/user/user.entity";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    option: string

    @Column()
    count: number

    @ManyToOne(() => Poll, poll => poll.answers)
    poll: Poll

    @ManyToMany(()=> User, user => user.participateAnswer)
    participants: User[]

}