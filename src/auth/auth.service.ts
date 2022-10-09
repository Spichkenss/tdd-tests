import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { LoginDto, RegisterDto } from './dto/auth.dto';
import {genSalt, hash, compare} from "bcryptjs"

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService) { }

    async register(dto: RegisterDto) {
        const isUserExists = await this.userRepository.findOneBy({ email: dto.email })
        if (isUserExists) throw new BadRequestException("Пользователь с таким email уже зарегестрирован!")

        const salt = await genSalt(10)

        const newUser = await this.userRepository.create({
            email: dto.email,
            name: dto.name,
            surname: dto.surname,
            password: await hash(dto.password, salt)
        })

        const user = await this.userRepository.save(newUser)

        return {
            user: this.returnUserFields(user),
            accessToken: await this.createAccesToken(user.id)
        }
    }

    async createAccesToken(userId: number) {
        const data = {
            id: userId
        }
        return await this.jwtService.signAsync(data, { expiresIn: '31d' })
    }

    returnUserFields(user: UserEntity) {
        return {
            id: user.id,
            email: user.email
        }
    }

    async login(dto: LoginDto){
        const user = await this.validateUser(dto)

        return {
            user: this.returnUserFields(user),
            accessToken: await this.createAccesToken(user.id)
        }
    }

    async validateUser(dto: LoginDto){
        const user = await this.userRepository.findOne({
            where: {
                email: dto.email
            },
            select: ['id', 'email', 'password']
        })

        if (!user) throw new NotFoundException("Полльзователь не найден!")

        const isPasswordValid = await compare(dto.password, user.password)
        if (!isPasswordValid) throw new UnauthorizedException("Неверный логин или пароль!")

        return user
    }
}
