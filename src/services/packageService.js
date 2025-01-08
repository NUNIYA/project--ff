const Package = require('../models/Package');
const { samplePackages } = require('../utils/sampleData');

exports.getPackages = async () => {
  try {
    const packages = await Package.find();
    return packages?.length ? packages : samplePackages;
  } catch (error) {
    return samplePackages;
  }
};