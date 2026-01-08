'use client';

import { useEffect, useState } from 'react';
import { useDataStore } from '@/stores/useDataStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Layers, Search } from 'lucide-react';

export default function LevelsPage() {
  const { levels, fetchLevels, isLoading, error } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  const filteredLevels = levels.filter(
    (level) =>
      level.bName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.lDes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Layers className="h-8 w-8" />
          Quản lý tầng
        </h1>
        <p className="text-muted-foreground">Danh sách các tầng trong hệ thống</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm tầng..."
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
      ) : filteredLevels.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Layers className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Không có tầng nào</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có dữ liệu tầng'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLevels.map((level) => (
            <Card key={level.lId} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Tầng {level.lLv}
                </CardTitle>
                <CardDescription>ID: {level.lId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Tòa nhà:</p>
                  <p className="text-sm text-muted-foreground">{level.bName || 'Chưa có'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Mô tả:</p>
                  <p className="text-sm text-muted-foreground">{level.lDes || 'Chưa có'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
