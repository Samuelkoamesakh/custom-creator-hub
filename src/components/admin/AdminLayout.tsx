import { useState, useEffect } from 'react';
import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, FolderOpen, FileText, Image, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BUSINESS_INFO } from '@/lib/data';

const ADMIN_KEY = 'cms_admin_logged_in';

export function useAdminAuth() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem(ADMIN_KEY) === 'true');
  const login = (pass: string) => {
    if (pass === 'admin123') {
      localStorage.setItem(ADMIN_KEY, 'true');
      setLoggedIn(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    localStorage.removeItem(ADMIN_KEY);
    setLoggedIn(false);
  };
  return { loggedIn, login, logout };
}

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Produk', href: '/admin/produk', icon: Package },
  { label: 'Kategori', href: '/admin/kategori', icon: FolderOpen },
  { label: 'Artikel', href: '/admin/artikel', icon: FileText },
  { label: 'Banner', href: '/admin/banner', icon: Image },
];

export default function AdminLayout() {
  const { loggedIn, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!loggedIn) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform transition-transform lg:translate-x-0 lg:relative ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-sidebar-border">
          <Link to="/admin" className="font-heading text-lg font-bold text-sidebar-foreground">{BUSINESS_INFO.name}</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-sidebar-foreground"><X size={20} /></button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarLinks.map(l => {
            const Icon = l.icon;
            const active = location.pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'}`}
              >
                <Icon size={18} /> {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </Button>
          <Link to="/" className="block text-xs text-sidebar-foreground/50 text-center mt-2 hover:underline">← Lihat Website</Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-foreground/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-card border-b border-border flex items-center px-4 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground"><Menu size={24} /></button>
          <h1 className="font-heading text-lg font-semibold text-foreground">CMS Dashboard</h1>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
