'use client';

import { useEffect, useState } from 'react';
import { useDataStore } from '@/stores/useDataStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search } from 'lucide-react';

export default function ZonesPage() {
  const { zones, fetchZones, isLoading, error } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  const filteredZones = zones.filter(
    (zone) =>
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.buildingName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.zoneCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MapPin className="h-8 w-8" />
          Quản lý khu vực
        </h1>
        <p className="text-muted-foreground">Danh sách các khu vực trong hệ thống</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm khu vực..."
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
      ) : filteredZones.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Không có khu vực nào</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có dữ liệu khu vực'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredZones.map((zone, index) => (
            <Card key={`${zone.zoneCode}-${index}`} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {zone.name}
                  </span>
                  {zone.zoneCode && (
                    <Badge variant="outline">{zone.zoneCode}</Badge>
                  )}
                </CardTitle>
                <CardDescription>Tòa nhà: {zone.buildingName || 'Chưa xác định'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-sm font-medium">Mô tả:</p>
                  <p className="text-sm text-muted-foreground">{zone.description || 'Chưa có'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
