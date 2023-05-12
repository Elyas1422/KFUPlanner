const { getAllUsers,login } = require('./user_model');

async function main() {
  try {
    var formData = new FormData();
    formData.append("email", "email");
    formData.append("password", "password");
    console.log(formData);
  } catch (error) {
    console.error(error);
  }
}

main();