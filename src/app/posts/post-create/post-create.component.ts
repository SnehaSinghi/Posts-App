import { Component } from "@angular/core";
import { FormArray, NgForm } from "@angular/forms";
import { PostsService } from "../post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {


  constructor(public postsService: PostsService){}

  onAddPost(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content)
    form.resetForm()
  }
}
