'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Building, 
  Layers, 
  MapPin, 
  Building2, 
  DoorOpen, 
  Cpu,
  LayoutDashboard 
} from 'lucide-react';

const menuItems = [
  {
    title: 'Tổng quan',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Tòa nhà',
    href: '/dashboard/buildings',
    icon: Building,
  },
  {
    title: 'Tầng',
    href: '/dashboard/levels',
    icon: Layers,
  },
  {
    title: 'Khu vực',
    href: '/dashboard/zones',
    icon: MapPin,
  },
  {
    title: 'Phòng ban',
    href: '/dashboard/departments',
    icon: Building2,
  },
  {
    title: 'Cửa',
    href: '/dashboard/doors',
    icon: DoorOpen,
  },
  {
    title: 'Thiết bị',
    href: '/dashboard/devices',
    icon: Cpu,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-background">
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
