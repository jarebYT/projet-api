const bdd = require('./index');

const sync = async () => {
    await bdd.sync({alter: true});
    console.log("Synchronisation réussie");
}

sync();