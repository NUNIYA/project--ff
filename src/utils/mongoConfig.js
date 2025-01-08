exports.getMongoConfig = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'gym-management', // Explicitly set database name
  retryWrites: true,
  w: 'majority'
});