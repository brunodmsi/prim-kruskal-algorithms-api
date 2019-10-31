const express = require('express');
const path = require('path');

const app = express();

const routes = express.Router();

app.use(express.json());

routes.get('/prim', async (req, res) => {

})

routes.get('/kruskal', async (req, res) => {

})

routes.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'index.html')
  )
})

routes.get('/styles.css', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'index.html')
  )
})

routes.get('/script.js', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'index.html')
  )
});

app.use(routes);

app.listen(8080, () => console.log("Rodando na porta 8080"));