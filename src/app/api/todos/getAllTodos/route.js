import { MongoClient } from "mongodb";

const uri = "mongodb+srv://nika:learn_mongo_123@learn-mongo.8yatdc3.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo";

export async function GET() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("todo_app");
        const todos = database.collection("todos");

        const allTodos = await todos.find().toArray();
        
        // Return all todos as response
        return new Response(JSON.stringify(allTodos), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } finally {
        await client.close();
    }
}