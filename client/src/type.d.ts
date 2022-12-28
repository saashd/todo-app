interface ITodo {
    _id: string
    name: string
    description: string
    status: boolean
    day: string
    createdAt?: string
    updatedAt?: string
}

interface TodoProps {
    todo: ITodo
}

interface IUser {
    _id: string
    first_name: string
    last_name: string
    email: string
    password: string
    createdAt?: string
    updatedAt?: string
}

interface UserProps {
    user: IUser
}

type ApiDataType = {
    message: string
    status: string
    todo?: ITodo
    user?: IUser
}

