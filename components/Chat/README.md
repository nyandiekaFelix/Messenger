Create multiple users with different Ids.
```javascript
// This needs to be run only once

SendBirdService.connect('userId').then(response => {
  console.log(response);
  SendBirdService.addUserMetadata({ fullName: 'User Name', avatar: 'sample avatar url'})
})
```

current user's ID could be fetched from the localstorage if you'd prefer. Then log them in 
```javascript
SendBirdService.connect(userId)
```

start a chat between users
```javascript
// The first param would be the current logged in user's ID

SendBirdService.startChat(['userId1', 'userId2']).then(response => {
  console.log(response)
})
```