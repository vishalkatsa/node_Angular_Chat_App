import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm ,} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {

  constructor(private Httpservice:HttpService){}
  
  FormObject:any = {
    name: '',
    email: '',
    password: '',
    pic: '',
  }

  SignupHandle(formData:NgForm){
    const isFormValid = formData.form.valid;
    // console.log(isFormValid);
    // console.log(this.FormObject);
    let FormObject = this.FormObject;
    if (isFormValid) {
      this.Httpservice.post('/auth/createuser',FormObject).subscribe((data)=>{
        if (data.message === "newUser_200") {
          alert("User created");
        }
      })
    }
  }
}
