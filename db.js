const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function main(){
mongoose.connect(
  process.env.MONGO_DB_URL
);
console.log('Connected')
}

main().catch((err)=>console.log(err))