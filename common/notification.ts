import {SuccessResponse} from "./index";

type Notification = {
    id?: number
    email: string,
    type: string,
    content: string,
    time?: string
}

type AccountNotificationResponse = SuccessResponse<{
    notifications: Notification[]
}>

export {Notification, AccountNotificationResponse}