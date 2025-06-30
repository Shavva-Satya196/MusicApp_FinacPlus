
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Music, Album } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMusic } from '../contexts/MusicContext';
import MusicControls from './MusicControls';
import SongCard from './SongCard';

const MusicLibrary: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { filteredSongs, getGroupedSongs, groupBy } = useMusic();

  const groupedSongs = getGroupedSongs();
  const totalSongs = filteredSongs.length;
  const uniqueArtists = new Set(filteredSongs.map(song => song.artist)).size;
  const uniqueAlbums = new Set(filteredSongs.map(song => song.album)).size;

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Music Library
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.username}! Manage your music collection.
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <Badge variant={isAdmin() ? 'default' : 'secondary'} className="px-3 py-1">
              <User className="w-3 h-3 mr-1" />
              {user?.role.toUpperCase()}
            </Badge>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-effect border-opacity-20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Songs</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSongs}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-opacity-20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Artists</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueArtists}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-opacity-20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Albums</CardTitle>
              <Album className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueAlbums}</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <MusicControls />

        {/* Songs Grid */}
        <div className="space-y-8">
          {Object.entries(groupedSongs).map(([groupName, songs]) => (
            <div key={groupName}>
              {groupBy !== 'none' && (
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <div className="w-1 h-8 gradient-bg rounded-full"></div>
                  {groupName}
                  <Badge variant="outline" className="ml-2">
                    {songs.length} songs
                  </Badge>
                </h2>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {songs.map(song => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          ))}
          
          {totalSongs === 0 && (
            <div className="text-center py-12">
              <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No songs found</h3>
              <p className="text-muted-foreground">
                {isAdmin() ? 'Add some songs to get started!' : 'No songs match your current filters.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicLibrary;
