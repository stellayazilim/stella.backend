import { ObjectId } from "mongoose";

export type JwtPayload = {
    sub: string;
    email: string;
}

export type JwtRefreshPayload = {
    sub: string;
    email: string;
    sessionId: string;
}