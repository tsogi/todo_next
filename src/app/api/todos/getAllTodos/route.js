import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

export async function GET() {
    const client = new MongoClient(uri);

    await client.connect();
    const database = client.db("todo_app");
    const todos = database.collection("todos");

    const allTodos = await todos.find().toArray();
    
    return new Response(JSON.stringify(allTodos));
}