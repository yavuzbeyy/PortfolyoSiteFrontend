import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Service/data.service';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '../../app/app.routes';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: any[] = [];

  constructor(private dataService: DataService,private router: Router) { }

  ngOnInit() {
    this.fetchArticles();
  }

  fetchArticles() {
    this.dataService.fetchAllArticles().subscribe(
      (data: any[]) => {
        this.articles = data;
        this.articles.forEach(article => {
          this.loadArticleImage(article);
        });
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    );
  }

  loadArticleImage(article: any): void {
    this.dataService.getImageByFilekey(article.fileKey).subscribe(
      (imageBlob: Blob) => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          article.imageUrl = reader.result as string;
        }, false);

        if (imageBlob) {
          reader.readAsDataURL(imageBlob);
        }
      },
      (error) => {
        console.error('Error fetching article image', error);
        article.imageUrl = 'default-image-url'; // Hata durumunda varsayılan bir resim URL'i kullanın
      }
    );
  }

  deleteArticleById(articleId: number) {
    if(confirm("Bu makaleyi silmek istediğinizden emin misiniz?")) {
      this.dataService.deleteArticle(articleId).subscribe(
        (response) => {
          this.articles = this.articles.filter(article => article.id !== articleId);
          this.dataService.showSuccessMessage(response);

          window.location.reload();

        },
        (error) => {
          console.error('Error deleting article', error);
          this.dataService.showFailMessage(error.error); // Hata mesajını göster
        }
      );
    }
  }
}
