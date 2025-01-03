import { Todo } from "src/todo/entities/todo.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    first_name:string

    @Column()
    last_name:string

    @Column()
    email:string

    @Column()
    password:string
    
    @Column()
    phone_number:string

    @Column()
    status:string

    @Column()
    is_deleted:boolean

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @OneToMany(() => Todo , todo => todo.user)
    todo:Todo[]
}
