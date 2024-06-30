import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Service/data.service';  // DataService'in doğru yolunu kullanın
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [CommonModule,HttpClientModule]
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.fetchProjects().subscribe(
      (response: any[]) => {
        this.projects = response;
        console.log(this.projects)
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }
}
