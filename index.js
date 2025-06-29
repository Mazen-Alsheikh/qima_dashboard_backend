const express = require("express");
require("dotenv").config();
const db = require("./connect");
const cors = require("cors");
const { getProjects, addProject, deleteProject, editProject } = require("./services/projectServices");
const { deleteUser, getUsers, addUser, editUser } = require("./services/usersServices");
const { login } = require("./services/loginServices");
const { getHoods, deleteHood, addHood, editHood } = require("./services/hoodsServices");

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
app.post("/api/project/edit", editProject);
app.post("/api/project/delete", deleteProject);

app.post("/api/login", login);

app.get("/api/users", getUsers);
app.post("/api/user/add", addUser);
app.post("/api/user/edit", editUser);
app.post("/api/user/delete", deleteUser);

app.get("/api/hoods", getHoods);
app.post("/api/hood/add", addHood);
app.post("/api/hood/edit", editHood);
app.post("/api/hood/delete", deleteHood);

const port = process.env.PORT;

app.listen(port, "0.0.0.0", () => {
    console.log("Server is online");
});
