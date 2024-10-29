import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'comments', component: CommentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsCommentsRoutingModule { }
