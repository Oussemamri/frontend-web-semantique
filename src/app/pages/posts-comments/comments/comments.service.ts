import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:9000'; // Adjust the URL if needed

  constructor(private http: HttpClient) {}

  // Get all comments
  getComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments`);
  }

  // Create a new comment
  createComment(commentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments`, commentData);
  }

  // Update an existing comment
  updateComment(commentId: string, commentData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/comments/${commentId}`, commentData);
  }

  // Delete a comment
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/${commentId}`);
  }
}
