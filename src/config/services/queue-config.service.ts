import { BullModuleOptions } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { QueueOptions } from "bull";

@Injectable()
export class QueueConfigService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    get queueConfig(): BullModuleOptions {
        return {
            redis: {
                host: this.configService.get('REDIS_HOST'),
                port: this.configService.get('REDIS_PORT')
            }
        }
    }
}