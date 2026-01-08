'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDataStore } from '@/stores/useDataStore';
import { Building, Layers, MapPin, Building2, DoorOpen, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const {
    buildings,
    levels,
    zones,
    departments,
    doors,
    devices,
    fetchBuildings,
    fetchLevels,
    fetchZones,
    fetchDepartments,
    fetchDoors,
    fetchDevices,
    isLoading,
  } = useDataStore();

  useEffect(() => {
    // Fetch all data on mount
    Promise.all([
      fetchBuildings(),
      fetchLevels(),
      fetchZones(),
      fetchDepartments(),
      fetchDoors(),
      fetchDevices(),
    ]);
  }, [fetchBuildings, fetchLevels, fetchZones, fetchDepartments, fetchDoors, fetchDevices]);

  const statCards = [
    {
      title: 'Tòa nhà',
      value: buildings.length,
      icon: Building,
      color: 'text-blue-600',
      href: '/dashboard/buildings',
    },
    {
      title: 'Tầng',
      value: levels.length,
      icon: Layers,
      color: 'text-indigo-600',
      href: '/dashboard/levels',
    },
    {
      title: 'Khu vực',
      value: zones.length,
      icon: MapPin,
      color: 'text-purple-600',
      href: '/dashboard/zones',
    },
    {
      title: 'Phòng ban',
      value: departments.length,
      icon: Building2,
      color: 'text-orange-600',
      href: '/dashboard/departments',
    },
    {
      title: 'Cửa',
      value: doors.length,
      icon: DoorOpen,
      color: 'text-red-600',
      href: '/dashboard/doors',
    },
    {
      title: 'Thiết bị',
      value: devices.length,
      icon: Cpu,
      color: 'text-cyan-600',
      href: '/dashboard/devices',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tổng quan</h1>
        <p className="text-muted-foreground">Thống kê hệ thống quản lý tòa nhà</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    Tổng số {stat.title.toLowerCase()} trong hệ thống
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thiết bị xác thực</CardTitle>
            <CardDescription>Thống kê phương thức xác thực</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Khuôn mặt</span>
                <span className="text-sm font-medium">
                  {devices.filter((d) => d.isFaceAuthen).length} thiết bị
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Vân tay</span>
                <span className="text-sm font-medium">
                  {devices.filter((d) => d.isFingerprintAuthen).length} thiết bị
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mống mắt</span>
                <span className="text-sm font-medium">
                  {devices.filter((d) => d.isIrisAuthen).length} thiết bị
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Thẻ ID</span>
                <span className="text-sm font-medium">
                  {devices.filter((d) => d.isIdCardAuthen).length} thiết bị
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trạng thái hệ thống</CardTitle>
            <CardDescription>Tình trạng kết nối</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Backend</span>
                <span className="text-sm font-medium text-green-600">Kết nối thành công</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dữ liệu</span>
                <span className="text-sm font-medium text-green-600">Đã đồng bộ</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
