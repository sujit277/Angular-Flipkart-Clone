export class Login{

    id:number = 0;
    name:string = '';
    email:string = '';
    mobileNo:string = '';
    address:string = '';
    password:string = '';

    /* Constructor for Converting Registration form Data into Object for Pushing into MYSQL */
    constructor(name:string,email:string,mobileNo:string,address:string,password:string){
        this.name = name;
        this.email = email ;
        this.mobileNo = mobileNo;
        this.address = address;
        this.password = password;
    }
}