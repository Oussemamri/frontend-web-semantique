import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsCommentsRoutingModule } from './posts-comments-routing.module';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostsComponent,
    CommentsComponent,
    
  ],
  imports: [
    CommonModule,
    PostsCommentsRoutingModule,
   FormsModule
  ]
})
export class PostsCommentsModule { }
