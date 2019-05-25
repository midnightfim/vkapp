export class FriendData {
  constructor(public id: number,
              public bDate: string,
              public city: {id: number, title: string},
              public country: {id: number, title: string},
              public photoUri: string,
              public counters: {friends: number, mutualFriends: number, followers: number}
) {}
}
