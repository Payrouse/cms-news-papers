import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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
}
