'use client';

import { useEffect, useState } from 'react';
import { useDataStore } from '@/stores/useDataStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, CheckCircle, XCircle } from 'lucide-react';

export default function DepartmentsPage() {
  const { departments, fetchDepartments, isLoading, error } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.zoneName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.building?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          Quản lý phòng ban
        </h1>
        <p className="text-muted-foreground">Danh sách các phòng ban trong hệ thống</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm phòng ban..."
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
      ) : filteredDepartments.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Không có phòng ban nào</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có dữ liệu phòng ban'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDepartments.map((dept) => (
            <Card key={dept.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {dept.name}
                  </span>
                  <Badge variant={dept.havePath ? 'default' : 'secondary'}>
                    {dept.havePath ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Có đường đi
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> Chưa có đường đi
                      </span>
                    )}
                  </Badge>
                </CardTitle>
                <CardDescription>ID: {dept.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Khu vực:</p>
                  <p className="text-sm text-muted-foreground">{dept.zoneName || 'Chưa có'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tòa nhà:</p>
                  <p className="text-sm text-muted-foreground">{dept.building || 'Chưa có'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
