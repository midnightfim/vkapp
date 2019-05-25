import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {VkService} from './api/vk.service';
import { CoreComponent } from './core/core.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatTableModule, MatTabsModule, MatToolbarModule} from '@angular/material';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import { VkComponent } from './login/vk/vk.component';

// роутинг приложения
const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full'},
                        { path: 'home', component: CoreComponent},
                        { path: 'login', component: LoginComponent},
  { path: 'auth', component: VkComponent}];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoreComponent,
    VkComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTabsModule,
    MatTableModule

  ],
  providers: [VkService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule { }
