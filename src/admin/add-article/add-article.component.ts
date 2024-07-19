import { Component } from '@angular/core';
import { ArticleModel } from '../../Models/ArticleModel';
import { DataService } from '../../Service/data.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  article: ArticleModel = new ArticleModel();
  selectedFile: File | null = null;

  constructor(private dataService: DataService, private toastr: ToastrService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      this.dataService.uploadImage(this.selectedFile).subscribe({
        next: (response: any) => {
          // Yanıt doğrudan string olduğundan, fileKey'i doğrudan atayın
          this.article.fileKey = response;
          this.createArticle();
        },
        error: (error: any) => {
          this.toastr.error('Resim yükleme başarısız!', 'Hata');
        }
      });
    } else {
      this.createArticle();
    }
  }

  createArticle() {
    this.dataService.createArticle(this.article).subscribe({
      next: (response: any) => {
        this.toastr.success('Makale başarıyla oluşturuldu!', 'Başarılı');
        window.location.reload()
      },
      error: (error: any) => {
        this.toastr.error('Makale oluşturma başarısız!', 'Hata');
      }
    });
  }
}
