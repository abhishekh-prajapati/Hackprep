import { Controller, Get, Post, Body, UseGuards, Req, Param, Delete, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Req() req, @Body() body: { title: string; description?: string }) {
    console.log('Creating project for user:', req.user?.id, 'with body:', body);
    const title = body.title;
    const description = body.description || '';
    if (!title) {
      throw new Error('Project title is required');
    }
    return this.projectsService.create(req.user.id, title, description);
  }

  @Get()
  findAll(@Req() req) {
    return this.projectsService.findForUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @Post('join')
  join(@Req() req, @Body('inviteCode') inviteCode: string) {
    return this.projectsService.joinByCode(req.user.id, inviteCode);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() body: { title?: string; description?: string; isCompleted?: boolean }) {
    return this.projectsService.update(id, req.user.id, body);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.projectsService.delete(id, req.user.id);
  }
}
