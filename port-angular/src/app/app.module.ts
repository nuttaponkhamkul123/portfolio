import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NameBannerComponent } from './components/name-banner/name-banner.component';
import { ProjectsComponent } from './components/projects/projects.component';
// import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [AppComponent, NavigationComponent, NameBannerComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, BrowserAnimationsModule, ProjectsComponent, ProfileComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
