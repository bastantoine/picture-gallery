export class Album {
    id: number;
    name: string;
    url: string;
    start_date: Date;
    description: string;
    end_date: Date;
    pictures: Picture[];
    thumbnail: Picture;

    constructor(
        id: number,
        name: string,
        url: string,
        start_date: Date,
        pictures: any[],
        description?: string,
        end_date?: Date) {
            this.id = id;
            this.name = name;
            this.url = url;
            this.start_date = new Date(start_date);
            this.description = description ? description : '';
            this.end_date = end_date ? new Date(end_date) : null;
            this.pictures = [];
            this.init_pictures(pictures);
            this.thumbnail = this.pictures[0];
        }

    private init_pictures(pictures_array: any[]): void {
        pictures_array.forEach(picture =>
            this.pictures.push(
                new Picture(
                    picture['id'],
                    picture['path'],
                    picture['album']
                )
            )
        )
    }
}

export class Picture {
    id: number;
    path: string;
    album: number;

    constructor(id: number,
                path: string,
                album: number) {
        this.id = id;
        this.path = path;
        this.album = album;
    }
}