const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

async function loader({expressApp}){
    await mongooseLoader();
    await expressLoader({ app: expressApp });

    console.log('Express loaded');
}
module.exports = loader;