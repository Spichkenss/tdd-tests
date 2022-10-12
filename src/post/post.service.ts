import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreatePostDto} from "./dto/post.dto";
import {PostEntity} from "./post.entity";

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity)
                private readonly  postRepository: Repository<PostEntity>) {}

    async create(createPostDto: CreatePostDto){
        const newPost = await this.postRepository.create({
            text: createPostDto.text
        })

        const post = await this.postRepository.save(newPost)

        return {
            post: this.returnPostFields(post),
            message: 'Пост создан успешно'
        }
    }

    async remove(id: number){
        const post = await this.postRepository.findOneBy({id})
        if (!post) throw new NotFoundException('Поста с таким id не существует')
        await this.postRepository.remove(post)

        return {
            message: 'Пост успешно удален'
        }
    }

    returnPostFields(post: PostEntity){
        return {
            id: post.id,
            text: post.text,
            likes_counter: post.likes_counter,
            comments_counter: post.comments_counter
        }
    }
}
