import express from "express";
import cors from "cors";
import usermodel from "user-services.js";

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
  if (name != undefined) {
    let result = usermodel.findUserByName(name)
      .then(() => {
        res.status(201).send("User created successfuly");
        console.log("User found by ID");
      })
      .catch((error) => {
        console.log("Unable to find user by ID");
      });
    result = { users_list: result };
    if (job != undefined) {
      let finalres = usermodel.findUserByJob(job, result)
        .then(() => {
          res.status(201).send("User created successfuly");
          console.log("User found by ID");
        })
        .catch((error) => {
          console.log("Unable to find user by ID");
        });
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
  let result = usermodel.findUserById(id)
    .then(() => {
      res.status(201).send("User created successfuly");
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

  usermodel.addUser(userToAdd)
  .then(() => {
    res.status(201).json({message : "User created successfuly", user: userToAdd});
    console.log("User creation unsuccessful");
  })
  .catch((error) => {
    console.log("User creation unsuccessful");
  });
});

//DELETE endpoint
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const user = usermodel.findUserById(id)
    .then(() => {
      res.status(201).send("User found successfuly");
      })
      .catch((error) => {
        console.log("Could not find user by ID");
      });
  if (user !== -1) {
    users["users_list"].splice(user, 1);
    res.status(204).send("Successfully removed user.");
  } 
  else {
    res.status(404).send("User id not found");
  }
});

//running the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
