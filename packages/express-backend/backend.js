import express from "express";
import cors from "cors";
import userModel from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

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
  
  userModel.getUsers(name, job)
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    console.log("Unable to find user");
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = userModel.findUserById(id)
    .then(() => {
      res.status(201).send("Found user by ID");
      console.log("User found by ID");
    })
    .catch((error) => {
      console.log("Unable to find user by ID");
    });
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

  userModel.addUser(userToAdd)
  .then(() => {
    res.status(201).json({message : "User created successfuly", user: userToAdd});
  })
  .catch((error) => {
    console.log("User creation unsuccessful");
  });
});

//DELETE endpoint
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const user = userModel.findbyIdandDelete(id)
    .then(() => {
      res.status(204).send("User deleted successfuly");
      })
      .catch((error) => {
        res.status(404).send("User id not found");
      });
});

//running the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
