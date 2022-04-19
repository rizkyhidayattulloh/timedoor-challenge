import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WebModule } from './app/web/web.module';
import * as hbs from 'hbs';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as csrf from 'csurf';
import * as bodyParser from 'body-parser';
import { BadRequestExceptionFilter } from './exceptions/filters/bad-request-exception.filter';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import * as createRedisStore from 'connect-redis';
import { createClient } from 'redis';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(WebModule);

    const configService = app.get(ConfigService);
    const RedisStore = createRedisStore(session);
    const redisClient = createClient({
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT')
    })

    app.useStaticAssets('src/public');
    app.setBaseViewsDir('src/views');
    app.setViewEngine('hbs');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(csrf({ cookie: true }));
    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: configService.get('SESSION_SECRET'),
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        stopAtFirstError: true
    }));

    app.useGlobalFilters(new BadRequestExceptionFilter());

    hbsInit();

    await app.listen(8000);
}

function hbsInit() {
    hbs.registerPartials('src/views/partials');

    hbs.registerHelper('paginate', function (meta, url) {
        let links = '';
        let path = url.split('?')[0];
        var i = (meta.currentPage > 3 ? ((meta.totalPages - meta.currentPage) < 3 ? meta.totalPages - 4 : meta.currentPage - 2) : 1);
        var limit = meta.totalPages < i + 4 ? meta.totalPages : i + 4;

        if (meta.currentPage > 1) links += `<li><a href="${path}?page=${meta.currentPage - 1}">&lsaquo;</a></li>`

        for (i; i <= limit; i++) {
            var query = `page=${i}`;

            links += `<li ${i == meta.currentPage ? 'class="active"' : ''}><a href="${path}?${query}">${i}</a></li>`;
        }

        if (meta.totalPages > meta.currentPage) links += `<li><a href="${path}?page=${meta.currentPage + 1}">&rsaquo;</a></li>`

        return links;
    });

    hbs.registerHelper('when', function (operand_1, operator, operand_2, options) {
        console.log(operand_1, operator, operand_2);
        
        let operators = {                     //  {{#when <operand1> 'eq' <operand2>}}
            'eq': (l, r) => l == r,              //  {{/when}}
            'noteq': (l, r) => l != r,
            'gt': (l, r) => (+l) > (+r),                        // {{#when var1 'eq' var2}}
            'gteq': (l, r) => ((+l) > (+r)) || (l == r),        //               eq
            'lt': (l, r) => (+l) < (+r),                        // {{else when var1 'gt' var2}}
            'lteq': (l, r) => ((+l) < (+r)) || (l == r),        //               gt
            'or': (l, r) => l || r,                             // {{else}}
            'and': (l, r) => l && r,                            //               lt
            '%': (l, r) => (l % r) === 0                        // {{/when}}
        }
        let result = operators[operator](operand_1, operand_2);
        if (result) return options.fn(this);
        return options.inverse(this);
    })
}

bootstrap();
