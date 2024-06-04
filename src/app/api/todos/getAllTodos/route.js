import { todos } from "@/services/mongo";

export async function GET() {
    const allTodos = await todos.find().toArray();
    
    return new Response(JSON.stringify(allTodos));
}