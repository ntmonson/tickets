## Tickets app for Turtle

Things to note: I used [react-starter-kit](https://github.com/kriasoft/react-starter-kit) to get started.

I did not use redux, I used the apollo store and relied on the queries and cache to update application state in general. I learned this method at GraphQL Summit, I'm interested to hear what your thoughts are about this. Do you think I should still use redux and dispatch actions? It seems like you don't need it when hooked up directly to graphql on the specific components that need it.

#### Small heroku issue:

[Heroku will not persist hard-drive files](https://devcenter.heroku.com/articles/sqlite3), the backend I chose was sqlite. Eventually any tickets you add will be wiped. I can migrate it to postgres if you would like, I was just trying to avoid having to pay for anyhthing.
