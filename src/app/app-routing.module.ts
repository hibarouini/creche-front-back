import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EnfantComponent } from './components/enfant/enfant.component';
import { GroupeComponent } from './components/groupe/groupe.component';
import { AdminComponent } from './components/admin/admin.component';
import { ParentComponent } from './components/parent/parent.component';
import { ReclamationsComponent } from './components/reclamations/reclamations.component';
import { EmployeComponent } from './components/employe/employe.component';
// Assurez-vous que le guard est bien importé

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent } ,
  { path: 'employe', component: EmployeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'liste-enfants', component: EnfantComponent },
  { path: 'enfant', component: EnfantComponent },
  { path: 'groupes', component: GroupeComponent },
  { path: 'parent', component:ParentComponent},
  { path: 'reclamations', component: ReclamationsComponent},

  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
