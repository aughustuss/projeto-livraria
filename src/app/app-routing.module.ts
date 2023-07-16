import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './pages/library/library.component';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './services/guards/auth.guard';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ResetComponent } from './pages/reset/reset.component';
import { SendResetComponent } from './pages/send-reset/send-reset.component';
import { routeGuard } from './services/guards/route.guard';

const routes: Routes = [
  {path: 'library',component: LibraryComponent, canActivate: [authGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'confirmAccount', component: ConfirmationComponent, canActivate:[routeGuard]},
  {path: 'resetPassword', component: ResetComponent, canActivate:[routeGuard]},
  {path: 'sendReset', component: SendResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
