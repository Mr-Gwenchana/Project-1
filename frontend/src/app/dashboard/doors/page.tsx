'use client';

import { useEffect, useState } from 'react';
import { useDataStore } from '@/stores/useDataStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DoorOpen, Search, Cpu } from 'lucide-react';

export default function DoorsPage() {
  const { doors, fetchDoors, isLoading, error } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoors();
  }, [fetchDoors]);

  const filteredDoors = doors.filter(
    (door) =>
      door.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      door.buildingName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      door.zoneInName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      door.zoneOutName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <DoorOpen className="h-8 w-8" />
          Quản lý cửa
        </h1>
        <p className="text-muted-foreground">Danh sách các cửa trong hệ thống</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm cửa..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      ) : filteredDoors.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <DoorOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Không có cửa nào</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có dữ liệu cửa'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoors.map((door) => (
            <Card key={door.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DoorOpen className="h-5 w-5" />
                    {door.name}
                  </span>
                  {door.devices?.length > 0 && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Cpu className="h-3 w-3" />
                      {door.devices.length}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>ID: {door.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Tòa nhà:</p>
                  <p className="text-sm text-muted-foreground">{door.buildingName || 'Chưa có'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Loại cửa:</p>
                  <p className="text-sm text-muted-foreground">{door.typeDescription || 'Chưa có'}</p>
                </div>
                {door.typeNote && (
                  <div>
                    <p className="text-sm font-medium">Ghi chú:</p>
                    <p className="text-sm text-muted-foreground">{door.typeNote}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Khu vào:</p>
                    <p className="text-sm">{door.zoneInName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Khu ra:</p>
                    <p className="text-sm">{door.zoneOutName || '-'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
