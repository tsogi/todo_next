import { todos } from "@/services/mongo";

export async function POST(request) {
    // 1. Get "task" parameter from request
    const { task } = await request.json(); // {task: "new test task 124"}

    // 2. Store new todo in MongoDB
    const doc = { task: task }

    const result = await todos.insertOne(doc);
    // const result = await todos.delete({ id: 77 });

    // 3. Return response "Todo created successfully"
    return Response.json(result);
}