import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("todo")

export class Todo {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userId:number

    @Column()
    title:string

    @Column()
    description:string
    
    @Column()
    completed:boolean

    @Column()
    is_deleted:boolean

    @ManyToOne(() => User , user => user.todo) //get the todos from the user entity (user table)
    user:User

    @CreateDateColumn()
    date:Date

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
}
