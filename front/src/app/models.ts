export class Album {
    id: number;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    parent_album: Album;

    constructor(id: number,
                name: string,
                start_date: Date,
                description?: string,
                end_date?: Date,
                parent_album?: Album) {
        this.id = id;
        this.name = name;
        this.start_date = start_date;
        this.description = description ? description : '';
        this.end_date = end_date ? end_date : null;
        this.parent_album = parent_album ? parent_album : null;
    }
}

export class Picture {
    id: number;
    path: string;
    album: Album;

    constructor(id: number,
                path: string,
                album: Album) {
        this.id = id;
        this.path = path;
        this.album = album;
    }
}