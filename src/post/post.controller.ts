import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
import {CreatePostDto} from "./dto/post.dto";
import { PostService } from './post.service';
import {CreatePostReponse, RemovePostResponse} from "./types/post.types";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  create(@Body() createPostDto: CreatePostDto): Promise<CreatePostReponse> {
    return this.postService.create(createPostDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<RemovePostResponse>{
    return this.postService.remove(id)
  }
}
