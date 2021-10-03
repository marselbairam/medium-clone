import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'follows',
})
export class FollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Current user id',
  })
  @Column()
  followerId: number;

  @ApiProperty({
    example: '2',
    description: 'Following user id',
  })
  @Column()
  followingId: number;
}
