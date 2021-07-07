import { Journalist } from './entities/journalist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { JournalistsController } from './controllers/journalists.controller';
import { JournalistsService } from './services/journalists.service';
import { ComplaintsController } from './controllers/complaints.controller';
import { ComplaintsService } from './services/complaints.service';
import { Complaints } from './entities/complaints.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Journalist, Complaints])],
  providers: [UsersService, JournalistsService, ComplaintsService],
  controllers: [UsersController, JournalistsController, ComplaintsController],
})
export class UsersModule {}
