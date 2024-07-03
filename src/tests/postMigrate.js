const sequelize = require('../utils/connection');
require('../models')

const postMigrate = async () => {

    try {
        await sequelize.sync({ force: true })
        console.log('Force final 🤯🤯');
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

postMigrate()