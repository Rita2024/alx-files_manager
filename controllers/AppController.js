const { checkRedisHealth, countUsers, countFiles } = require('../utils'); // Import helper functions

exports.getStatus = async (req, res) => {
  const isRedisHealthy = await checkRedisHealth();
  const isDbHealthy = await checkDatabaseHealth(); // Function to check database health (implementation not provided)

  res.status(200).json({ redis: isRedisHealthy, db: isDbHealthy });
};

exports.getStats = async (req, res) => {
  const usersCount = await countUsers();
  const filesCount = await countFiles();

  res.status(200).json({ users: usersCount, files: filesCount });
};

