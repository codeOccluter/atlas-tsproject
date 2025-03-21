import { NextResponse } from "next/server"

interface ResponseOptions {
    status?: number
    statusText?: string
    headers?: HeadersInit
}

export enum ResponseStatusCode {
    SUCCESS_OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNATHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    RESOUCRE_CONFLICT = 409,
    INTERAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum ResponseStatusText {
    SUCCESS_OK = `response Success OK TEXT`,
    CREATED = `Created completed`,
    BAD_REQUEST = `Invalid request parameters`,
    UNATHORIZED = `Authentication required`,
    FORBIDDEN = `Access denied`,
    NOT_FOUND = `Resource not found`,
    RESOUCRE_CONFLICT = `Resource conflict`,
    INTERAL_SERVER_ERROR = `Interal server error`,
    SERVICE_UNAVAILABLE = `Service temporarily unavailable`,
}

const headers = {
    "Content-Type": "application/json",
    "X-Custom-Header": "foo"
}

export const formatResponse = {
    responseCreated(data: any, options: ResponseOptions = {}) {

        options.headers = headers

        return NextResponse.json(
            data,
            options
        )
    },

    responseSuccessOk(data: any, options: ResponseOptions) {

        options.headers = headers

        return NextResponse.json(
            data,
            options
        )
    },

    responseBadRequest(data: any, options: ResponseOptions) {

        options.headers = headers

        return NextResponse.json(
            data,
            options
        )
    },
}