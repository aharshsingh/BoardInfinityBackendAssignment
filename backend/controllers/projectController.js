const CustomErrorHandler = require('../services/customerErrorHandler');
const { Op } = require('sequelize');

const Project = require('../models/Project')
const projectController = {
    async createProject(req,res,next){
        const { name, description, assignedTo } = req.body;
        const createdBy = req.user.id;
        try {
          const newProject = await Project.create({
            name,
            description,
            createdBy,
            assignedTo,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          return res.status(201).json({
            message: 'Project created successfully'
          });
        } catch (error) {
          return next(CustomErrorHandler.serverError('Internal server error'));
        }
    },
    async getAllProject(req,res,next){
        const { role, id} = req.user;
  try {
    let projects;
    if (role === 'Admin') {
      projects = await Project.findAll();
    } else {
      projects = await Project.findAll({
        where: {
          assignedTo: {
            [Op.contains]: [id]
          }
        }
      });
    }
    return res.status(200).json({
      message: 'Projects retrieved successfully',
      projects
    });
  } catch (error) {
    console.error('Error retrieving projects:', error);
    return next(CustomErrorHandler.serverError('Internal server error'));
  }
    },
    async getProject(req, res) {
  const { id } = req.params;
  const { role, userID } = req.user; 

  try {
    let project;
    if (role === 'Admin') {
      project = await Project.findByPk(id);
    } else {
      project = await Project.findOne({
        where: {
          id: id,
          assignedTo: {
            [Op.contains]: [userID]
          }
        }
      });
    }
    if (!project) {
      return next(CustomErrorHandler.notFound('Project not found or access denied!'));
    }

    return res.status(200).json({
      message: 'Project retrieved successfully',
      project
    });
  } catch (error) {
    return next(CustomErrorHandler.serverError('Internal server error'));
  }
},
async updateProject(req,res,next){
    const { id } = req.params;
    const { name, description, assignedTo } = req.body;
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        return next(CustomErrorHandler.notFound('Project not found!'));
      }
      project.name = name || project.name;
      project.description = description || project.description;
      project.assignedTo = assignedTo || project.assignedTo;
      await project.save();
      return res.status(200).json({
        message: 'Project updated successfully',
        project
      });
    } catch (error) {
      return next(CustomErrorHandler.serverError('Internal server error'));
    }
},
async deleteProject(req, res, next) {
    const { id } = req.params;
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        return next(CustomErrorHandler.notFound('Project not found!'));
      }
      project.deletedAt = new Date();
      project.isDeleted = true; 
      await project.save(); 
      return res.status(200).json({
        message: 'Project soft deleted successfully',
        project
      });
    } catch (error) {
      return next(CustomErrorHandler.serverError('Internal server error'));
    }
  },

  async restoreProject(req,res,next){
    const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return next(CustomErrorHandler.notFound('Project not found!'));
    }
    if (!project.isDeleted) {
      return res.status(400).json({
        message: 'Project is not soft deleted.'
      });
    }
    project.isDeleted = false;
    project.deletedAt = null;
    await project.save(); 
    return res.status(200).json({
      message: 'Project restored successfully',
      project
    });
  } catch (error) {
    return next(CustomErrorHandler.serverError('Internal server error'));
  }
  }
  
}

module.exports = projectController;
