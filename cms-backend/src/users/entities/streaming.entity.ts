import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Administrator } from './administrator.entity';

// import { Exclude } from 'class-transformer';

@Entity({ name: 'streamings' })
export class Streaming {
  @PrimaryGeneratedColumn('uuid', { name: 'stream_id' })
  streamId: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'video_url', type: 'text' })
  videoUrl: string;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'status', type: 'smallint' })
  status: number;

  // streaming -> administrator
  @ManyToOne(() => Administrator, (administrator) => administrator.streamings)
  @JoinColumn({ name: 'administrator_id' })
  administrator: Administrator;
}
