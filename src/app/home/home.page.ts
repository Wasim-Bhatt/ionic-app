import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { CommonDataService } from '../services/common-data.service';
import { Blog } from '../models/Blog';
import {Storage} from '@ionic/storage'
import { Subscription } from 'rxjs';
import { AppEventService } from '../services/app-event.service';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  blogs: Blog[]=[]
  currentUserID = ""
  blogSubscription: Subscription = new Subscription
  constructor(
    private menuController: MenuController, 
    public commonDataService: CommonDataService,
    private storage: Storage,
    private appEventService:AppEventService,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
   // this.subsribeToEvents()
    this.getBlogs(()=>{})
    this.getID()
    this.filterCars("audi")
  }

  ngOnDestroy() {
    this.appEventService.blogCreated?.unsubscribe()
  }

  ionViewDidEnter() {
    this.menuController.enable(true)
  }

  subsribeToEvents() {
     this.blogSubscription = this.appEventService.blogCreated.subscribe(()=>{
      console.log("subscribed")
      this.getBlogs(()=>{})
     })
  }

  async getID() {
    this.currentUserID = await this.storage.get("CurrentUserID")
  }

  async getBlogs(callback:()=> void) {
    this.blogs = await this.storage.get("Blogs")
    callback()
  }

  editBlog(id:string){
    const navigationExtras:NavigationExtras = {
      replaceUrl: true,
      state:{
        id:id
      }
    }
    this.router.navigateByUrl("add-blog", navigationExtras)
  }

  async presentAlert(id:string) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Are you sure you want to delete this blog?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {},
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.deleteBlog(id,() => {
            this.getBlogs(()=>{})
          })
        },
      },]
    });
    await alert.present();
  }

  deleteBlog(id: string, callback:() => void) {
    this.storage.get("Blogs").then((item)=>{
      if(item) {
        const filteredArray = item?.filter((el: any)=> el.id != id)
        this.storage.set("Blogs", filteredArray)
        callback()
      }
    })
   }

   filterCars(filter:string) {
    var trans = {};
    trans[filter] = [];
    console.log(trans)
    let cars = [{'make':'audi','model':'r8','year':'2012'},{'make':'audi','model':'rs5','year':'2013'},{'make':'ford','model':'mustang','year':'2012'},{'make':'ford','model':'fusion','year':'2015'},{'make':'kia','model':'optima','year':'2012'}];
    let filteredCars = cars.filter((item)=> item.make == filter || item.model == filter || item?.year == filter)
    let mappedCars = {"w":filteredCars}
    
   }
}
