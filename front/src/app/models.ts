export interface Album {
    id: number;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    parent_album: Album;
}

export interface Picture {
    id: number;
    path: string;
    album: Album;
}