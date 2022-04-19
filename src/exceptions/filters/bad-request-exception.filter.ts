import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status   = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            error: "Bad Request",
            messages: this.serializeMessage(exception.getResponse()['message'])
        })
    }

    private serializeMessage(messages: []) {
        const result = {};

        messages.forEach(message => {
            var error: string = message;
            var key: string = error.split(' ')[0];

            result[key] = error;
        });

        return result;
    }
}