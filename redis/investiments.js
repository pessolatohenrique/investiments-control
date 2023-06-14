const redis = require("redis");
const manipulateList = require("./manipulate-list");
const investimentsList = redis.createClient({
    legacyMode: true,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    prefix: "investiments:",
});

module.exports = manipulateList(investimentsList);
