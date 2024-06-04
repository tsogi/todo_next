import { MongoClient, ObjectId } from "mongodb";

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

export async function POST(req, { params }) {
    const { todoId } = params; // Extract todoId from the URL parameters

    if (!todoId) {
        return new Response(JSON.stringify({ error: "Todo ID is required" }));
    }

    const client = new MongoClient(uri);

    await client.connect();
    const database = client.db("todo_app");
    const todos = database.collection("todos");

    const result = await todos.deleteOne({ _id: new ObjectId(todoId) });

    return new Response(JSON.stringify({ message: "Todo deleted successfully" }));
}