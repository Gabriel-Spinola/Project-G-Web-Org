export enum ModelsApiCode {
    Project = '0',
    Post = '1',
    Comment = '2',
}

export type ProjectModelProps = {
    id: string
    title: string;
    createdAt: string;
    description: string;
    images: string[];
}