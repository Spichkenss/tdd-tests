import {Column, Entity} from "typeorm";
import {Base} from "../utils/base.entity";

@Entity('post')
export class PostEntity extends Base {
    @Column({type: "text"})
    text: string

    @Column({default: 0})
    likes_counter: number

    @Column({default: 0})
    comments_counter: number

}