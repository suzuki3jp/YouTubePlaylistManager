export interface PageProps {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}
