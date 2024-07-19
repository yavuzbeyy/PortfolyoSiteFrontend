import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { ProjectCreateModel } from '../Models/ProjectCreateModel';
//import { ProjectUpdateModel } from '../Models/ProjectUpdateModel';
import { ToastrService } from 'ngx-toastr';
import { ProjectModel } from '../Models/ProjectModel';
import { ArticleModel } from '../Models/ArticleModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseApi = "https://localhost:7107/";

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  showSuccessMessage(response: any) {
    this.toastr.success(response.message, 'Başarılı', {
      positionClass: 'toast-top-right'
    });
  }

  showFailMessage(response: any) {
    this.toastr.error(response.message, 'Başarısız', {
      positionClass: 'toast-top-right'
    });
  }

  // Fetch all projects
  fetchProjects(): Observable<any[]> {
    const apiUrl = this.baseApi + 'api/Project/ListAll';
    return this.http.get<any[]>(apiUrl);
  }

  fetchAllArticles(): Observable<any[]> {
    const apiUrl = this.baseApi + 'api/Article/ListAll';
    return this.http.get<any[]>(apiUrl);
  }

  // Get project by ID
  getProjectById(id: number): Observable<any> {
    const apiUrl = `${this.baseApi}api/Project/GetById/${id}`;
    return this.http.get<any>(apiUrl);
  }

    // Get project by ID
    getImageByFilekey(filekey: string): Observable<any> {
      const apiUrl = `${this.baseApi}api/Upload/GetImageByFotokey?filekey=${filekey}`;
      return this.http.get(apiUrl, { responseType: 'blob' });
    }

  
  // Create a new project
  createProject(project: ProjectModel): Observable<any> {
    const apiUrl = this.baseApi + 'api/Project/Create';
    return this.http.post(apiUrl, project);
  }

    // Create a new article
    createArticle(article: ArticleModel): Observable<any> {
      const apiUrl = this.baseApi + 'api/Article/Create';
      return this.http.post(apiUrl, article);
    }

  // Update an existing project
  /*
  updateProject(project: ProjectUpdateModel): Observable<any> {
    const apiUrl = this.baseApi + 'api/Project/Update';
    return this.http.put(apiUrl, project);
  }
  */

  // Delete a project by ID
  deleteProject(id: number): Observable<any> {
    const apiUrl = `${this.baseApi}api/Project/Delete/${id}`;
    return this.http.delete(apiUrl,{ responseType: 'text' });
  }

   // Delete a project by ID
   deleteArticle(id: number): Observable<any> {
    const apiUrl = `${this.baseApi}api/Article/Delete/${id}`;
    return this.http.delete(apiUrl,{ responseType: 'text' });
  }

  uploadImage(file: File): Observable<any> {
    const url = `${this.baseApi}api/Upload/Upload`;
    const formData = new FormData();
    formData.append('imageFile', file);

    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post(url, formData, options);
  }
}
