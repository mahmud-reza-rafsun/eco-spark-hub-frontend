import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
    clientPrefix: "NEXT_PUBLIC_",

    server: {
        API_URL: z.string().url(),
        BACKEND_URL: z.string().url(),
        FRONTEND_URL: z.string().url(),
        AUTH_URL: z.string().url(),
    },

    client: {
        NEXT_PUBLIC_BACKEND_URL: z.string().url(),
        NEXT_PUBLIC_TEST: z.string(),
    },

    runtimeEnv: {
        API_URL: process.env.API_URL,
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        AUTH_URL: process.env.AUTH_URL,
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
    },
});
