const Portfolio = require("../models/Portfolio");


// CREATE PROJECT
const createPortfolio = async (req, res) => {
  try {
    const portfolioData = {
      ...req.body,
      technologies: req.body.technologies
        ? req.body.technologies.split(",").map((t) => t.trim())
        : [],
    };
    if (req.file) {
      portfolioData.image = req.file.filename;
    }
    const portfolio = await Portfolio.create(portfolioData);
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL PROJECTS
const getPortfolios = async (req, res) => {
  try {

    const portfolios = await Portfolio.find();

    res.status(200).json(portfolios);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET SINGLE PROJECT
const getSinglePortfolio = async (req, res) => {
  try {

    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(portfolio);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// UPDATE PROJECT
const updatePortfolio = async (req, res) => {
  try {

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );

    if (!updatedPortfolio) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(updatedPortfolio);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// DELETE PROJECT
const deletePortfolio = async (req, res) => {
  try {

    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);

    if (!deletedPortfolio) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  createPortfolio,
  getPortfolios,
  getSinglePortfolio,
  updatePortfolio,
  deletePortfolio,
};