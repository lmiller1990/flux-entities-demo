const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const tasks = [
  {
    "id": 1,
    "title": "Some task",
    "projectId": 1,
    "assignee": 1,
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
  console.log(req.query)

  setTimeout(() => {
    res.json(
      tasks.filter(x => x.projectId === parseInt(req.query.projectId))
    )
  }, 500)
})

app.listen(8080, () => console.log('Listening on port 8080'))
