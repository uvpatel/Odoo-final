declare module ".*css";

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