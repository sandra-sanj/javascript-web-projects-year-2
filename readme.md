# Protected request routes

Requests check the token of the user to grant or deny access to features. Only authorized users may access to certain features.

Below are tables containing all requests, for cats and users.

### Cat related requests

| Request | URL                   | Comment                                     | Authorization required |
| ------- | --------------------- | ------------------------------------------- | ---------------------- |
| GET     | /api/v1/cats          | get all cats                                | no                     |
| GET     | /api/v1/cats/:id      | get cat with id                             | no                     |
| POST    | /api/v1/cats          | add cat to user (logged in)                 | yes                    |
| PUT     | /api/v1/cats/:id      | update user's cat with matching id (cat_id) | yes                    |
| DELETE  | /api/v1/cats/:id      | delete user's cat with matching id          | yes                    |
| GET     | /api/v1/cats/user     | get all user's cats                         | yes                    |
| GET     | /api/v1/cats/user/:id | get all cats for user with id (user_id)     | no                     |

### User related requests

| Request | URL                | Comment                                                 | Authorization required |
| ------- | ------------------ | ------------------------------------------------------- | ---------------------- |
| GET     | /api/v1/users      | get all users                                           | no                     |
| GET     | /api/v1/users/:id  | get user with id                                        | no                     |
| POST    | /api/v1/users      | add user                                                | no                     |
| PUT     | /api/v1/users/:id  | update user if token (login) matches id                 | yes                    |
| DELETE  | /api/v1/users/:id  | delete user and user's cats if token (login) matches id | yes                    |
| POST    | /api/v1/auth/login | get token from correct login (username and password)    | no                     |
| GET     | /api/v1/auth/me    | get user data from token                                | yes                    |
