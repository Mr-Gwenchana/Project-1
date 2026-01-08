// Types khớp với dữ liệu trả về từ Backend NestJS

// Building - GET /api/buildings
export interface Building {
  bId: number;
  bName: string;
  bAddr: string;
  bDes: string;
}

// Level - GET /api/levels
export interface Level {
  lId: number;
  bName: string;
  lLv: number;
  lDes: string;
}

// Zone - GET /api/zones
export interface Zone {
  name: string;
  buildingName: string;
  description: string;
  zoneCode: string;
}

// Department - GET /api/departments
export interface Department {
  id: number;
  name: string;
  zoneName: string;
  building: string;
  havePath: boolean;
}

// Door - GET /api/doors
export interface Door {
  id: number;
  name: string;
  buildingName: string;
  typeDescription: string;
  typeNote: string;
  zoneInName: string;
  zoneOutName: string;
  devices: DeviceInfo[];
}

export interface DeviceInfo {
  id: number;
  name?: string;
}

// Device - GET /api/devices
export interface Device {
  id: number;
  mac: string;
  bName: string;
  zone: string;
  version: string;
  isFaceAuthen: boolean;
  isFingerprintAuthen: boolean;
  isIrisAuthen: boolean;
  isIdCardAuthen: boolean;
  door: {
    name: string;
    buildingId: number;
  } | null;
}

// Query params types
export interface BuildingQueryParams {
  bId?: number;
  name?: string;
  addr?: string;
  page?: number;
}

export interface LevelQueryParams {
  bId?: number;
  page?: number;
}

export interface ZoneQueryParams {
  lId?: number;
  bId?: number;
  zoneName?: string;
  page?: number;
  pageSize?: number;
}

export interface DepartmentQueryParams {
  zId?: number;
  bId?: number;
  lId?: number;
  pageSize?: number;
  page?: number;
  departmentName?: string;
}
