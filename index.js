const express = require("express");
require("dotenv").config();
const db = require("./connect");
const { getProjects, addProject, deleteProject, editProject } = require("./services/projectServices");
const cors = require("cors");

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

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
    console.log("Server is online");
});
