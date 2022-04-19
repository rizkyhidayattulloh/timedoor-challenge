import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Bulletin } from "src/modules/bulletin/bulletin.entity";
import { BulletinService } from "src/modules/bulletin/bulletin.service";
import { CheckPasswordDto } from "src/modules/bulletin/dto/check-password.dto";
import { CreateBulletinDto } from "src/modules/bulletin/dto/create-bulletin.dto";
import * as bcrypt from 'bcrypt';
import { UpdateBulletinDto } from "src/modules/bulletin/dto/update-bulletin.dto";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";
import { deleteFile, moveUploadedFile } from "src/common/helper";
import { HomeUpdateDto } from "./dto/home-update.dto";

@Injectable()
export class HomeService {
    constructor(
        private bulletinService: BulletinService
    ) { }

    async index(): Promise<Bulletin[]> {
        return this.bulletinService.getAll();
    }

    async store(createBulletinDto: CreateBulletinDto): Promise<object> {
        await this.bulletinService.store(createBulletinDto);

        return {};
    }

    async checkPassword(id: string, body: CheckPasswordDto): Promise<object> {
        const bulletin = await this.bulletinService.findOne({ where: { id } });
        const isMatch = await bcrypt.compare(body.password, bulletin.password);

        if (!isMatch) throw new BadRequestException({ message: ['password not match'] });

        return bulletin;
    }

    async delete(id: string, request: RequestWithUser): Promise<void> {
        try {
            const bulletin = await this.bulletinService.findOne({ 
                where: { id },
                relations: ['user']
            });

            if (bulletin.user && bulletin.user.id != request.user?.id) throw new ForbiddenException();

            else if (!bulletin.user && request.user) throw new ForbiddenException();

            if (bulletin.image) deleteFile(bulletin.image);
        } catch(error) {
            if (error.status == HttpStatus.FORBIDDEN) throw new ForbiddenException();

            throw new NotFoundException();
        }

        await this.bulletinService.delete(id);
    }

    async update(id: string, body: HomeUpdateDto, request: RequestWithUser): Promise<void> {
        try {
            const bulletin = await this.bulletinService.findOne({ 
                where: { id },
                relations: ['user']
            });

            if (bulletin.user && bulletin.user.id != request.user?.id) throw new ForbiddenException();

            else if (!bulletin.user && request.user) throw new ForbiddenException();

            if (body.deleteImage) {
                if (bulletin.image) deleteFile(bulletin.image);

                body.image = null;
            } else {
                if (body.image) {
                    if (bulletin.image) deleteFile(bulletin.image);

                    const file = await moveUploadedFile(body.image);
            
                    body.image = file;
                }
            }

            delete body.deleteImage;
        } catch(error) {
            if (error.status == HttpStatus.FORBIDDEN) throw new ForbiddenException();

            throw new NotFoundException();
        }

        await this.bulletinService.update(id, body);
    }

    async paginate(options: IPaginationOptions) {
        return this.bulletinService.paginate(options);
    }
}