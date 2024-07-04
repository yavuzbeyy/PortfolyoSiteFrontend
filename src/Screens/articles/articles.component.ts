import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {

  articles: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchArticles();
  }

  fetchArticles() {
    this.dataService.fetchAllArticles().subscribe(
      (data: any[]) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    );
  }
}
