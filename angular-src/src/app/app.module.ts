// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Routes
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthLogoutGuard } from './guards/authlogout.guard';

// Route Variable
const appRoutes: Routes = [
    {path:'', component: HomeComponent},
    {path:'register', component: RegisterComponent, canActivate:[AuthLogoutGuard]},
    {path:'login', component: LoginComponent, canActivate:[AuthLogoutGuard]},
    {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
    {path:'users/profile', component: UserProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, AuthService, AuthGuard, AuthLogoutGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
