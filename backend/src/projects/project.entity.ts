import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Index()
  @Column()
  ownerId: string;

  @Column({ type: 'simple-array' })
  memberIds: string[];

  @Index({ unique: true })
  @Column({ unique: true })
  inviteCode: string;

  @Column({ default: 'PENDING' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
