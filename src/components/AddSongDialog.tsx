
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMusic } from '../contexts/MusicContext';
import { Song } from '../types/music';

interface AddSongDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddSongDialog: React.FC<AddSongDialogProps> = ({ open, onOpenChange }) => {
  const { addSong } = useMusic();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
    genre: '',
    year: new Date().getFullYear(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addSong(formData);
    
    // Reset form
    setFormData({
      title: '',
      artist: '',
      album: '',
      duration: '',
      genre: '',
      year: new Date().getFullYear(),
    });
    
    onOpenChange(false);
  };

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your music library.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Song title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="artist">Artist *</Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) => handleChange('artist', e.target.value)}
                placeholder="Artist name"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="album">Album *</Label>
              <Input
                id="album"
                value={formData.album}
                onChange={(e) => handleChange('album', e.target.value)}
                placeholder="Album name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                placeholder="Music genre"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="3:45"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value))}
                placeholder="2023"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-bg hover:opacity-90">
              Add Song
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
