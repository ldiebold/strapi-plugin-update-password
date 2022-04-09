# Strapi plugin update-password

This plugin allows users using the `local` auth provider, to update their password.

## Route and params
The route this plugin provides is:
```yaml
PUT: http://your-strapi-app/api/update-password
```

Here's an example of how the data might look in your `PUT` request:
```json
{
  "password": "originalPaSsWoRd",
  "newPassword": "secret-new%password",
  "confirmPassword": "secret-new%password"
}
```

So with axios, you might do something like this:
```js
axios({
  method: 'put',
  url: 'http://your-strapi-app/api/update-password',
  data: {
    password: "originalPaSsWoRd",
    newPassword: "secret-new%password",
    confirmPassword: "secret-new%password"
  },
  headers: {
    "Authorization": "Bearer BEARER_TOKEN_HERE"
  }
})
```

And that's it. Feel free to open an issue with any questions :)