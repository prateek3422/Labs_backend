import { logger } from "./logger"

type AsyncHandlerResult<T> = {
    data: T | null
    error: Error | null
}

export async function asyncHandler<T>(function_: Promise<T>): Promise<AsyncHandlerResult<T>> {
    try {
        const data = await function_
        return { data, error: null }
    } catch (error_) {
        const error = error_ instanceof Error ? error_ : new Error(String(error_))
        logger.error(`Error occurred: ${error.message}`)
        return { data: null, error }
    }
}
