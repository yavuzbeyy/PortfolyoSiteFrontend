import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Service/data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: any[] = [];

  constructor(private dataService: DataService) { }

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
}
