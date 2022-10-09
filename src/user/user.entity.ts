import { Column, Entity } from "typeorm";
import {Base} from "../utils/base.entity";

@Entity('users')
export class UserEntity extends Base {
    @Column({unique: true})
    email: string

    @Column({select: false})
    password: string

    @Column({})
    name: string

    @Column({})
    surname: string

    @Column({default: 0, name: 'friends_count'})
    friendsCount?: number

    @Column({default: '', name: 'avatar_path'})
    avatarPath: string

}