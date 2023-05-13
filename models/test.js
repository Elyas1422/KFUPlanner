const { getAllUsers,login, getUser } = require('./user_model');

async function main() {
  try {
    console.log(await getUser("elyasalmubarak@gmail.com"));
  } catch (error) {
    console.error(error);
  }
}

main();