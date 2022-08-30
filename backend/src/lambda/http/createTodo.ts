import 'source-map-support/register'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import { createToDo } from '../../businessLogic/todos';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
// TODO: Implement creating a new TODO item
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];

    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const toDoItem = await createToDo(newTodo, jwtToken);

    return {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "item": toDoItem
        }),
    }
};
