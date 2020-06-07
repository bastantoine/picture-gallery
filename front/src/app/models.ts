import { formatDate } from "@angular/common";

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

    public format_start_end_date(): string {
        let format_year = 'yyyy';
        let format_month = 'MM';
        let format_day = 'dd';
        // So far only the en-US is supported, we'll see later for localization
        let locale = 'en-US';
        if(this.end_date === null || this.start_date === this.end_date) {
            // end_date not defined or exact same start and end date
            return formatDate(this.start_date, `${format_day}/${format_month}/${format_year}`, locale)
        }
        if(this.start_date.getFullYear() === this.end_date.getFullYear()) {
            // Same year
            if(this.start_date.getMonth() === this.end_date.getMonth()) {
                // Same month
                return formatDate(this.start_date,  format_day, locale)
                     + ' - '
                     + formatDate(this.end_date, format_day, locale)
                     + '/'
                     + formatDate(this.start_date, `${format_month}/${format_year}`, locale)
            } else {
                // Different month
                return formatDate(this.start_date, `${format_day}/${format_month}`, locale)
                     + ' - '
                     + formatDate(this.end_date, `${format_day}/${format_month}`, locale)
                     + '/'
                     + formatDate(this.start_date, format_year, locale)
            }
        } else {
            // Completely different dates
            return formatDate(this.start_date, `${format_day}/${format_month}/${format_year}`, locale)
                 + ' - '
                 + formatDate(this.start_date, `${format_day}/${format_month}/${format_year}`, locale)
        }
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