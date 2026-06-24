import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import PublicLayout from "@/components/layout/PublicLayout";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import BlogPage from "@/pages/BlogPage";
import ArticleDetailPage from "@/pages/ArticleDetailPage";
import ContactPage from "@/pages/ContactPage";
import InvoicePage from "@/pages/InvoicePage";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminCategoriesPage from "@/pages/admin/AdminCategoriesPage";
import AdminArticlesPage from "@/pages/admin/AdminArticlesPage";
import AdminBannerPage from "@/pages/admin/AdminBannerPage";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/katalog" element={<CatalogPage />} />
            <Route path="/katalog/:group" element={<CatalogPage />} />
            <Route path="/katalog/:group/:slug" element={<CatalogPage />} />
            <Route path="/produk/:id" element={<ProductDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticleDetailPage />} />
            <Route path="/kontak" element={<ContactPage />} />
          </Route>
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="produk" element={<AdminProductsPage />} />
            <Route path="kategori" element={<AdminCategoriesPage />} />
            <Route path="artikel" element={<AdminArticlesPage />} />
            <Route path="banner" element={<AdminBannerPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
