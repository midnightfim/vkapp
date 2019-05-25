import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {VkService} from '../../api/vk.service';


/*
* vk компонент
* Реализована работа с ответом после авторизации пользователя
*/



@Component({
  selector: 'app-vk',
  templateUrl: './vk.component.html',
  styleUrls: ['./vk.component.css']
})
export class VkComponent implements OnInit {

  constructor(private vkService: VkService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // извлекаем токен и user Id
    try {
      this.vkService.setTokenAndUserId(this.route.snapshot.fragment.split('&')[0].split('=')[1], this.route.snapshot.fragment.split('&')[2].split('=')[1]);
    } catch (e) {
      console.log(e);
    }
  }

}
