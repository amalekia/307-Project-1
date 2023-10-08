import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(cors());
app.use(express.json());

//helper functions
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByJob = (job, users) => {
  return users["users_list"].filter((user) => user["job"] === job);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

function randomIdGenerator() {
  const randomID = Math.random().toString().replace(".", "");
  return randomID;
}

//GET endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    if (job != undefined) {
      let finalres = findUserByJob(job, result);
      finalres = { users_list: finalres };
      res.send(finalres);
    } else {
      res.send(result);
    }
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

//POST endpoints
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = randomIdGenerator();
  addUser(userToAdd);
  res.status(201).json({ message: "User created successfuly", user: userToAdd });
});

//DELETE endpoint
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const user = users["users_list"].findIndex((user) => user["id"] === id);
  if (user !== -1) {
    users["users_list"].splice(user, 1);
    res.send("Successfully removed user.");
  } 
  else {
    res.send("User id not found");
  }
});

//running the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
