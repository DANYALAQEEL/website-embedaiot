const Story = require("../models/Story");

// CREATE
const createStory = async (req, res) => {
  try {
    const storyData = { ...req.body };
    if (req.file) {
      storyData.image = req.file.filename;
    }
    const story = await Story.create(storyData);
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ order: 1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateStory = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteStory = async (req, res) => {
  try {
    const deleted = await Story.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json({ message: "Story deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStory,
  getStories,
  updateStory,
  deleteStory,
};