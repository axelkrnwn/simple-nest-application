import { ClassStudent } from "src/model/class-students/entities/class-student.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;
    @Column({unique:true})
    email: string;
    @Column()
    role: string;
    @Column()
    address: string;
    @Column()
    password: string;
    @Column({nullable: true})
    isDeleted: boolean;

    @OneToMany(() => ClassStudent, c => c.student, {cascade: true})
    @JoinColumn()
    classes:ClassStudent[]

}