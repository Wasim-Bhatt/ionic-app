import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataService } from '../services/common-data.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  constructor(
    private commonDataService:CommonDataService, 
    private storage:Storage,
    private router:Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
   }
   

  ngOnInit() {}
  
  onSubmit() {
   const userName = this.loginForm.controls["userName"].value
   const password = this.loginForm.controls["password"].value
   const user = this.commonDataService.getUsers().find((item) => item.userName == userName && item.password == password)
   if(user) {
    this.commonDataService.currentUserID = user?.id
    this.storage.set("CurrentUserID", this.commonDataService.currentUserID)
    this.commonDataService.isLoggedIn = true
    this.storage.set("IsloggedIn", this.commonDataService.isLoggedIn)
    this.router.navigateByUrl("home",{replaceUrl: true})
   }
  }


}
