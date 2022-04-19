import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity('otps')
export class Otp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'token', type: 'longtext'})
    token: string;

    @OneToOne(() => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User

    @Column({name: 'expired_at', type: 'timestamp'})
    expiredAt: string;

    @Column({name: 'verified_at', type: 'timestamp'})
    verifiedAt: string;

    @Column({name: 'created_at', type: 'timestamp'})
    createdAt: string;

    @Column({name: 'updated_at', type: 'timestamp'})
    updatedAt: string;
}