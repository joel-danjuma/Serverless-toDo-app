import { TodosAccess } from '../dataLayer/todosAccess'
import {parseUserId} from "../auth/utils";
import { TodoItem } from '../models/TodoItem';
import {TodoUpdate} from "../models/TodoUpdate";
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';


// TODO: Implement businessLogic
const uuidv4 = require('uuid/v4');
const toDoAccess = new TodosAccess();

export async function getTodos(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken);
    return toDoAccess.getTodos(userId);
}

export function createToDo(createTodoRequest: CreateTodoRequest, jwtToken: string): Promise<TodoItem> {
    const userId = parseUserId(jwtToken);
    const todoId =  uuidv4();
    const s3BucketName = process.env.TODOS_S3_BUCKET;

    return toDoAccess.createToDo({
        userId: userId,
        todoId: todoId,
        attachmentUrl:  `https://${s3BucketName}.s3.amazonaws.com/${todoId}`,
        createdAt: new Date().getTime().toString(),
        done: false,
        ...createTodoRequest,
    });
}

export function updateToDo(updateTodoRequest: UpdateTodoRequest, todoId: string, jwtToken: string): Promise<TodoUpdate> {
    const userId = parseUserId(jwtToken);
    return toDoAccess.updateToDo(updateTodoRequest, todoId, userId);
}

export function deleteToDo(todoId: string, jwtToken: string): Promise<string> {
    const userId = parseUserId(jwtToken);
    return toDoAccess.deleteToDo(todoId, userId);
}

export function generateUploadUrl(todoId: string): Promise<string> {
    return toDoAccess.generateUploadUrl(todoId);
}
