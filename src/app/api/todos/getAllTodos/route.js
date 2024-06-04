import { MongoClient } from "mongodb";

// MongoDB connection URI
const uri = "mongodb+srv://nika:learn_mongo_123@learn-mongo.8yatdc3.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo";

// Create a new MongoClient
let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

// Async function to handle GET requests
export async function GET() {
  try {
    // Ensure the client is connected
    await clientPromise;

    // Get the database and collection
    const database = client.db("todo_app");
    const todos = database.collection("todos");

    // Fetch all todos
    const allTodos = await todos.find().toArray();

    // Return all todos as response
    return new Response(JSON.stringify(allTodos), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);

    // Return an error response
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}