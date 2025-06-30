
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Trash2 } from 'lucide-react';
import { Song } from '../types/music';
import { useAuth } from '../contexts/AuthContext';
import { useMusic } from '../contexts/MusicContext';

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { isAdmin } = useAuth();
  const { deleteSong } = useMusic();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      deleteSong(song.id);
    }
  };

  // Generate color based on genre
  const getGenreColor = (genre: string) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500', 
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500'
    ];
    const hash = genre.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getGenreColor(song.genre)} flex items-center justify-center shadow-lg`}>
              <Music className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">
                {song.title}
              </h3>
              <p className="text-gray-300 text-lg">{song.artist}</p>
            </div>
          </div>
          
          {isAdmin() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Album:</span>
            <span className="font-medium text-gray-200">{song.album}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Duration:</span>
            <span className="font-medium text-gray-200">{song.duration}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Year:</span>
            <span className="font-medium text-gray-200">{String(song.year)}</span>
          </div>
          
          <div className="flex justify-between items-center pt-3">
            <Badge variant="secondary" className={`text-xs bg-gradient-to-r ${getGenreColor(song.genre)} text-white border-0`}>
              {song.genre}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongCard;
