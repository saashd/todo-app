import axios, {AxiosResponse} from "axios"

const baseUrl: string = "http://localhost:4000";

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getTodos = async (params = {today: false}): Promise<AxiosResponse<ApiDataType>> => {
    try {
        return await axios.get(
            baseUrl + "/todos", {params: params}
        )
    } catch (error: any) {
        throw new Error(error)
    }
};

export const addTodo = async (formData: ITodo): Promise<AxiosResponse<ApiDataType>> => {
    try {
        if (formData.day==='') {
            const d = new Date();
            formData.day = weekday[d.getDay()];
        }

        const todo: Omit<ITodo, "_id"> = {
            name: formData.name,
            description: formData.description,
            status:false,
            day: formData.day
        };
        return await axios.post(
            baseUrl + "/add-todo", todo)
    } catch (error: any) {
        throw new Error(error)
    }
};


export const updateTodo = async (
    todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        return await axios.put(
            `${baseUrl}/edit-todo/${todo._id}`,
            todo
        )
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteTodo = async (
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        return await axios.delete(
            `${baseUrl}/delete-todo/${_id}`
        )
    } catch (error: any) {
        throw new Error(error)
    }
};


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
