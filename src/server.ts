import {Application, Router, Context} from "https://deno.land/x/oak/mod.ts"

const app = new Application()
const router = new Router()

router.get("/", (ctx: Context) => {
  ctx.response.status = 200
  ctx.response.body = `<!DOCTYPE html>
  <html>
  <head><title> Desafio servidor con Deno</title></head>
  <body>
  <h1>
  Se termino el curso... Gracias por todo Ale!!
  </h1>
  <p> Me encanto! Ahora a seguir!</p>
  <p>❤️❤️❤️❤️</p>
  </body>
  </html>`
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen({port: 3000})
console.log ("Server listening on http://localhost:3000")