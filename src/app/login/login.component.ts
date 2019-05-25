import { Component} from '@angular/core';
import {VkService} from '../api/vk.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private vkService: VkService) {
    if (vkService.getToken()) {
      this.vkService.router.navigate(['/home']);
    }
  }

}
