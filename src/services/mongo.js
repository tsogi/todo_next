import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;
const client = new MongoClient(uri);
const database = client.db("todo_app");

export const todos = database.collection("todos");