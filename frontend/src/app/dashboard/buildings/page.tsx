'use client';

import { useEffect, useState } from 'react';
import { useDataStore } from '@/stores/useDataStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Building, Search } from 'lucide-react';

export default function BuildingsPage() {
  const { buildings, fetchBuildings, isLoading, error } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBuildings();
  }, [fetchBuildings]);

  const filteredBuildings = buildings.filter(
    (building) =>
      building.bName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.bAddr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building className="h-8 w-8" />
          Quản lý tòa nhà
        </h1>
        <p className="text-muted-foreground">Danh sách các tòa nhà trong hệ thống</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm tòa nhà..."
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
      ) : filteredBuildings.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Building className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Không có tòa nhà nào</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có dữ liệu tòa nhà'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBuildings.map((building) => (
            <Card key={building.bId} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {building.bName}
                </CardTitle>
                <CardDescription>ID: {building.bId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Địa chỉ:</p>
                  <p className="text-sm text-muted-foreground">{building.bAddr || 'Chưa có'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Mô tả:</p>
                  <p className="text-sm text-muted-foreground">{building.bDes || 'Chưa có'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
