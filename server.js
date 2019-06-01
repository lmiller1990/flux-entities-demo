const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const tasks = [
  {
    "id": 1,
    "title": "Install Redux",
    "projectId": 1,
    "assignee": 1,
  },
  {
    "id": 2,
    "title": "Read Redux docs",
    "projectId": 1,
    "assignee": 2,
  },
  {
    "id": 3,
    "title": "Install Vuex",
    "projectId": 2,
    "assignee": 2,
  },
  {
    "id": 4,
    "title": "Understand flux architecture",
    "projectId": 2,
    "assignee": 3,
  },
  {
    "id": 5,
    "title": "Learn TypeScript",
    "projectId": 3,
    "assignee": 1,
  },
  {
    "id": 6,
    "title": "Read flux-entities docs",
    "projectId": 3,
    "assignee": 3,
  }
]

app.get('/projects', (req, res) => {
  setTimeout(() => {
    res.json([
      {
        "id": 1,
        "title": "Learn Redux",
        "memberIds": [1, 2, 3],
        "leaderId": 1
      },
      {
        "id": 2,
        "title": "Learn Vuex",
        "memberIds": [2, 3],
        "leaderId": 2
      },
      {
        "id": 3,
        "title": "Use Flux Entities to build something",
        "memberIds": [1, 3],
        "leaderId": 1
      }
    ])
  }, Math.random() * 5000)
})

app.get('/tasks', (req, res) => {
  setTimeout(() => {
    res.json(
      tasks.filter(x => x.projectId === parseInt(req.query.projectId))
    )
  }, 500)
})

app.listen(8080, () => console.log('Listening on port 8080'))
