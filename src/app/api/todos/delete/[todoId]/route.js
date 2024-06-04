import { MongoClient, ObjectId } from "mongodb";

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

export async function POST(req, { params }) {
    const { todoId } = params; // Extract todoId from the URL parameters
    console.log("todo id", todoId);

    if (!todoId) {
        return new Response(JSON.stringify({ error: "Todo ID is required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("todo_app");
        const todos = database.collection("todos");

        const result = await todos.deleteOne({ _id: new ObjectId(todoId) });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ error: "Todo not found" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        // Return success response
        return new Response(JSON.stringify({ message: "Todo deleted successfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error deleting todo: ", error);
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