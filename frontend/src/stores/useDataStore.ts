import { create } from 'zustand';
import {
  buildingsApi,
  levelsApi,
  zonesApi,
  departmentsApi,
  doorsApi,
  devicesApi,
} from '@/services/api';
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

interface DataState {
  // Data
  buildings: Building[];
  levels: Level[];
  zones: Zone[];
  departments: Department[];
  doors: Door[];
  devices: Device[];

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchBuildings: (params?: BuildingQueryParams) => Promise<void>;
  fetchLevels: (params?: LevelQueryParams) => Promise<void>;
  fetchZones: (params?: ZoneQueryParams) => Promise<void>;
  fetchDepartments: (params?: DepartmentQueryParams) => Promise<void>;
  fetchDoors: () => Promise<void>;
  fetchDevices: () => Promise<void>;
  clearError: () => void;
}

export const useDataStore = create<DataState>((set) => ({
  // Initial state
  buildings: [],
  levels: [],
  zones: [],
  departments: [],
  doors: [],
  devices: [],
  isLoading: false,
  error: null,

  // Actions
  fetchBuildings: async (params) => {
    try {
      set({ isLoading: true, error: null });
      const buildings = await buildingsApi.getAll(params);
      set({ buildings, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Lỗi tải dữ liệu tòa nhà';
      set({ error: message, isLoading: false });
    }
  },

  fetchLevels: async (params) => {
    try {
      set({ isLoading: true, error: null });
      const levels = await levelsApi.getAll(params);
      set({ levels, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Lỗi tải dữ liệu tầng';
      set({ error: message, isLoading: false });
    }
  },

  fetchZones: async (params) => {
    try {
      set({ isLoading: true, error: null });
      const zones = await zonesApi.getAll(params);
      set({ zones, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Lỗi tải dữ liệu khu vực';
      set({ error: message, isLoading: false });
    }
  },

  fetchDepartments: async (params) => {
    try {
      set({ isLoading: true, error: null });
      const departments = await departmentsApi.getAll(params);
      set({ departments, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Lỗi tải dữ liệu phòng ban';
      set({ error: message, isLoading: false });
    }
  },

  fetchDoors: async () => {
    try {
      set({ isLoading: true, error: null });
      const doors = await doorsApi.getAll();
      set({ doors, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Lỗi tải dữ liệu cửa';
      set({ error: message, isLoading: false });
    }
  },

  fetchDevices: async () => {
    try {
      set({ isLoading: true, error: null });
      const devices = await devicesApi.getAll();
      set({ devices, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Lỗi tải dữ liệu thiết bị';
      set({ error: message, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
