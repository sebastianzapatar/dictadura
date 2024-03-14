import { User } from "src/auth/entities/auth.entity";
import { BeforeInsert, Column,Entity,
    PrimaryGeneratedColumn,ManyToOne } from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({
        unique:true
    })
    name:string;
    @ManyToOne(
        ()=>User,(user)=>user.product,
        {lazy:true}
    )
    user:User;

    @BeforeInsert()
    checkName(){
        this.name = this.name.toUpperCase();
    }
}

