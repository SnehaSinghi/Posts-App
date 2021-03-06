import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient){}

  private posts: Post[] = []
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    this.http.get<{message:string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string}>("http://localhost:3000/api/posts", post)
      .subscribe((responseData)=>{
        console.log(responseData.message)
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
  }

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      console.log("Deleted!")
    })
  }
}
