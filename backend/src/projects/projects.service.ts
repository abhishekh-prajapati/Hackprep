import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Raw } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(ownerId: string, title: string, description: string = ''): Promise<Project> {
    const project = this.projectsRepository.create({
      title,
      description,
      ownerId,
      memberIds: [ownerId],
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    });
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findForUser(userId: string): Promise<any[]> {
    // 1. Efficiently find projects where user is owner or member
    // Using a QueryBuilder to handle simple-array filtering properly
    const userProjects = await this.projectsRepository
      .createQueryBuilder('project')
      .where('project.ownerId = :userId', { userId })
      .orWhere('project.memberIds LIKE :userIdPattern', { userIdPattern: `%${userId}%` })
      .orderBy('project.createdAt', 'DESC')
      .getMany();

    if (userProjects.length === 0) return [];

    // 2. Collect all unique member IDs across all projects
    const allMemberIds = Array.from(new Set(
      userProjects.flatMap(p => p.memberIds)
    ));

    // 3. Batch fetch all unique users in ONE query
    const allMembers = await this.usersRepository.find({
      where: { id: In(allMemberIds) }
    });

    // 4. Map users back to projects in memory (O(n) instead of O(n*m))
    const memberMap = new Map(allMembers.map(u => [u.id, u]));

    return userProjects.map(project => ({
      ...project,
      members: project.memberIds.map(mid => memberMap.get(mid)).filter(m => !!m)
    }));
  }

  async findById(id: string): Promise<any | null> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) return null;

    // Batch fetch members for this project in ONE query
    const members = await this.usersRepository.find({
      where: { id: In(project.memberIds) }
    });

    return {
      ...project,
      members: members
    };
  }

  async joinByCode(userId: string, inviteCode: string): Promise<Project | null> {
    const project = await this.projectsRepository.findOne({ where: { inviteCode } });
    if (project && !project.memberIds.includes(userId)) {
      project.memberIds.push(userId);
      return this.projectsRepository.save(project);
    }
    return project || null;
  }

  async update(id: string, userId: string, data: Partial<Project>): Promise<Project | null> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project || project.ownerId !== userId) {
      return null;
    }
    Object.assign(project, data);
    return this.projectsRepository.save(project);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project || project.ownerId !== userId) {
      return false;
    }
    const result = await this.projectsRepository.delete(id);
    return result.affected! > 0;
  }
}
