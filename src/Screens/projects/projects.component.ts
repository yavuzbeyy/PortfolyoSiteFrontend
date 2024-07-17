import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Service/data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.dataService.fetchProjects().subscribe(
      (response: any[]) => {
        this.projects = response;
        this.projects.forEach(project => {
          this.loadProjectImage(project);
        });
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  loadProjectImage(project: any): void {
    this.dataService.getImageByFilekey(project.fileKey).subscribe(
      (imageBlob: Blob) => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          project.imageUrl = reader.result as string;
        }, false);

        if (imageBlob) {
          reader.readAsDataURL(imageBlob);
        }
      },
      (error) => {
        console.error('Error fetching project image', error);
        project.imageUrl = 'https://static.thenounproject.com/png/4595376-200.png'; // Hata durumunda varsayılan bir resim URL'i
      }
    );
  }

  deleteProjectById(projectId: number): void {
    if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
      this.dataService.deleteProject(projectId).subscribe(
        (response) => {
          this.dataService.showSuccessMessage({ message: response });
          window.location.reload(); // Sayfayı yeniden yükle
        },
        (error) => {
          console.error('Error deleting project', error);
          this.dataService.showFailMessage(error.error); // Hata mesajını göster
        }
      );
    }}
}
