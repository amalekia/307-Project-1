import express from "express";
import cors from "cors";
import userModel from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

//GET endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  userModel.getUsers(name, job)
  .then((response) => {
    if (response.length === 0){
      res.status(404).send("No users found");
    }
    else{
      res.status(200).send({ users_list: response });
    }
  })
  .catch((error) => {
    console.log("Error" + error);
    res.status(500).send("Unable to find users");
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userModel.findUserById(id)
    .then((user) => {
      if (user) {
        res.status(201).send({message : "Found user by ID", user: user});
        console.log("User found by ID");
      }
      else {
        res.status(404).send("User not found by ID");
        console.log("User not found by ID");
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
      res.status(500).send("Unable to find user by ID");
    })
});

//POST endpoints
app.post("/users", (req, res) => {
  const userToAdd = req.body;

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
  userModel.userDelete(id)
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
