import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LibraryComponent } from './pages/library/library.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './pages/profile/profile.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ResetComponent } from './pages/reset/reset.component';
import { SendResetComponent } from './pages/send-reset/send-reset.component';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SendResetComponent,
    ResetComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    ConfirmationComponent,
    DialogComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    LibraryComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
