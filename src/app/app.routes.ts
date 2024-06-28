import { Routes } from '@angular/router';
import { ArticlesComponent } from '../Screens/articles/articles.component';
import { AboutUsComponent } from '../Screens/about-us/about-us.component';
import { ProjectsComponent } from '../Screens/projects/projects.component';
import { ContactComponent } from '../Screens/contact/contact.component';

export const routes: Routes = [

    { path: 'articles', component: ArticlesComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'contact', component: ContactComponent }
];
