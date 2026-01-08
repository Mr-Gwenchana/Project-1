import apiClient from '@/lib/api-client';
import type {
  Building,
  Level,
  Zone,
  Department,
  Door,
  Device,
  BuildingQueryParams,
  LevelQueryParams,
  ZoneQueryParams,
  DepartmentQueryParams,
} from '@/types';

// Buildings API - GET /api/buildings
export const buildingsApi = {
  getAll: async (params?: BuildingQueryParams): Promise<Building[]> => {
    const response = await apiClient.get<Building[]>('/buildings', { params });
    return response.data;
  },
};

// Levels API - GET /api/levels
export const levelsApi = {
  getAll: async (params?: LevelQueryParams): Promise<Level[]> => {
    const response = await apiClient.get<Level[]>('/levels', { params });
    return response.data;
  },
};

// Zones API - GET /api/zones
export const zonesApi = {
  getAll: async (params?: ZoneQueryParams): Promise<Zone[]> => {
    const response = await apiClient.get<Zone[]>('/zones', { params });
    return response.data;
  },
};

// Departments API - GET /api/departments
export const departmentsApi = {
  getAll: async (params?: DepartmentQueryParams): Promise<Department[]> => {
    const response = await apiClient.get<Department[]>('/departments', { params });
    return response.data;
  },
};

// Doors API - GET /api/doors
export const doorsApi = {
  getAll: async (): Promise<Door[]> => {
    const response = await apiClient.get<Door[]>('/doors');
    return response.data;
  },
};

// Devices API - GET /api/devices
export const devicesApi = {
  getAll: async (): Promise<Device[]> => {
    const response = await apiClient.get<Device[]>('/devices');
    return response.data;
  },
};
