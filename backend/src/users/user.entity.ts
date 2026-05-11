import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ unique: true })
  googleId: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'simple-array', nullable: true })
  skills: string[];

  @Column({ type: 'simple-array', nullable: true })
  languages: string[];

  @Column({ type: 'int', default: 0 })
  totalEvents: number;

  @Column({ type: 'int', default: 0 })
  wins: number;

  @Column({ type: 'int', default: 0 })
  projectsCompleted: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  githubId: string;

  @Column({ type: 'json', nullable: true })
  experiences: any[];

  @Column({ default: false })
  isOnboardingCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
