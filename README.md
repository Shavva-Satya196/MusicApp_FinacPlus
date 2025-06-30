
# Music Library App - Micro Frontend Architecture

A modern React application showcasing micro frontend architecture, role-based authentication, and advanced music library management features.

## 🎵 Features

### Core Functionality
- **Music Library Management**: View, filter, sort, and group songs
- **Role-Based Authentication**: Admin (CRUD operations) vs User (read-only)
- **Advanced Filtering**: Search by title, artist, album with real-time results
- **Multiple Sort Options**: Sort by title, artist, album, or year (ascending/descending)
- **Dynamic Grouping**: Group songs by artist, album, or genre
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Authentication System
- **Mock JWT Implementation**: In-memory token management
- **Two User Roles**:
  - **Admin**: Can add, delete, and manage songs
  - **User**: Can only view and filter the library
- **Persistent Sessions**: Login state preserved in localStorage

### UI/UX Features
- **Modern Design**: Glassmorphism effects with purple/blue gradient theme
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Clean Interface**: Card-based layout with intuitive controls
- **Real-time Statistics**: Live counts of songs, artists, and albums

## 🚀 Demo Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Permissions**: Full CRUD access (add/delete songs)

### User Account
- **Username**: `user`
- **Password**: `user123`
- **Permissions**: Read-only access (view/filter only)

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gradients
- **Components**: shadcn/ui component library
- **Icons**: Lucide React
- **State Management**: React Context API + useReducer
- **Build Tool**: Vite
- **Authentication**: Mock JWT with localStorage persistence

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd music-library-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
```

## 🏗️ Micro Frontend Architecture

### Current Implementation
This version demonstrates the foundation for micro frontend architecture:

- **Modular Component Structure**: Components are organized for easy extraction
- **Context-Based State Management**: Isolated state management systems
- **Reusable Components**: Easily portable components across different apps

### Future Micro Frontend Setup
To implement full micro frontend architecture with Module Federation:

1. **Split into two applications**:
   - **Shell App**: Main container with authentication and routing
   - **Music Library MFE**: Standalone music management module

2. **Webpack Module Federation Configuration**:
   ```javascript
   // Music Library (Remote)
   new ModuleFederationPlugin({
     name: 'musicLibrary',
     filename: 'remoteEntry.js',
     exposes: {
       './MusicLibrary': './src/components/MusicLibrary',
     },
   })

   // Shell App (Host)
   new ModuleFederationPlugin({
     name: 'shell',
     remotes: {
       musicLibrary: 'musicLibrary@http://localhost:3001/remoteEntry.js',
     },
   })
   ```

## 🔐 Authentication System

### JWT Mock Implementation
- **Token Generation**: Base64 encoded payload with expiration
- **Role Management**: Admin vs User permissions
- **Session Persistence**: localStorage for cross-session persistence
- **Token Validation**: Automatic expiration checking

### Security Features
- **Route Protection**: Authentication required for library access
- **Role-Based UI**: Different interfaces based on user permissions
- **Session Timeout**: Automatic logout on token expiration

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) to Blue (#3B82F6) gradients
- **Glass Effects**: Semi-transparent backgrounds with blur
- **Hover States**: Smooth transitions and scale effects

### Components
- **Cards**: Glassmorphism effect with subtle borders
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Clean inputs with proper validation states

## 📚 JavaScript Methods Demonstration

### Array Methods Usage
- **map()**: Rendering song lists and dropdown options
- **filter()**: Real-time search and filtering functionality
- **reduce()**: Grouping songs by different criteria
- **sort()**: Multiple sorting options with direction control

### Example Implementation
```javascript
// Filtering with multiple criteria
const filteredSongs = songs.filter(song => {
  const matchesSearch = song.title.toLowerCase().includes(search.toLowerCase());
  const matchesArtist = !filterArtist || song.artist === filterArtist;
  return matchesSearch && matchesArtist;
});

// Grouping songs by category
const groupedSongs = songs.reduce((groups, song) => {
  const key = song[groupBy];
  if (!groups[key]) groups[key] = [];
  groups[key].push(song);
  return groups;
}, {});
```

## 🚀 Deployment

### Recommended Platforms
- **Vercel**: Automatic deployments with GitHub integration
- **Netlify**: Simple drag-and-drop deployment
- **GitHub Pages**: Free hosting for static sites

### Deployment Steps
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your chosen platform
3. Configure environment variables if needed

## 🔄 Future Enhancements

### Micro Frontend Features
- [ ] Webpack Module Federation setup
- [ ] Independent deployment pipelines
- [ ] Cross-app communication
- [ ] Shared component library

### Additional Features
- [ ] Real backend integration
- [ ] File upload for music files
- [ ] Playlist management
- [ ] Search history
- [ ] Export/import functionality

## 🧪 Testing

The application includes comprehensive error handling and user feedback:
- Form validation with clear error messages
- Loading states for async operations
- Confirmation dialogs for destructive actions
- Graceful fallbacks for empty states

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Note**: This implementation demonstrates the architectural patterns and components needed for a micro frontend system, with the full Module Federation setup ready for implementation in the next phase.
