import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ArticlesComponent } from './Screens/articles/articles.component';
import { AboutUsComponent } from './Screens/about-us/about-us.component';
import { ProjectsComponent } from './Screens/projects/projects.component';
import { ContactComponent } from './Screens/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AddArticleComponent } from './admin/add-article/add-article.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { MessagesComponent } from './admin/messages/messages.component';


const routes: Routes = [
  { path: 'articles', component: ArticlesComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'add-article', component: AddArticleComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'messages', component: MessagesComponent },
  { path: '', redirectTo: 'about-us', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(ToastrModule.forRoot())
  ]
})
.catch(err => console.error(err));
