const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Database file name
});

// Define a User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Main function to handle database operations
async function main() {
  try {
    // Connect and sync models
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: true }); // Recreate tables on each run
    console.log('Database synchronized.');

    // Create a new user
    const newUser = await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
    console.log('New user created:', newUser.toJSON());

    // Retrieve all users
    const users = await User.findAll();
    console.log('All users:', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

// Run main function
main();
