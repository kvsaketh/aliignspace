"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  Menu,
  Users,
  Globe,
  Newspaper,
  Briefcase,
  PenTool,
  MessageSquare,
  HelpCircle,
  Trophy,
  Clock,
  Wrench,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Widget Builder", href: "/admin/builder", icon: PenTool },
  { name: "Pages", href: "/admin/pages", icon: FileText },
  { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { name: "Blog Posts", href: "/admin/posts", icon: Newspaper },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "Milestones", href: "/admin/milestones", icon: Trophy },
  { name: "Timeline", href: "/admin/timeline", icon: Clock },
  { name: "Services", href: "/admin/services", icon: Wrench },
  { name: "Media Library", href: "/admin/media", icon: Image },
  { name: "Menus", href: "/admin/menus", icon: Menu },
  { name: "Global Settings", href: "/admin/settings", icon: Globe },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "System", href: "/admin/system", icon: Settings },
  { name: "Aertsen Seed", href: "/admin/aertsen-seed", icon: Sparkles },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b">
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-serif font-medium">
                ALIIGNSPACE
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-terracotta-50 text-terracotta-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
            >
              <Globe className="w-4 h-4" />
              View Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
