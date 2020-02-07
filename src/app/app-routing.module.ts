import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuardService } from './guards/authGuard';
import { SellFormComponent } from './components/sell-form/sell-form.component';

export const componentsArray = [
  LoginComponent,
  IndexComponent,
  NavbarComponent,
  SellFormComponent
]

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
