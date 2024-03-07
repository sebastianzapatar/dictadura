import { MinLength } from "class-validator";
import { BeforeInsert,Entity, PrimaryGeneratedColumn,Column } from "typeorm";

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
    @BeforeInsert()
    checkEmail(){
        this.email = this.email.toLocaleLowerCase();
    }
}
