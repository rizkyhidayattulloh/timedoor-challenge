import { MailerOptions } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class MailConfigService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    get mailConfig(): MailerOptions {
        return {
            transport: {
                host: this.configService.get('MAIL_HOST'),
                port: this.configService.get('MAIL_PORT'),
                secure: false,
                auth: {
                    user: this.configService.get('MAIL_USERNAME'),
                    pass: this.configService.get('MAIL_PASSWORD'),
                }
            },
            defaults: {
                from: '"No Reply" <noreply@example.com>'
            },
            template: {
                dir: 'src/modules/mail/templates',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            }
        }
    }
}