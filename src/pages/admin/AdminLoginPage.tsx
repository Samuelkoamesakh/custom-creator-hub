import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/data';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const { login, loggedIn } = useAdminAuth();
  const navigate = useNavigate();

  if (loggedIn) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success('Login berhasil!');
      navigate('/admin');
    } else {
      toast.error('Password salah!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="bg-card rounded-2xl p-8 shadow-card w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">{BUSINESS_INFO.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">CMS Admin Login</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Masukkan password admin" />
          </div>
          <Button type="submit" variant="hero" className="w-full">Login</Button>
          <p className="text-xs text-muted-foreground text-center">Default password: admin123</p>
        </form>
      </div>
    </div>
  );
}
