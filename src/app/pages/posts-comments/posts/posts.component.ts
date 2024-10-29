import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PostService } from './posts.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  selectedPost: any = {};
  modalPost: any; 
  modalRef?: BsModalRef;

  newPost = {
    postId: '',
    postContent: '',
    postTitle: '',
    postCreatedAt: '',
    postUserId: ''
  };
  postToUpdate = {
    postId: '',
    postContent: '',
    postTitle: ''
  };
  @ViewChild('modalTemplate', { static: false }) modalTemplate!: TemplateRef<any>;
  @ViewChild('addPostModal', { static: false }) addPostModal!: TemplateRef<any>;
  constructor(private postService: PostService,private modalService: BsModalService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (data: any) => {
        console.log('Posts data:', data); // Check the structure of the response
        this.posts = data.results.bindings.map((binding: any) => ({
          postId: binding.post_id.value, // Adjust based on the actual binding names
          postTitle: binding.post_title.value,
          postContent: binding.post_content.value,
          postCreatedAt: binding.post_created_at.value,
          postUserId: binding.post_user_id.value,
        }));
      },
      error => {
        console.error('Error loading posts:', error);
      }
    );
  }
  
  

  addPost(): void {
    
    this.newPost.postUserId = 'U002'; 
    this.newPost.postCreatedAt = new Date().toISOString(); 
  
    this.postService.createPost(this.newPost).subscribe((response) => {
      console.log(response);
      this.loadPosts(); 
      this.closeModal(); 
     
      this.newPost = { postId: '', postContent: '', postTitle: '', postCreatedAt: '', postUserId: '' };
    });
  }
  setPostToUpdate(post: any): void {
    this.postToUpdate = { ...post }; 
    this.openModal(post); 
  }

  updatePost(): void {
    this.postService.updatePost(this.postToUpdate.postId, this.postToUpdate).subscribe((response) => {
      console.log(response);
      this.loadPosts();
      this.closeModal(); 
    });
  }


  deletePost(postId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      this.postService.deletePost(postId).subscribe((response) => {
        console.log(response);
        this.posts = this.posts.filter(post => post.postId !== postId);
      });
    }
  }
  openAddPostModal(): void {
    this.modalRef = this.modalService.show(this.addPostModal);
    this.newPost = { postId: '', postContent: '', postTitle: '', postCreatedAt: '', postUserId: '' }; 
  }

  openModal(post: any): void {
    this.modalPost = post; 
    this.modalRef = this.modalService.show(this.modalTemplate); 
  }

  closeModal(): void {
    this.selectedPost = {}; 
    this.modalRef?.hide(); 
  }
  
}
