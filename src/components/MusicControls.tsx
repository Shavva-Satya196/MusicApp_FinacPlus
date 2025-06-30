import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { useAuth } from '../contexts/AuthContext';
import { SortOptions, GroupByOption, Song } from '../types/music';
import AddSongDialog from './AddSongDialog';

const MusicControls: React.FC = () => {
  const { filters, sortOptions, groupBy, updateFilters, updateSort, updateGroupBy, getUniqueValues } = useMusic();
  const { isAdmin } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleSortChange = (field: string) => {
    const newSort: SortOptions = {
      field: field as keyof Song,
      direction: sortOptions.field === field && sortOptions.direction === 'asc' ? 'desc' : 'asc',
    };
    updateSort(newSort);
  };

  const clearFilters = () => {
    updateFilters({
      search: '',
      artist: '',
      album: '',
      genre: '',
    });
  };

  const uniqueArtists = getUniqueValues('artist');
  const uniqueAlbums = getUniqueValues('album');
  const uniqueGenres = getUniqueValues('genre');

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                placeholder="Search songs, artists, albums..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="min-w-32">
                <label className="block text-sm font-medium mb-2">Artist</label>
                <Select value={filters.artist} onValueChange={(value) => updateFilters({ artist: value === 'all' ? '' : value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Artists" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Artists</SelectItem>
                    {uniqueArtists.map(artist => (
                      <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-32">
                <label className="block text-sm font-medium mb-2">Album</label>
                <Select value={filters.album} onValueChange={(value) => updateFilters({ album: value === 'all' ? '' : value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Albums" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Albums</SelectItem>
                    {uniqueAlbums.map(album => (
                      <SelectItem key={album} value={album}>{album}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-32">
                <label className="block text-sm font-medium mb-2">Genre</label>
                <Select value={filters.genre} onValueChange={(value) => updateFilters({ genre: value === 'all' ? '' : value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {uniqueGenres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearFilters} size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
              
              {isAdmin() && (
                <Button onClick={() => setShowAddDialog(true)} size="sm" className="gradient-bg hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Song
                </Button>
              )}
            </div>
          </div>

          {/* Sort and Group Controls */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              {['title', 'artist', 'album', 'year'].map(field => (
                <Button
                  key={field}
                  variant={sortOptions.field === field ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSortChange(field)}
                  className="capitalize"
                >
                  {field}
                  {sortOptions.field === field && (
                    sortOptions.direction === 'asc' ? 
                    <ArrowUp className="w-3 h-3 ml-1" /> : 
                    <ArrowDown className="w-3 h-3 ml-1" />
                  )}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Group by:</span>
              <Select value={groupBy} onValueChange={(value) => updateGroupBy(value as GroupByOption)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="artist">Artist</SelectItem>
                  <SelectItem value="album">Album</SelectItem>
                  <SelectItem value="genre">Genre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddSongDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </>
  );
};

export default MusicControls;
