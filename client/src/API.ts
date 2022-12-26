import axios, {AxiosResponse} from "axios"

const baseUrl: string = "http://localhost:4000"



export const getTodos = async (params={today: false}): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            baseUrl + "/todos", {params: params}
        );
        return todos
    } catch (error: any) {
        throw new Error(error)
    }
}

export const addTodo = async (
    formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "_id"> = {
            name: formData.name,
            description: formData.description,
            status: false,
        };

        console.log(todo)

        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "/add-todo", todo);
        return saveTodo
    } catch (error: any) {
        throw new Error(error)
    }
}


export const updateTodo = async (
    todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, "status"> = {
            status: true,
        }
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/edit-todo/${todo._id}`,
            todoUpdate
        )
        return updatedTodo
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteTodo = async (
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/delete-todo/${_id}`
        )
        return deletedTodo
    } catch (error: any) {
        throw new Error(error)
    }
}


export const handleError = (error: any) => {
    if (error.response) { // get response with a status code not in range 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) { // no response
        console.log(error.request);
    } else { // Something wrong in setting up the request
        console.log('Error', error.message);
    }
    console.log(error.config);

};
