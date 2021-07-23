import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    constructor(private mailerService: MailerService){}

    async sendNewsEmail(name: string, email: string, categories: string[]) {
        await this.mailerService.sendMail({
            to: email,
            subject: '¡Nuevas notificas!',
            template: 'news',
            context: {
                name: name,
                categories: categories.join(",")
            }
        });
    }
}
