declare module ".*css";

import "@clerk/nextjs/server";

export { };

declare global {
    interface CustomJwtSessionClaims {
        metadata?: {
            role?: string;
        };
        publicMetadata?: {
            role?: string;
        };
    }
}