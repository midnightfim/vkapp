import { Component, OnInit } from '@angular/core';
import {VkService} from '../api/vk.service';
import {Friend} from '../api/data/Friend';
import {FriendData} from '../api/data/FriendData';
import {UserData} from '../api/data/UserData';

/*
* core компонент приложения
* В него подаются и отображаются все данные из сервиса
* Реализован Material дизайн
*/





@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  friends: Friend[];
  friendsData: FriendData[];
  userData: UserData[];

  constructor(private vkService: VkService) {
  }


  // получаем все данные из сервиса в компонент
  ngOnInit() {
    this.vkService.getTokenAndUserIdFromStorage();
    this.friends = this.vkService.getFriends();
    this.friendsData = this.vkService.getFriendsData();
    this.userData = this.vkService.getUserData();
  }

}
