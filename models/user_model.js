const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'kfuplanner_users.db3',
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

module.exports = {getAllUsers,login}