import {Body, Controller, Post} from '@nestjs/common';
import {CreatePostDto} from "./dto/post.dto";
import { PostService } from './post.service';
import {CreatePostReponse} from "./types/post.types";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  create(@Body() createPostDto: CreatePostDto): Promise<CreatePostReponse> {
    return this.postService.create(createPostDto)
  }
}
