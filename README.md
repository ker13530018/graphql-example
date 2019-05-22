## Start Json server

```node
    $ npm install json-server -g
    $ json-server --watch db.json
```

## Start GraphQL server

```node
    node server.js
```

## Query

```
query {
  user (id:"23") {
    id
    firstName
    lastName
    age
    company {
      id
    }
  }
}
```
