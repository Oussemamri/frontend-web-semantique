import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommentService } from './comments.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: any[] = [];
  newComment = {
    commentId: '',
    commentContent: '',
    commentCreatedAt: '',
    commentUserId: '',
    commentPostId: ''
  };
  commentToUpdate = { ...this.newComment };
  modalRef?: BsModalRef;

  @ViewChild('addCommentModal', { static: false }) addCommentModal!: TemplateRef<any>;
  @ViewChild('modalTemplate', { static: false }) modalTemplate!: TemplateRef<any>;

  constructor(
    private commentService: CommentService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getComments().subscribe(
      (data: any) => {
        this.comments = data.results.bindings.map((binding: any) => ({
          commentId: binding.comment_id.value,
          commentContent: binding.comment_content.value,
          commentCreatedAt: binding.comment_created_at.value,
          commentUserId: binding.comment_user_id.value,
          commentPostId: binding.comment_post_id.value
        }));
      },
      error => console.error('Error loading comments:', error)
    );
  }

  addComment(): void {
    this.newComment.commentCreatedAt = new Date().toISOString();
    this.commentService.createComment(this.newComment).subscribe(response => {
      console.log('Comment created:', response);
      this.loadComments();
      this.closeModal();
      this.newComment = { commentId: '', commentContent: '', commentCreatedAt: '', commentUserId: '', commentPostId: '' };
    });
  }

  setCommentToUpdate(comment: any): void {
    this.commentToUpdate = { ...comment };
    this.openModal(this.modalTemplate);
  }

  updateComment(): void {
    this.commentService.updateComment(this.commentToUpdate.commentId, this.commentToUpdate).subscribe(response => {
      console.log('Comment updated:', response);
  
      // Find the comment in the local array and update it
      const index = this.comments.findIndex(c => c.commentId === this.commentToUpdate.commentId);
      if (index > -1) {
        this.comments[index] = { ...this.commentToUpdate };
      }
  
      this.closeModal();
    });
  }
  

  deleteComment(commentId: string): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(commentId).subscribe(response => {
        console.log('Comment deleted:', response);
        this.comments = this.comments.filter(comment => comment.commentId !== commentId);
      });
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(): void {
    this.modalRef?.hide();
  }
}
