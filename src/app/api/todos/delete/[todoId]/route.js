import { ObjectId } from "mongodb";
import { todos } from "@/services/mongo";

export async function POST(req, { params }) {
    const { todoId } = params; // Extract todoId from the URL parameters

    if (!todoId) {
        return new Response(JSON.stringify({ error: "Todo ID is required" }));
    }

    const result = await todos.deleteOne({ _id: new ObjectId(todoId) });

    return new Response(JSON.stringify({ message: "Todo deleted successfully" }));
}