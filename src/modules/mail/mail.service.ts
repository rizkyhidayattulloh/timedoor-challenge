import { ISendMailOptions, MailerOptions, MailerService } from "@nestjs-modules/mailer";
import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { Mailable } from "./mailable.interface";

@Injectable()
export class MailService {
    private email: string;

    constructor(
        @InjectQueue('mail')
        private mailQueue: Queue,
        private mailerService: MailerService
    ) {}

    to(email: string): MailService {
        this.email = email;

        return this;
    }

    async send(mail: Mailable): Promise<void> {
        const option = mail.build();

        option.to = this.email;

        await this.sendMail(option);
    }

    async sendMail(option: ISendMailOptions): Promise<void> {
        await this.mailQueue.add(option);
    }

    async sendQueuedMail(option: ISendMailOptions): Promise<void> {
        await this.mailerService.sendMail(option);
    } 
} 