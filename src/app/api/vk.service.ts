import { Injectable } from '@angular/core';
import {Friend} from './data/Friend';
import {HttpClient} from '@angular/common/http';
import {FriendData} from './data/FriendData';
import {Router} from '@angular/router';
import {UserData} from './data/UserData';


/*
* Главный сервис приложения
* Реализована работа с http и api vkontakte
*/




@Injectable()
export class VkService {


  constructor(private http: HttpClient, public router: Router) {
  }

  private friends: Friend[] = [];
  private friendsData: FriendData[] = [];
  private response: any;
  private accessToken: string;
  private userId: string;
  private userData: UserData[] = [];


  //впомогательный метод реализующий правильную обработку данных в массиве friendsData для ее красивого отображения
  static getData(data: FriendData): FriendData {
    if (!data.city) {
      data.city = {id: 0, title: 'Город не задан'};
    }
    if (!data.bDate) {
      data.bDate = 'Дата рождения не задана';
    } else {
      let dateArr = data.bDate.split('.');
      if (dateArr.length === 2) {
        data.bDate = data.bDate + '.XXXX';
      }
    }
    if (!data.country) {
      data.country = {id: 0, title: 'Страна не задана'};
    }
    return data;
  }

  getUserData(): UserData[] {
    return this.userData;
  }

  // главный метод, в котором реализованы все http запросы
  getFriends(): Friend[] {
    // первый http запрос для получения списка друзей
    this.http.jsonp('https://api.vk.com/method/friends.search?access_token=' +
      localStorage.getItem('accessToken') + '&user_id=' + this.userId + '&v=5.95', 'callback')
      .subscribe((response) => {

          this.response = response;
          if (typeof this.response.response === 'undefined') {
            this.clearToken();
          }
          // получаем 5 случайных друзей вк из ответа сервера
          outer: for (let i = 0; i < 5; i++) {
            if (this.response.response.items.length < 5) {
              i = 5 - this.response.response.items.length;
            }
            const fr = this.response.response.items[Math.floor(Math.random() * this.response.response.items.length)];
            for (let j = 0; j < this.friends.length; j++) {
              if (JSON.stringify(this.friends[j]) === JSON.stringify(new Friend(fr.id, fr.first_name, fr.last_name))) {
                i--;
                continue outer;
              }
            }
            // для каждого друга вызываем метод parseFirstResponse
            this.friends.push(this.parseFirstResponse(fr.id, fr.first_name, fr.last_name));
          }
        },
        error => console.log(error)
      );
    // http запрос для получения информации об авторизированном пользователе
    this.http.jsonp('https://api.vk.com/method/users.get?access_token=' +
      localStorage.getItem('accessToken') + '&user_id=' + localStorage.getItem('userId') + '&fields=photo_100&v=5.95', 'callback')
      .subscribe((response) => {
          this.response = response;
          const fd = this.response.response[0];
          this.userData.push(new UserData(localStorage.getItem('userId'), fd.first_name, fd.last_name, fd.photo_100));
        },
        error => console.log(error)
      );
    return this.friends;
  }


  // вспомогательный метод для получения дополнительной информации о друге
  private parseFirstResponse(idReq: number, fNameReq: string, lNameReq: string): Friend {
    // http запрос
    this.http.jsonp('https://api.vk.com/method/users.get?access_token=' +
      this.accessToken + '&user_id=' + idReq + '&fields=bdate,city,counters,country,photo_100&v=5.95', 'callback')
      .subscribe((response) => {
          this.response = response;
          const fd = this.response.response[0];
          // вызываем метод getData для правильной записи данных в массив
          this.friendsData.push(VkService.getData(new FriendData(idReq, fd.bdate, fd.city, fd.country, fd.photo_100,
            {friends: fd.counters.friends, mutualFriends: fd.counters.mutual_friends, followers: fd.counters.followers})));
        },
        error => console.log(error)
      );
    return new Friend(idReq, fNameReq, lNameReq);
  }

  getFriendsData(): FriendData[] {
    return this.friendsData;
  }

  // метод для получения токена и user Id пользователя от api vk
  setTokenAndUserId(token: string, userId: string) {
    localStorage.clear();
    this.accessToken = token;
    localStorage.setItem('accessToken', token);
    this.userId = userId;
    localStorage.setItem('userId', userId);
    document.location.href = 'https://midnightfim.github.io/vkapp/home';
  }


  // метод реализующий выход из приложения
  clearToken() {
    this.accessToken = '';
    this.userId = '';
    localStorage.clear();
    document.location.href = 'https://midnightfim.github.io/vkapp/login';
  }


  public getTokenAndUserIdFromStorage() {
    if (!this.getToken()) {
      this.clearToken();
    } else {
      this.accessToken = localStorage.getItem('accessToken');
      this.userId = localStorage.getItem('userId');
    }
  }

  // метод для проверки токена на существование
  public getToken(): boolean {
    if (typeof localStorage.getItem('accessToken') === null || !localStorage.getItem('accessToken')
      || localStorage.getItem('accessToken') === 'undefined') {
      return false;
    }
    return true;
  }
}
