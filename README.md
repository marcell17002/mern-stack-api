# RESTFUL API

This is a restful api using node.js , express.js, Mongodb and will be implemented on React Native.

## Standar API Response

{root.api}/{version}/{grouping}/{endpoint}
eg : localhost:4000/v1/auth/user

- 200 - OK
- 201 - CREATED
- 400 - BAD REQUEST
- 401 - UNAUTHORIZED
- 403 - FORBIDDEN
- 404 - NOT FOUND
- 500 - INTERNAL SEVER ERROR
- 502 - BAD GATEWAY

## How to Get Access

### user ( Auth )

> localhost:4000/v1/auth/{endpoint}

| Method | Endpoint           | Detail                  |
| ------ | ------------------ | ----------------------- |
| GET    | /auth/users        | Get all user data       |
| GET    | /auth/user/:userId | Get spesific user by id |
| POST   | /auth/user         | Create new user         |
| UPDATE | /auth/user/:userId | Update user data by id  |
| DELETE | /auth/user/:userId | Delete user by id       |

Authentication user

| Method | Endpoint     | Detail              |
| ------ | ------------ | ------------------- |
| POST   | /auth/login  | Login with token    |
| GET    | /auth/logout | Logout ( optional ) |

### profile ( Profile )

> localhost:4000/v1/profile/{endpoint}

| Method | Endpoint             | Detail                          |
| ------ | -------------------- | ------------------------------- |
| GET    | /profile/posts       | Get all profile data            |
| GET    | /profile/post/postId | Get spesific profile data by id |
| POST   | /profile/post        | Add new profile data            |
| UPDATE | /profile/post/postId | Update profile data by id       |
| DELETE | /profile/post/postId | Delete profile data by id       |

### event

> localhost:4000/v1/event/{endpoint}

| Method | Endpoint            | Detail                   |
| ------ | ------------------- | ------------------------ |
| GET    | /event/posts        | Get all event data       |
| GET    | /event/post/:postId | Get spesific event by id |
| POST   | /event/post         | Create new event         |
| UPDATE | /event/post/:postId | Update event data by id  |
| DELETE | /event/post/:postId | Delete event by id       |

### Chat

> localhost:4000/v1/chat/{endpoint}

| Method | Endpoint           | Detail                  |
| ------ | ------------------ | ----------------------- |
| GET    | /chat/posts        | Get all chat data       |
| GET    | /chat/post/:chatId | Get spesific chat by id |
| POST   | /chat/post         | Add new chat data       |

# Let's Get Started

```sh
$ git clone https://github.com/marcell17002/mern-stack-api
$ cd mern-stack-api
$ yarn install
$ yarn start
```
