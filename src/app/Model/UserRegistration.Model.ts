import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

export class UserRegistration{
    public FirstName:string="";
    public LastName:string="";
    public Email: string="";
    public Username:string ="";
    public Password: string="";
    public ProfileImageUrl:string = "";
    public PhoneNumber: string="";
    public Address: string="";
    public BirthDate:Date = new Date();
    public Role: string="";
    public userRegistrationForm:FormGroup;
    constructor()
    {
        let formBuilder = new FormBuilder();
        this.userRegistrationForm = formBuilder.group({
            FirstName:new FormControl(''),
            LastName:new FormControl(''),
            Username:new FormControl(''),
            PhoneNumber: new FormControl(''),
            Address:new FormControl(''),
            Email:new FormControl(''),
            PasswordHash:new FormControl(''),
            BirthDate:new FormControl(''),
            Role:new FormControl(''),
            ProfileImageUrl: new FormControl('')
        })
    }
}