
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { Music } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(username, password);
    
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-bg mb-4">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Music Library
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your personal music collection
          </p>
        </div>

        <Card className="glass-effect border-opacity-20">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your music library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full gradient-bg hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="text-sm text-center text-muted-foreground">
                Demo Accounts
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="text-xs"
                >
                  Admin Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('user')}
                  className="text-xs"
                >
                  User Demo
                </Button>
              </div>
              <div className="text-xs text-center text-muted-foreground">
                Admin: admin/admin123 | User: user/user123
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
