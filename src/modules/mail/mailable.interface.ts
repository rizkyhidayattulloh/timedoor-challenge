import { ISendMailOptions } from "@nestjs-modules/mailer";

export interface Mailable {
    build(): ISendMailOptions;
}