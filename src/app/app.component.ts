import { Component, OnInit } from '@angular/core';
import { CommonDataService } from './services/common-data.service';
import { Storage } from '@ionic/storage'
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'mail' },
    { title: 'Add Blog', url: 'add-blog', icon: 'mail' }
  ]
  
  constructor(
    private commonDataService: CommonDataService, 
    private storage: Storage, 
    private menuController: MenuController, 
    private router: Router, 
    private alertController: AlertController) {}

  ngOnInit() {
   this.menuController.enable(false) 
   this.menuController.swipeGesture(false) 
   this.storage.create()
   const users = this.commonDataService.getUsers()
   this.storage.set("Users", users)
   //this.checkLogin()
  }

  checkLogin(){
    this.storage.get("IsLoggedIn").then((item)=>{
      if(item) {
        this.router.navigateByUrl("home", {replaceUrl:true})
      }
      else {
        this.router.navigateByUrl("login", {replaceUrl:true})
      }
    })
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {},
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
         this.logOut()
        },
      },]
    });
    await alert.present();
  }

  logOut() {
    this.commonDataService.isLoggedIn = false
    this.commonDataService.currentUserID = ""
     this.storage.remove("CurrentUserID")
     this.storage.remove("IsloggedIn")
    this.menuController.close()
    this.router.navigateByUrl("login", {replaceUrl:true})
  }
}
