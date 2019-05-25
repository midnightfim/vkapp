import { Component } from '@angular/core';
import {VkService} from './api/vk.service';


/*
* Главный компонент приложения
* Реализовано навигационное меню приложения
*/



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularVkApp';


  canUse: boolean;

  constructor(private vkService: VkService) {
    this.canUse = this.vkService.getToken();

  }

    toFriendsList() {
      this.vkService.router.navigate(['/home']);
    }

    Exit() {
      this.vkService.clearToken();
    }

    login() {
      document.location.href = 'https://oauth.vk.com/authorize?client_id=6959571&display=page&' +
        'scope=friends&redirect_uri=https://midnightfim.github.io/vkapp/auth&response_type=token&v=5.95&revoke=1';
    }
}
