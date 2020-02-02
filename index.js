const { Nuxt, Builder } = require("nuxt");

const app = require("express")();
const port = process.env.PORT || 5000;

const config = require("./nuxt.config.js");

config.dev = !(process.env.NODE_ENV === "production");

const nuxt = new Nuxt(config);

// Use Nuxt to render all routes
app.use(nuxt.render);

// Build with hot-reloading when in development mode
if (config.dev) {
  new Builder(nuxt).build().then(listen);
} else {
  listen();
}

function listen() {
  app.listen(port, "0.0.0.0");
  console.log("Server listening on `localhost:" + port + "`.");
}
