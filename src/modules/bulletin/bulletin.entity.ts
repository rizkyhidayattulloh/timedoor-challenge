import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity({ name: 'bulletins' })
export class Bulletin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({
        nullable: true
    })
    image: string;

    @Column()
    password?: string;

    @ManyToOne(() => User, (user) => user.bulletins)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;
}