import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { IdeasService, Idea } from './ideas.service';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Get()
  findAll(): Idea[] {
    return this.ideasService.findAll();
  }

  @Get('search')
  search(@Query('q') q: string, @Query('filter') filter: string): Idea[] {
    return this.ideasService.search(q, filter);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Idea | undefined {
    return this.ideasService.findOne(id);
  }
}
