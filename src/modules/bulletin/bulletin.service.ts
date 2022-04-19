import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bulletin } from "./bulletin.entity";
import { BulletinRepository } from "./bulletin.repository";
import { CreateBulletinDto } from "./dto/create-bulletin.dto";
import * as bcrypt from 'bcrypt';
import { FindOneOptions } from "typeorm";
import { UpdateBulletinDto } from "./dto/update-bulletin.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class BulletinService {
    constructor(
        @InjectRepository(BulletinRepository)
        private bulletinRepository: BulletinRepository
    ) { }

    async getAll(increment: 'ASC' | 'DESC' = 'DESC'): Promise<Bulletin[]> {
        return this.bulletinRepository.find({ order: { createdAt: increment } });
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Bulletin>> {
        const bulletin = this.bulletinRepository
                            .createQueryBuilder('bulletins')
                            .leftJoinAndSelect('bulletins.user', 'user')
                            .orderBy('bulletins.id', 'DESC');

        return paginate<Bulletin>(bulletin, options);
    }

    async store(createBulletinDto: CreateBulletinDto): Promise<void> {
        const bulletin = this.bulletinRepository.create(createBulletinDto);

        if (createBulletinDto.password) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(bulletin.password, salt);

            bulletin.password = hash;
        }

        try {
            await this.bulletinRepository.save(bulletin);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async findOne(options: FindOneOptions<Bulletin>): Promise<Bulletin> {
        return this.bulletinRepository.findOneOrFail(options);
        // return this.bulletinRepository
        //     .createQueryBuilder('bulletins')
        //     .leftJoinAndSelect('bulletins.user', 'user')
        //     .where('bulletins.id = ')
        //     .getOne();
    }

    async delete(id: string): Promise<void> {
        await this.bulletinRepository.delete(id);
    }

    async update(id: string, updateBulletinDto: UpdateBulletinDto): Promise<void> {
        try {
            await this.bulletinRepository.update(id, updateBulletinDto);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}