import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleEnum } from 'src/auth/models/roles.model';
import { CreatePublisherDto, UpdatePublisherDto } from '../dtos/publisher.dto';
import { PublishersService } from '../services/publishers.service';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('publishers')
export class PublishersController {

    constructor(private publisherService: PublishersService){}

    @Roles(RoleEnum.ADMIN)
    @Get()
    getAllPublishers(){
        return this.publisherService.findAll()
    }

    @Roles(RoleEnum.ADMIN)
    @Post()
    createNewPublisher(@Body() payload: CreatePublisherDto){
        return this.publisherService.createPublisher(payload)
    }

    @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
    @Put()
    updatePublisher(@Body() payload: UpdatePublisherDto){
        return this.publisherService.update(payload)
    }
}
