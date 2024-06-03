import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent:() => import('./pages/home/home.component').then((m) => m.HomeComponent),

  },
  {
    path: 'doctor',
    loadComponent:()=> import('./pages/doctor-view/doctor-view.component').then((m)=> m.DoctorViewComponent)
  },
  {
    path: 'paciente',
    loadComponent:()=> import('./pages/patient-view/patient-view.component').then((m)=> m.PatientViewComponent),
  },
  {
    path: 'personal',
    loadComponent:()=>import('./pages/staff-view/staff-view.component').then((m)=> m.StaffViewComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];
