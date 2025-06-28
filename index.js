const express = require("express");
require("dotenv").config();
const db = require("./connect");
const cors = require("cors");
const { getProjects, addProject, deleteProject, editProject } = require("./services/projectServices");
const { InserUser, updateUser, deleteUser } = require("./services/usersServices");
const { login } = require("./services/loginServices");

const app = express();
app.use(express.json());
app.use(cors());

try {
    db.connect();
    console.log("Database Connected");
} catch (error) {
    console.error(error.message);
}

app.get("/api/projects", getProjects);
app.post("/api/project/add", addProject);
app.post("/api/project/delete", deleteProject);
app.post("/api/project/edit", editProject);
app.post("/api/login", login);
app.post("/api/users/insert", InserUser);
app.post("/api/users/update", updateUser);
app.post("/api/users/delete", deleteUser);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log("Server is online");
});