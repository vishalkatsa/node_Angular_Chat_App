import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private Httpservice:HttpService){}
  FormObject:any = {
    email: '',
    password: '',
  };
  _Router = inject(Router)
  LoginHandle(formData:NgForm){
    const isFormValid = formData.form.valid;
    // console.log(isFormValid);
    // console.log(this.FormObject);
    let FormObject = this.FormObject;
    if (isFormValid) {
      this.Httpservice.post('/auth/loginuser',FormObject).subscribe((data)=>{
        if (data.message === "userLoginTrue_200") {
          localStorage.setItem('token',data.token);
          localStorage.setItem('UserLoginData',JSON.stringify(data.userData))
          setTimeout(() => {
            this._Router.navigate(['/chatpage'])
          }, 1000);
          
        }
        if (data.message === "UserNotAble_201") {
          alert("User not able");
        }
      })
    }
  }

}
