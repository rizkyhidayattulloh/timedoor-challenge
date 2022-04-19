import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Bulletin } from "../bulletin/bulletin.entity";
import { Otp } from "../otp/otp.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Bulletin, (bulletin) => bulletin.user)
    @JoinColumn({name: 'id', referencedColumnName: 'user_id'})
    bulletins: Bulletin[];

    @Column({name: 'is_email_verified'})
    isEmailVerified: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}