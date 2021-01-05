# messageboard

## Run
```
node bin/www
```

## UseCase 
1. Signup 
2. Login (use cookie 30mins.)
3. UpdateProfile / Message(only parent-child, 2 layers) / Logout

## RESTFul API

* Signup

```
[POST] /v1/account/signup
[BODY] {
           "email": <email>,
           "password": <password>
       }
```

* Login
```
[POST] /v1/account/login
[BODY] {
           "email": <email>,
           "password": <password>
       }
```

* Logout
```
[POST] /v1/account/logout
```

* Profile   
***need login at fist***

```
- Get
[GET]  /v1/account/profile

- Update
[POST] /v1/account/profile
[BODY] {
           "name": <name>,
           "nickName": <nickName>,
           "birthday": <yyyy-MM-DD>,
           "gender": <0,1,or2>, //0:Male, 1:Female, 2:Other
           "headShot": <file>
       }
```

* Message   
***need login at fist***

``` 
- Create
[POST] /v1/message
[BODY] {
           "email": <email>
           "messageTime": <yyyy-MM-DD HH:mm>,
           "content": <content>
       }
       
- Replay
[POST] /v1/message
[BODY] {
           "email": <email>
           "messageTime": <yyyy-MM-DD HH:mm>,
           "content": <content>,
           "parentId": <parentMessageId>
       }

- Delete
[POST] /v1/message/delete
[BODY]   {
             "messageId": <messageId>,
             "parentId": <parentMessageId> //If the mesaage is reply, need this field
         }
```
