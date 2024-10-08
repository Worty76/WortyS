import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IPost } from '../interfaces';
import { Optional } from '@nestjs/common';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { LikeEntity } from 'src/likes/entities';

@Entity('posts')
export class PostEntity implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  @Optional()
  description?: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.postId)
  @JoinColumn()
  comments?: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.postId)
  @JoinColumn()
  likes?: LikeEntity[];
}
