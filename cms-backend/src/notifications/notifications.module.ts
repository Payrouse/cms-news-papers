import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { NotificationsController } from './controllers/notifications.controller';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      defaults: {
        from: '"No Reply" <noreply@example.com>'
      },
      template: {
        dir: 'templates',
        adapter: new HandlebarsAdapter(), // To modify ours templates
        options: {
          strict: true,
        }
      }
    })
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
