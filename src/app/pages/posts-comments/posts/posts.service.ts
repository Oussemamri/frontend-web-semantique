import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:9000'; 

  constructor(private http: HttpClient) {}

  // Get all posts
  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`); 
  }

  // Create a new post
  createPost(postData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts`, postData);
  }

    // Update an existing post
    updatePost(postId: string, postData: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/posts/${postId}`, postData); 
      }
    
      // Delete a post
      deletePost(postId: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/posts/${postId}`); 
      }
}
