import { EntityRepository, Repository } from "typeorm";
import { Otp } from "./otp.entity";
import { v4 as uuidV4 } from 'uuid';

@EntityRepository(Otp)
export class OtpRepository extends Repository<Otp> {
    async generateToken(): Promise<string> {
        return uuidV4();
    }
}