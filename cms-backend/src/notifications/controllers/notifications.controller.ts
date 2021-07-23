import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService){}

    @Post('send')
    async testEmail(@Body() payload: any){
        await this.notificationsService.sendNewsEmail(
            payload.name, 
            payload.email, 
            payload.categories
        );
    }
}
