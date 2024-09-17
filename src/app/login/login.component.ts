import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Login } from '../Model/login.module';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,RouterOutlet,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _authService:AuthService, private router:Router,private formBuilder:FormBuilder){}
  loginDetails:Login = new Login();

  login()
 {
   this._authService.login(this.loginDetails).subscribe(
     res=>{
       let token = res.token;
       if(token)
       {

         window.localStorage.setItem("token",token);
         this._authService.decodeToken();
         alert("Logged In Successfully");
         this.router.navigateByUrl("/dashboard");
       }
     },
     err=>{
          alert("User Credentials do not match... Try Again");
     }
   )
 }
}
