'use client';

import { useEffect, useState } from 'react';
import { useDataStore } from '@/stores/useDataStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Cpu, Search, Fingerprint, Eye, CreditCard, ScanFace } from 'lucide-react';

export default function DevicesPage() {
  const { devices, fetchDevices, isLoading, error } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const filteredDevices = devices.filter(
    (device) =>
      device.mac?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.bName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.zone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.door?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Cpu className="h-8 w-8" />
          Quản lý thiết bị
        </h1>
        <p className="text-muted-foreground">Danh sách các thiết bị trong hệ thống</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm thiết bị..."
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
      ) : filteredDevices.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Cpu className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Không có thiết bị nào</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có dữ liệu thiết bị'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDevices.map((device) => (
            <Card key={device.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    {device.mac}
                  </span>
                  <Badge variant="outline">v{device.version}</Badge>
                </CardTitle>
                <CardDescription>ID: {device.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Tòa nhà:</p>
                    <p className="text-sm text-muted-foreground">{device.bName || 'Chưa có'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Khu vực:</p>
                    <p className="text-sm text-muted-foreground">{device.zone || 'Chưa có'}</p>
                  </div>
                </div>

                {device.door && (
                  <div>
                    <p className="text-sm font-medium">Cửa:</p>
                    <p className="text-sm text-muted-foreground">{device.door.name}</p>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-2">Phương thức xác thực:</p>
                  <div className="flex flex-wrap gap-2">
                    {device.isFaceAuthen && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <ScanFace className="h-3 w-3" /> Khuôn mặt
                      </Badge>
                    )}
                    {device.isFingerprintAuthen && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Fingerprint className="h-3 w-3" /> Vân tay
                      </Badge>
                    )}
                    {device.isIrisAuthen && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> Mống mắt
                      </Badge>
                    )}
                    {device.isIdCardAuthen && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" /> Thẻ ID
                      </Badge>
                    )}
                    {!device.isFaceAuthen && !device.isFingerprintAuthen && !device.isIrisAuthen && !device.isIdCardAuthen && (
                      <span className="text-sm text-muted-foreground">Chưa cấu hình</span>
                    )}
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
