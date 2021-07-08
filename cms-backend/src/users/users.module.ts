import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Journalist } from './entities/journalist.entity';
import { JournalistsController } from './controllers/journalists.controller';
import { JournalistsService } from './services/journalists.service';
import { Complaint } from './entities/complaint.entity';
import { ComplaintsController } from './controllers/complaints.controller';
import { ComplaintsService } from './services/complaints.service';
import { Streaming } from './entities/streaming.entity';
import { StreamingsService } from './services/streamings.service';
import { StreamingsController } from './controllers/streamings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Journalist, Complaint, Streaming])],
  providers: [
    UsersService,
    JournalistsService,
    ComplaintsService,
    StreamingsService,
  ],
  controllers: [
    UsersController,
    JournalistsController,
    ComplaintsController,
    StreamingsController,
  ],
})
export class UsersModule {}
