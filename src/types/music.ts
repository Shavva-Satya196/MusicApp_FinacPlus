
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  genre: string;
  year: number;
  coverUrl?: string;
}

export interface FilterOptions {
  search: string;
  artist: string;
  album: string;
  genre: string;
}

export interface SortOptions {
  field: keyof Song;
  direction: 'asc' | 'desc';
}

export type GroupByOption = 'none' | 'artist' | 'album' | 'genre';
