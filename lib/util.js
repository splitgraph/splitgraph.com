const crypto = require("crypto");
const fs = require("fs");

const insecureRandomString = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const md5 = (data) => crypto.createHash("md5").update(data).digest("hex");

const md5sumSync = (path) => md5(fs.readFileSync(path));

module.exports = {
  insecureRandomString,
  md5,
  md5sumSync,
};
