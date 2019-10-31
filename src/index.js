import express from 'express';
import path from 'path';
import { inspect } from 'util';
import CircularJSON from 'circular-json';

import Graph from './graph/Graph';
import GraphEdge from './graph/GraphEdge';
import GraphVertex from './graph/GraphVertex';

import Prim from './algorithms/prim';
import Kruskal from './algorithms/kruskal';

const app = express();

const routes = express.Router();

app.use(express.json());

routes.get('/find-path', async (req, res) => {
  const { algorithm } = req.query;

  const graph = new Graph();

  const a = new GraphVertex("1"),
        b = new GraphVertex("2"),
        c = new GraphVertex("3"),
        d = new GraphVertex("4"),
        e = new GraphVertex("5"),
        f = new GraphVertex("6"),
        g = new GraphVertex("7"),
        h = new GraphVertex("8"),
        i = new GraphVertex("9")

  graph.addVertex(a)
  graph.addVertex(b)
  graph.addVertex(c)
  graph.addVertex(d)
  graph.addVertex(e)
  graph.addVertex(f)
  graph.addVertex(g)
  graph.addVertex(h)
  graph.addVertex(i)

  graph.addEdge(new GraphEdge(a, b, 4))
  graph.addEdge(new GraphEdge(a, h, 8))
  graph.addEdge(new GraphEdge(b, c, 8))
  graph.addEdge(new GraphEdge(b, h, 11))
  graph.addEdge(new GraphEdge(c, d, 7))
  graph.addEdge(new GraphEdge(c, i, 2))
  graph.addEdge(new GraphEdge(c, f, 4))
  graph.addEdge(new GraphEdge(d, e, 9))
  graph.addEdge(new GraphEdge(d, f, 14))
  graph.addEdge(new GraphEdge(e, f, 10))
  graph.addEdge(new GraphEdge(f, g, 2))
  graph.addEdge(new GraphEdge(g, i, 6))
  graph.addEdge(new GraphEdge(g, h, 1))
  graph.addEdge(new GraphEdge(h, i, 7))

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }

      return value;
    };
  };

  if (algorithm == 'PRIM' ||
      algorithm == 'KRUSKAL'
  ) {
    switch (algorithm) {
      case 'PRIM':
        const prim = Prim(graph);
        console.log(prim)
        const primString = JSON.stringify(prim, getCircularReplacer())

        return res.json(primString);

      case 'KRUSKAL':
        const kruskal = Kruskal(graph)
        console.log(kruskal)

        const kruskalString = JSON.stringify(kruskal, getCircularReplacer())

        return res.json(kruskalString);
    }
  } else {
    return res.status(401).json({ message: 'Algoritmo não existe' })
  }
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
