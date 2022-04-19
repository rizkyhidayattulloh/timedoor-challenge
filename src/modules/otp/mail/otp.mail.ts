import { ISendMailOptions } from "@nestjs-modules/mailer";
import { Mailable } from "src/modules/mail/mailable.interface";

export class OtpMail implements Mailable {
    constructor(private url: string) { }

    build(): ISendMailOptions {
        return {
            subject: "OTP",
            template: 'otp',
            context: {
                url: this.url
            }
        }
    }
}