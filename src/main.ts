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


const routes: Routes = [
  { path: 'articles', component: ArticlesComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent }
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
