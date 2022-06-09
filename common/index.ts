type SuccessResponse<T> = {
    email: string,
    time: string
    data: T
}

type ErrorResponse = {
    code: string
    msg: string,
}

export {SuccessResponse, ErrorResponse}