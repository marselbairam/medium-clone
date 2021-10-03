import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tags' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'React.js',
    description: 'Tag name',
  })
  @Column()
  name: string;
}
