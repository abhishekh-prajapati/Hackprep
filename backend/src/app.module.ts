import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeasModule } from './ideas/ideas.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { CommonModule } from './common/common.module';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        return {
          type: 'postgres',
          url: databaseUrl,
          host: !databaseUrl ? configService.get<string>('DB_HOST') : undefined,
          port: !databaseUrl ? configService.get<number>('DB_PORT') : undefined,
          username: !databaseUrl ? configService.get<string>('DB_USERNAME') : undefined,
          password: !databaseUrl ? configService.get<string>('DB_PASSWORD') : undefined,
          database: !databaseUrl ? configService.get<string>('DB_NAME') : undefined,
          entities: [User, Project, Task],
          synchronize: true, // Only for development
          ssl: {
            rejectUnauthorized: false,
          },
          extra: {
            max: 1,
          },
        };
      },
      inject: [ConfigService],
    }),
    CommonModule,
    AuthModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
