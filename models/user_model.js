const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'db/kfuplanner_users.db3',
        driver: sqlite3.Database
    })
}

async function getAllUsers() {
    const db = await getDbConnection();
    const rows = await db.all('select * from user order by email desc ')
    await db.close()
    return rows
}

async function login(email, password){
    try{
        const db = await getDbConnection();
        const rows = await db.all(`select email, password from user where email = '${email}'`)
        await db.close()
        return  rows[0]['password'] == password;
    }
    catch (error){
        return false;
    }
}
async function getUser(email){
    const db = await getDbConnection();
    const rows = await db.all(`select email, fname, lname from user where email = '${email}'`)
    await db.close()
    return  rows[0];
}

async function addUser(user_info){

    try{
        const db = await getDbConnection();
        const keys = Object.keys(user_info);
        const columns = keys.join(', ');
        const values = keys.map(key => `'${user_info[key]}'`).join(', ');
        const meta = await db.run(`INSERT INTO user (${columns}) VALUES (${values})`);
        await db.close();
        return meta;
    }
    catch(error){
        throw new Error("Email exist in the database");
    }
}

module.exports = {getAllUsers, login, getUser, addUser}