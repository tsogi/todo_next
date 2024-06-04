import { ObjectId } from "mongodb";
import { todos } from "@/services/mongo";

export async function POST(req, { params }) {
    const { todoId } = params; // Extract todoId from the URL parameters

    if (!todoId) {
        return new Response(JSON.stringify({ error: "Todo ID is required" }));
    }

    const { completed } = await req.json(); // Extract the completion state from the request body

    const result = await todos.updateOne(
        { _id: new ObjectId(todoId) },
        { $set: { completed: completed } }
    );

    return new Response(JSON.stringify({ message: "Todo updated successfully" }));
}