// getting-started.js
const mongoose = require("mongoose");
const { DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;

main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://localhost:27017/notes-db');
  const connection_String = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}/${DATABASE_NAME}?retryWrites=true&w=majority`;
  await mongoose.connect(connection_String);
  // We're Connected.
  console.log("db is now connected");
}
