import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login.component';
import { DrawerComponent } from '../pages/drawer.component';
import { ContentComponent } from '../pages/content.component';
import { VoteComponent } from '../pages/vote.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'drawer', component: DrawerComponent,
        children: [
            { path: 'content', component: ContentComponent },
            { path: 'vote', component: VoteComponent }, 
        ]
    }
];
