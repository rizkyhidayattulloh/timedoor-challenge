import { EntityRepository, Repository } from "typeorm";
import { Bulletin } from "./bulletin.entity";

@EntityRepository(Bulletin)
export class BulletinRepository extends Repository<Bulletin> {
    
}