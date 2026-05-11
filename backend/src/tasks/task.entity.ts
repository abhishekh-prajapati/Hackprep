import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  projectId: string;

  @Column()
  content: string;

  @Column({ default: 'planning' })
  columnId: string;

  @Column({ default: 'medium' })
  priority: string;

  @Column({ default: 'Unassigned' })
  assignee: string;

  @Column({ nullable: true })
  assigneePhoto: string;

  @Column({ type: 'int', default: 0 })
  reactions: number;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;
}
