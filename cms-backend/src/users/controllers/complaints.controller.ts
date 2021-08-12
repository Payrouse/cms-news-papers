import { ComplaintsService } from './../services/complaints.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/models/roles.model';
import { ChangeComplaintStatusDto, CreateComplaintDto } from '../dtos/complaints.dto';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/token.model';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('complaints')
export class ComplaintsController {
  constructor(private complaintsService: ComplaintsService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Get()
  getJournalists() {
    return this.complaintsService.findAll();
  }

  @Public()
  @Get('/public')
  getPublicComplaints(){
    return this.complaintsService.findPublished();
  }

  @Roles(RoleEnum.USER)
  @Post()
  createNewComplaint(
    @Req() req: Request,
    @Body() payload: CreateComplaintDto,
  ) {
    const user = req.user as PayloadToken
    return this.complaintsService.createComplaint(user.sub, payload);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.PUBLISHER)
  @Put(':complaintId/status')
  changeStreamStatus(
    @Param('complaintId') id: string,
    @Body() payload: ChangeComplaintStatusDto,
  ) {
    return this.complaintsService.changeComplaintStatus(id, payload)
  }

  @Roles(RoleEnum.ADMIN)
  @Delete(':complaintId')
  deleteStream(@Param('complaintId') id: string) {
    return this.complaintsService.delete(id);
  }
}
