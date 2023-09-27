export interface Artist {
  id?: number;
  name?: string;
  albumIds?: number[];
  bio?: string;
  albums?: any[];
}

export interface Album {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  review: string;
}