import { Test, TestingModule } from '@nestjs/testing';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {CreatePostDto} from "./dto/post.dto";
import { PostController } from './post.controller';
import {PostEntity} from "./post.entity";
import { PostService } from './post.service';

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, UserService, {provide: getRepositoryToken(PostEntity), useValue: Repository}]
    }).compile();

    postController = module.get<PostController>(PostController);
    postService = module.get<PostService>(PostService);
  });

  describe('create', () => {
    let response
    let dto: CreatePostDto = {text: 'test'}

    test('successfull creation', async () => {
      response = {post: {id: expect.any(Number), text: dto.text, comments_counter: 0, likes_counter: 0}, message: 'Пост создан успешно' }
      jest.spyOn(postService, 'create').mockReturnValue(response)
      const data = await postController.create(dto)
      expect(postService.create).toBeCalledWith(dto)
      expect(data).toEqual(response)
    })
  })
});
