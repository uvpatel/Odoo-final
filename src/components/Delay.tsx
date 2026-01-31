export async function Delay({ children }: { children: React.ReactNode }) {
    await new Promise((resolve) => setTimeout(resolve, 2500)); // 2.5 sec
    return <>{children}</>;
}