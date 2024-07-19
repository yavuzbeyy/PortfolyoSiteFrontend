import { Component } from '@angular/core';
import { ProjectModel } from '../../Models/ProjectModel';
import { DataService } from '../../Service/data.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  project: ProjectModel = new ProjectModel();
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
          this.project.fileKey = response;
          this.createProject();
        },
        error: (error: any) => {
          this.toastr.error('Resim yükleme başarısız!', 'Hata');
        }
      });
    } else {
      this.createProject();
    }
  }

  createProject() {
    this.dataService.createProject(this.project).subscribe({
      next: (response: any) => {
        this.toastr.success('Proje başarıyla oluşturuldu!', 'Başarılı');
      },
      error: (error: any) => {
        this.toastr.error('Proje oluşturma başarısız!', 'Hata');
      }
    });
  }
}
