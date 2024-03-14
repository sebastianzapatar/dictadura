import { MinLength } from "class-validator";
import { BeforeInsert,Entity, PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Product } from "src/products/entities/product.entity";
@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column(
        'text',{
            unique:true
        }
    )
    @MinLength(4)
    email:string;

    @Column('text')
    @MinLength(12)
    password:string

    @Column('text')
    @MinLength(1)
    fullName:string;

    @Column('bool',{
        default:true
    })
    isActive:boolean
    @Column('text',{
        array:true,
        default:['user']
    })
    @MinLength(1)
    roles:string[]
    @OneToMany(
        ()=>Product,
        (product)=>product.user
    )
    product:Product;
    @BeforeInsert()
    checkEmail(){
        this.email = this.email.toLocaleLowerCase();
    }

}
