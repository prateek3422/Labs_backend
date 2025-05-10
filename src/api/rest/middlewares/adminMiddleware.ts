import { AppNextFunction, AppRequest, AppResponse } from "@/types"


export const AdminMiddleware = (
    request: AppRequest,
    response: AppResponse,
    next: AppNextFunction
)=>{
    const user = request.user

  if (!user) {
      return next(new Error("unauthorized | user not found"))
  }


    if (user.role !== "ADMIN") {
       return next(new Error("unauthorized | admin only access"))
   }


    return next()
}