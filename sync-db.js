const { syncDB, getModelsThatDontExist } = require('./database/sync');

(
    async () => {
        await getModelsThatDontExist()
        await syncDB()
    }
)()
