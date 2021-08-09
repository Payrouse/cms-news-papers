import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleEnum } from 'src/auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { UpdateAdministratorPhoneDto } from '../dtos/administrator.dto';
import { AdministratorsService } from '../services/administrators.service';

@UseGuards(ApiKeyGuard, JwtAuthGuard, RolesGuard)
@Controller('administrators')
export class AdministratorsController {
    constructor(private administratorService: AdministratorsService){}

    @Roles(RoleEnum.USER)
    @Post()
    createAdministrator(@Req() req: Request){
        const user = req.user as PayloadToken
        const {phoneNumber} = req.body;
        return this.administratorService.grantAdministrator({administratorId: user.sub, phoneNumber})     
    }

    @Roles(RoleEnum.ADMIN)
    @Put()
    updateAdministratorPhoneNumber(@Req() req: Request, @Body() data: UpdateAdministratorPhoneDto){
        const user = req.user as PayloadToken
        return this.administratorService.update(user.sub, data);
    }

    @Roles(RoleEnum.ADMIN)
    @Get('/phone')
    getAdministratorPhone(@Req() req: Request){
        const user = req.user as PayloadToken
        return this.administratorService.getPhone(user.sub)
    }
}
