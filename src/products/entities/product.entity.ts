import { BeforeInsert, Column,Entity,PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({
        unique:true
    })
    name:string;
    @BeforeInsert()
    checkName(){
        this.name = this.name.toUpperCase();
    }
}

