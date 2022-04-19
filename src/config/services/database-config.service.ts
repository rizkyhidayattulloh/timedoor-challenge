import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class DatabaseConfigService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    get mysqlConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get('DB_HOST'),
            port: this.configService.get('DB_PORT'),
            username: this.configService.get('DB_USERNAME'),
            password: this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_DATABASE'),
            autoLoadEntities: true
        }
    }
}