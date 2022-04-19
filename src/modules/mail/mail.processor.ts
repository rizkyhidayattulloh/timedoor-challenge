import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { MailService } from "./mail.service";

@Processor({name: 'mail'})
export class MailProcessor {
    constructor(private mailService: MailService) {}

    @Process()
    async execute(job: Job<unknown>): Promise<void> {
        this.mailService.sendQueuedMail(job.data);
    }
}