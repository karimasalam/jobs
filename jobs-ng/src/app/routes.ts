import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
    {path: '', component: JobsComponent},
    {path: 'register', component: RegisterComponent}
];
