import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../models/Blog';
import { CommonDataService } from '../services/common-data.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import { AppEventService } from '../services/app-event.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.page.html',
  styleUrls: ['./add-blog.page.scss'],
})
export class AddBlogPage implements OnInit {
  blogForm: FormGroup
  blogID:string
  constructor(private commonDataService: CommonDataService, private router:Router, private storage: Storage,
     private appEventService:AppEventService,
     private menuController: MenuController) { 
    this.blogID = this.router.getCurrentNavigation()?.extras.state?.["id"]
    this.blogForm = new FormGroup({
      date:  new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      post:  new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.getBlogByID()
    this.menuController.swipeGesture(false) 
  }

  ionViewWillEnter() {
    console.log("will enter")
  }

  ionViewDidEnter() {
    console.log("did enter")
  }

  ionViewWillLeave() {
    console.log("will leave")
  }

  ionViewDidLeave() {
    console.log("did leave")
  }

  

 async onSubmit() {
    if(!this.blogForm.valid) {
      this.blogForm.markAllAsTouched()
    }
    else {
        if(this.blogID) {
         this.updateBlog(async() => {
          const blog = new Blog()
          blog.id = Math.random().toString(16).slice(2),
          blog.userID = await this.storage.get("CurrentUserID"),
          blog.date = this.blogForm.controls["date"].value
          blog.title = this.blogForm.controls["title"].value
          blog.post = this.blogForm.controls["post"].value
          blog.author = this.commonDataService.currentUserID
          this.commonDataService.saveBlog(blog)
          this.router.navigateByUrl("home", {replaceUrl: true})
         })
        }
        else {
        const blog = new Blog()
        blog.id = Math.random().toString(16).slice(2),
        blog.userID = await this.storage.get("CurrentUserID"),
        blog.date = this.blogForm.controls["date"].value
        blog.title = this.blogForm.controls["title"].value
        blog.post = this.blogForm.controls["post"].value
        blog.author = this.commonDataService.currentUserID
        this.commonDataService.saveBlog(blog)
        this.router.navigateByUrl("home", {replaceUrl: true})
        this.appEventService.blogCreated.next()
        }
    }
  }

  getBlogByID() {
    this.storage.get("Blogs").then((item)=>{
      if(item) {
        const blog = item?.find((el: any)=> el.id == this.blogID)
        if(blog) {
          this.blogForm.controls["date"].setValue(blog.date) 
          this.blogForm.controls["title"].setValue(blog.title) 
          this.blogForm.controls["post"].setValue(blog.post) 
        }
      }
    })
  }

   updateBlog(callback:()=>void) {
    this.storage.get("Blogs").then((item)=>{
      if(item) {
        const filteredArray = item?.filter((el: any)=> el.id != this.blogID)
        this.storage.set("Blogs", filteredArray)
        callback()
      }
    })
  }

  

}
