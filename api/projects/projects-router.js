// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Project = require("./projects-model");
const {
    validateProjectId,
    validateProject,
} = require("../middleware/middleware");

router.get("/", async (req, res) => {
    try {
        const projects = await Project.get();
        res.status(200).json(projects);
    } catch (e) {
        res.status(500).json({
            message: "The projects information could not be retrieved",
        });
    }
});

router.get("/:id", validateProjectId, async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.status(200).json(project);
});

router.post("/", validateProject, async (req, res) => {
    const newProject = await Project.insert(req.body);
    res.status(201).json(newProject);
});

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
    const update = req.body;
    const { id } = req.params;
    const projectUpdated = await Project.update(id, update);
    projectUpdated
        ? res.status(200).json({ ...update, id })
        : res.status(500).json({
              message: "The post information could not be modified",
          });
});

router.delete("/:id", validateProjectId, async (req, res) => {
    const { id } = req.params;
    const postDeleted = await Project.delete(id);
    postDeleted
        ? res.status(200)
        : res.status(500).json({ message: "The post could not be removed" });
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
    const { id } = req.params;
    const posts = await Project.getProjectActions(id);
    res.status(200).json(posts);
});
module.exports = router;
