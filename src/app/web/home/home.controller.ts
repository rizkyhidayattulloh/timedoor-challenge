import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Query, Render, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, response, Response } from "express";
import { CheckPasswordDto } from "src/modules/bulletin/dto/check-password.dto";
import { CreateBulletinDto } from "src/modules/bulletin/dto/create-bulletin.dto";
import { UpdateBulletinDto } from "src/modules/bulletin/dto/update-bulletin.dto";
import { HomeService } from "./home.service";
import * as url from 'url';
import { FormDataRequest } from "nestjs-form-data";
import { moveUploadedFile } from "src/common/helper";
import { HomeStoreDto } from "./dto/home-store.dto";
import { Csrf } from "src/common/decorators/csrf.decorator";
import { User } from "src/common/decorators/user.decorator";
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";
import { BulletinInterceptor } from "src/interceptors/bulletin.interceptors";
import { UserInterceptor } from "src/interceptors/user.interceptor";
import { HomeUpdateDto } from "./dto/home-update.dto";

@Controller()
export class HomeController {
    constructor(
        private homeService: HomeService
    ) { }

    @Get()
    @Render('web/home/index')
    @Csrf()
    @User()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1
    ) {
        const paginate = await this.homeService.paginate({
            page,
            limit:5,
            route: '/'
        });

        return { bulletins: paginate };
    }

    @Post()
    @FormDataRequest()
    async store(@Body() body: HomeStoreDto, @Req() request: RequestWithUser): Promise<{}> {
        if (body.image) {
            const file = await moveUploadedFile(body.image);
    
            body.image = file;
        }

        if (request.user) body.user = request.user;

        return this.homeService.store(body);
    }

    @Post(':id/check-password')
    checkPassword(@Param('id') id: string, @Body() body: CheckPasswordDto) {
        return this.homeService.checkPassword(id, body);
    }

    @Post(':id/delete')
    async delete(@Param('id') id: string, @Res() response: Response, @Req() request: RequestWithUser) {
        await this.homeService.delete(id, request);

        return response.redirect('back');
    }

    @Post(':id/update')
    @FormDataRequest()
    async update(@Param('id') id: string, @Body() body: HomeUpdateDto, @Req() request: RequestWithUser) {
        await this.homeService.update(id, body, request);

        return {};
    }
}