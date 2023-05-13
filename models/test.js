const { getAllUsers,login, getUser, addUser } = require('./user_model');

async function main() {
  try {
    console.log(await getAllUsers());
  } catch (error) {
    console.error(error);
  }
}

main();