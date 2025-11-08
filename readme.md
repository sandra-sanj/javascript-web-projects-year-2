# Links to assignments

## Week 1

### Set 1

[1](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-1-conditional-expressions-and-loops/task-1/site1.html) | [2](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-1-conditional-expressions-and-loops/task-2/site2.html) | [3](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-1-conditional-expressions-and-loops/task-3/site3.html) | [4](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-1-conditional-expressions-and-loops/task-4/site4.html) | [5](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-1-conditional-expressions-and-loops/task-5/site5.html) | [6](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-1-conditional-expressions-and-loops/task-6/site6.html)

### Set 2

[1](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-2-arrays-and-functions/task-1/site1.html) | [2](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-2-arrays-and-functions/task-2/site2.html) | [3](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-2-arrays-and-functions/task-3/site3.html) | [4](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-2-arrays-and-functions/task-4/site4.html) | [5](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-2-arrays-and-functions/task-5/site5.html) | [6](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-1/task-set-2-arrays-and-functions/task-6/site6.html)

## Week 2

### Set 1

[1](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-1-dom/t1/t1.html) | [2](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-1-dom/t2/t2.html) | [3](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-1-dom/t3/t3.html) | [4](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-1-dom/t4/t4.html) | [5](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-1-dom/t5/t5.html)

### Set 2

[1](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-2-event-handling/t1/t1.html) | [2](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-2-event-handling/t2/t2.html)

### Set 3

[1](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-3-ajax/task-1/task1.html) | [2](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-3-ajax/task-2/task2.html) | [3](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-3-ajax/task-3/task3.html) | [4](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-3-ajax/task-4/task4.html) | [5](https://users.metropolia.fi/~sandraj/javascript-web-projects-year-2/week-2/task-set-3-ajax/task-5/task5.html)

## Website with REST API

[Branch](https://github.com/sandra-sanj/javascript-web-projects-year-2/tree/website-with-rest-api) | [Hosted Website (coming)]

## Protected request routes

Requests authorize the token of the user to grant or deny access. Only authorized users may modify certain parts of the database.

| Request | Header                | Comment                                         | authorization |
| ------- | --------------------- | ----------------------------------------------- | ------------- |
| POST    | /api/v1/cats          | adds cat to user                                | yes           |
| PUT     | /api/v1/cats/:id      | updates user's cat with matching id (cat_id)    | yes           |
| DELETE  | /api/v1/cats/:id      | deletes user's cat with matching id             | yes           |
| GET     | /api/v1/cats/user     | gets all user's cats                            | yes           |
| GET     | /api/v1/cats/user/:id | gets all cats for user with id (user_id)        | no            |
| POST    | /api/v1/auth/login    | token from correct login (username and pasword) | no            |
| GET     | /api/v1/auth/me       | get user data from token                        | yes           |
| POST    | /api/v1/users         | add user                                        | no            |
