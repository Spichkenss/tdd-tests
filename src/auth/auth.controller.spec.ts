import { BadRequestException } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Test} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {UserService} from "../user/user.service";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {RegisterDto} from "./dto/auth.dto";


describe('AuthController', () => {
    let authController: AuthController
    let authService: AuthService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [AuthController],
            providers: [AuthService, UserService, JwtService, {provide: getRepositoryToken(UserEntity), useValue: Repository}]
        }).compile()

        authController = moduleRef.get<AuthController>(AuthController)
        authService = moduleRef.get<AuthService>(AuthService)

        jest.clearAllMocks()
    })

    describe('registration', () => {
        let response
        let dto: RegisterDto = {email: 'test@mail.ru', password: '12345', name: 'Alexander', surname: 'Blinov'}

        test('successful registration', async () => {
            response = {user: {id: expect.any(Number), email: dto.email,}, accessToken: expect.any(String)}
            jest.spyOn(authService, 'register').mockReturnValue(response)
            const data = await authController.register(dto)
            expect(authService.register).toBeCalledWith(dto)
            expect(data).toEqual(response)
        })

        test('throw error "user already exists"', async () => {
          response = BadRequestException
          jest.spyOn(authService, 'register').mockReturnValue(response)
          await authController.register(dto)
          const data = await authController.register(dto)
          expect(authService.register).toBeCalledTimes(2)
          expect(authService.register).toBeCalledWith(dto)
          expect(data).toEqual(response)
      })

    })
describe('login', () => {
        let response
        let dto: LoginDto = {email: 'test@mail.ru', password: '12345'}

        test('successful login', async () => {
            response = {user: {id: expect.any(Number), email: dto.email,}, accessToken: expect.any(String)}

            jest.spyOn(authService, 'login').mockReturnValue(response)

            const data = await authController.login(dto)

            expect(authService.login).toBeCalledWith(dto)
            expect(data).toEqual(response)
        })

        test('user not found', async () => {
            response = NotFoundException

            jest.spyOn(authService, 'validateUser').mockReturnValue(response)

            const data = await authService.validateUser(dto)
            expect(data).toEqual(response)
        })

        test('wrong login or password', async () => {
            response = UnauthorizedException

            jest.spyOn(authService, 'validateUser').mockReturnValue(response)

            const data = await authService.validateUser(dto)
            expect(data).toEqual(response)
        })


    })

    afterEach(() => {
        jest.clearAllMocks()
    })

})