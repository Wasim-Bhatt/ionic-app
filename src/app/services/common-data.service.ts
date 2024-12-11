import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Blog } from '../models/Blog';
import { Storage } from '@ionic/storage'
@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  users: User[]=[
    {
    id: Math.random().toString(16).slice(2),
    userName:"wasim@gmail.com",
    password:"1234"
   },
   {
    id: Math.random().toString(16).slice(2),
    userName:"junaid@gmail.com",
    password:"5678"
   },
   {
    id: Math.random().toString(16).slice(2),
    userName:"rizwan@gmail.com",
    password:"91011"
   }
]

blogs: Blog[]=[]
currentUserID: string= ""
isLoggedIn: boolean = false


  constructor(private storage:Storage) { }

  getUsers() {
    return this.users
  }

  async saveBlog(blog: Blog) {
    let savedBlogs = await this.storage.get("Blogs")
    if(savedBlogs) {
     const index = savedBlogs.findIndex((item:any)=> item.id == blog.id)
     if(index == -1) {
      savedBlogs.push(blog)
     this.storage.set("Blogs", savedBlogs)
     }
    }
    else {
      this.blogs.push(blog)
      this.storage.set("Blogs", this.blogs)
    }
  }
  

}
