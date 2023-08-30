// Without a defined Matcher, applies next auth to the entire project
export { default } from 'next-auth/middleware'

/** 
If you need to protect single or multiple pages, or API routes, you can export a config object with a matcher key. The matcher is an array that can contain the routes you want to protect. In the code below, we added "/((?!register|api|login).*)" to the matcher array. This ensures that any route other than those for the register, login, and api directories will be protected.

src/middleware.ts

```ts
export const config = {
  // matcher: ["/profile"],
  matcher: ["/((?!register|api|login).*)"],
}
```
*/

// Applies next-auth only to specific pages
export const config = { matcher: ['/auth/session/', '/client/chat/' ] }
