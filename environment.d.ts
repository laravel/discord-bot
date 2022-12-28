declare global {
    namespace NodeJs {
        interface ProcessEnv {
            BOT_TOKEN: string;
            GUILD_ID: string;
            ENVIRONMENT: "dev" | "debug" | "prod";
        }
    }
}

export {};
