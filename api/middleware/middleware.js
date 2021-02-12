const Project = require("../projects/projects-model");
const Action = require("../projects/projects-model")
const validateProjectId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await Project.get(id);
        if (user) {
            next();
        } else {
            res.status(404).json({ message: "project with that ID not found" });
        }
    } catch (e) {
        res.status(500).json({ message: e });
    }
};

const validateActionId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const action = await Action.get(id);
        if (action) {
            next();
        } else {
            res.status(404).json({ message: "action with that ID not found" });
        }
    } catch (e) {
        res.status(500).json({ message: e });
    }
};

const validateProject = (req, res, next) => {
    if (!req.body.description) {
        res.status(400).json({ message: "missing required description field" });
    } else if (!req.body.name) {
        res.status(400).json({ message: "missing project data" });
    } else {
        next();
    }
};

const validateAction = async (req, res, next) => {
    const validId = await Project.get(req.body.project_id);
    if (!req.body.description) {
        res.status(400).json({ message: "missing description data" });
    } else if (!req.body.notes) {
        res.status(400).json({ message: "missing required notes field" });
    } else if (validId) {
        res.status(400).json({
            message: "missing project id or non existant project wit that id",
        });
    } else {
        next();
    }
};

module.exports = {
    validateProjectId,
    validateActionId,
    validateProject,
    validateAction,
};
