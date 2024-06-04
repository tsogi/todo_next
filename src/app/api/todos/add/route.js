import { MongoClient } from "mongodb";
const uri = "mongodb+srv://nika:learn_mongo_123@learn-mongo.8yatdc3.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo";

export async function POST(request) {
    // 1. Get "task" parameter from request
    const { task } = await request.json(); // {task: "new test task 124"}

    // 2. Store new todo in MongoDB
    const client = new MongoClient(uri);
    const database = client.db("todo_app");
    const todos = database.collection("todos");

    const doc = { task: task }

    const result = await todos.insertOne(doc);
    // const result = await todos.delete({ id: 77 });

    await client.close();

    // 3. Return response "Todo created successfully"
   
    return Response.json(result);
}