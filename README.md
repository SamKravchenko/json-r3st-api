# JSON R3ST API

## Fake API for testing

> **Note**: The API only works to send JSON data. You cannot create, update or delete your own or existing data.

## Example

### Make a request

```
fetch('url')
  .then(response => response.json())
  .then(json => console.log(json))
```

### Receive JSON

```
{
  _id: 62f58a306e8e375ce71a3d57,
  userName: rsabatini1,
  firstName: Ruy,
  lastName: Sabatini,
  email: rsabatini1@europa.eu,
  address: {
    country: Ukraine,
    city: Mizoch,
    street: Kipling,
    suite: 12378,
  },
  phone: 1069688726,
  avatarUrl: https://robohash.org/molestiaerepellendusquo.png?size=50x50&set=set1,
}
```

## Routes

| Path      | Default data  |
| :-------- | :------------ |
| /users    | 100 users     |
| /posts    | 500 posts     |
| /comments | 1500 comments |
| /todos    | 300 todos     |
| /albums   | 100 albums    |
| /photos   | 500 photos    |

## [Get additional info](https://jsonr3st.herokuapp.com)
