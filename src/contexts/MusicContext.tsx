
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Song, FilterOptions, SortOptions, GroupByOption } from '../types/music';

// Mock data for demonstration
const INITIAL_SONGS: Song[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: '5:55',
    genre: 'Rock',
    year: 1975,
  },
  {
    id: '2',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: '6:30',
    genre: 'Rock',
    year: 1976,
  },
  {
    id: '3',
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    duration: '3:07',
    genre: 'Pop',
    year: 1971,
  },
  {
    id: '4',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    duration: '8:02',
    genre: 'Rock',
    year: 1971,
  },
  {
    id: '5',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    duration: '4:54',
    genre: 'Pop',
    year: 1982,
  },
  {
    id: '6',
    title: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    album: 'Highway 61 Revisited',
    duration: '6:13',
    genre: 'Folk Rock',
    year: 1965,
  },
  {
    id: '7',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    duration: '5:01',
    genre: 'Grunge',
    year: 1991,
  },
  {
    id: '8',
    title: 'What\'s Going On',
    artist: 'Marvin Gaye',
    album: 'What\'s Going On',
    duration: '3:53',
    genre: 'Soul',
    year: 1971,
  },
];

interface MusicContextType {
  songs: Song[];
  filteredSongs: Song[];
  filters: FilterOptions;
  sortOptions: SortOptions;
  groupBy: GroupByOption;
  addSong: (song: Omit<Song, 'id'>) => void;
  deleteSong: (id: string) => void;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  updateSort: (sort: SortOptions) => void;
  updateGroupBy: (groupBy: GroupByOption) => void;
  getUniqueValues: (field: keyof Song) => string[];
  getGroupedSongs: () => { [key: string]: Song[] };
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    artist: '',
    album: '',
    genre: '',
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'title',
    direction: 'asc',
  });
  const [groupBy, setGroupBy] = useState<GroupByOption>('none');

  // Filter songs based on current filters
  const filteredSongs = songs.filter(song => {
    const matchesSearch = !filters.search || 
      song.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      song.artist.toLowerCase().includes(filters.search.toLowerCase()) ||
      song.album.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesArtist = !filters.artist || song.artist === filters.artist;
    const matchesAlbum = !filters.album || song.album === filters.album;
    const matchesGenre = !filters.genre || song.genre === filters.genre;

    return matchesSearch && matchesArtist && matchesAlbum && matchesGenre;
  }).sort((a, b) => {
    const aValue = a[sortOptions.field];
    const bValue = b[sortOptions.field];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sortOptions.direction === 'asc' ? comparison : -comparison;
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      const comparison = aValue - bValue;
      return sortOptions.direction === 'asc' ? comparison : -comparison;
    }
    
    return 0;
  });

  const addSong = (songData: Omit<Song, 'id'>) => {
    const newSong: Song = {
      ...songData,
      id: Date.now().toString(),
    };
    setSongs(prev => [...prev, newSong]);
  };

  const deleteSong = (id: string) => {
    setSongs(prev => prev.filter(song => song.id !== id));
  };

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const updateSort = (sort: SortOptions) => {
    setSortOptions(sort);
  };

  const updateGroupBy = (newGroupBy: GroupByOption) => {
    setGroupBy(newGroupBy);
  };

  const getUniqueValues = (field: keyof Song): string[] => {
    const values = songs.map(song => String(song[field]));
    return [...new Set(values)].sort();
  };

  const getGroupedSongs = (): { [key: string]: Song[] } => {
    if (groupBy === 'none') {
      return { 'All Songs': filteredSongs };
    }

    return filteredSongs.reduce((groups, song) => {
      const key = String(song[groupBy]);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(song);
      return groups;
    }, {} as { [key: string]: Song[] });
  };

  const value: MusicContextType = {
    songs,
    filteredSongs,
    filters,
    sortOptions,
    groupBy,
    addSong,
    deleteSong,
    updateFilters,
    updateSort,
    updateGroupBy,
    getUniqueValues,
    getGroupedSongs,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
