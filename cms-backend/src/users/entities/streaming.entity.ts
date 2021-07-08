import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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

  @Column({ name: 'closed_at', type: 'time with time zone' })
  closedAt: string;

  @Column({ name: 'status', type: 'smallint' })
  status: number;
  
  // streaming -> administrator
  @ManyToOne(() => Administrator, (administrator) => administrator.streamings)
  @JoinColumn({name: 'administrator_id'})
  administrator: Administrator
}
