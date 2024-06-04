import { MongoClient, ObjectId } from "mongodb";

// MongoDB connection URI
const uri = "mongodb+srv://nika:learn_mongo_123@learn-mongo.8yatdc3.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo";

export async function POST(req, { params }) {
    const { todoId } = params; // Extract todoId from the URL parameters

    if (!todoId) {
        return new Response(JSON.stringify({ error: "Todo ID is required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const { completed } = await req.json(); // Extract the completion state from the request body

    if (typeof completed !== 'boolean') {
        return new Response(JSON.stringify({ error: "Completed status must be a boolean" }), {
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

        const result = await todos.updateOne(
            { _id: new ObjectId(todoId) },
            { $set: { completed: completed } }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: "Todo not found" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        // Return success response
        return new Response(JSON.stringify({ message: "Todo updated successfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error updating todo: ", error);
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