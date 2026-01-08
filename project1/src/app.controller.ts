import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { NavisClientService } from './thirdparty/navis/navis-client/navis-client.service';
import { ThirdpartyService } from './thirdparty/thirdparty.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly thirdparty: ThirdpartyService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.starting();
  }

  @Get('buildings')
  async getBuildings(
    @Query('bId') bId?: string,
    @Query('name') name?: string,
    @Query('addr') addr?: string,
    @Query('page') page?: string,
  ) {
    const res = await this.thirdparty.navisClient.get('/api/buildings', {
      params: {
        ...(bId !== undefined ? { bId: Number(bId) } : {}),
        ...(name !== undefined ? { name } : {}),
        ...(addr !== undefined ? { addr } : {}),
        ...(page !== undefined ? { page: Number(page) } : {}),
      },
    });

    return (res.data.items ?? []).map((x: any) => ({
      bId: x.bId,
      bName: x.bName,
      bAddr: x.bAddr,
      bDes: x.bDes,
    }))
  }

  @Get('levels')
  async getLevels(
    @Query('bId') bId?: string,
    @Query('page') page?: string,
  ) {
    const res = await this.thirdparty.navisClient.get('/api/levels', {
      params: {
        ...(bId ? { bId: Number(bId) } : {}),
        ...(page ? { page: Number(page) } : {}),
      },
    });

    return (res.data.items ?? []).map((x: any) => ({
      lId: x.lId,
      bName: x.bName,
      lLv: x.lLv,
      lDes: x.lDes,
    }));

  }

  @Get('zones')
  async getZones(
    @Query('lId') lId?: string,
    @Query('bId') bId?: string,
    @Query('zoneName') zoneName?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    const res = await this.thirdparty.navisClient.get('/api/zones', {
      params: {
        ...(lId ? { lId: Number(lId) } : {}),
        ...(bId ? { bId: Number(bId) } : {}),
        ...(zoneName ? { zoneName } : {}),
        ...(page ? { page: Number(page) } : {}),
        ...(pageSize ? { pageSize: Number(pageSize) } : {}),
      },
    });

    return (res.data.items ?? []).map((x: any) => ({
      name: x.name,
      buildingName: x.buildingName,
      description: x.description,
      zoneCode: x.zoneCode
    }));

  }

  @Get('departments')
  async getDepartments(
    @Query('zId') zId?: string,
    @Query('bId') bId?: string,
    @Query('lId') lId?: string,
    @Query('pageSize') pageSize?: string,
    @Query('page') page?: string,
    @Query('departmentName') departmentName?: string,
  ) {
    const res = await this.thirdparty.navisClient.get('/api/departments', {
      params: {
        ...(zId ? { zId: Number(zId) } : {}),
        ...(bId ? { bId: Number(bId) } : {}),
        ...(lId ? { lId: Number(lId) } : {}),
        ...(pageSize ? { pageSize: Number(pageSize) } : {}),
        ...(page ? { page: Number(page) } : {}),
        ...(departmentName ? { departmentName } : {}),
      },
    });

    return (res.data.items ?? []).map((x: any) => ({
      id: x.id,
      name: x.name,
      zoneName: x.zoneName,
      building: x.building,
      havePath: x.havePath
    }));
  }

  @Get('doors')
  async getDoors() {
    const res = await this.thirdparty.navisClient.get('/api/doors');

    return (res.data.items ?? []).map((x: any) => ({
      id: x.id,
      name: x.name,
      buildingName: x.buildingName,
      typeDescription: x.typeDescription,
      typeNote: x.typeNote,
      zoneInName: x.zoneInName,
      zoneOutName: x.zoneOutName,
      devices: x.devices,
    }));
  }

  @Get('devices')
  async getDevices() {
    const res = await this.thirdparty.navisClient.get('/api/devices');

    return (res.data.items ?? []).map((x: any) => ({
      id: x.id,
      mac: x.mac,
      bName: x.bName,
      zone: x.zone,
      version: x.version,
      isFaceAuthen: x.isFaceAuthen,
      isFingerprintAuthen: x.isFingerprintAuthen,
      isIrisAuthen: x.isIrisAuthen,
      isIdCardAuthen: x.isIdCardAuthen,

      door: x.door
        ? {
          name: x.door.name,
          buildingId: x.door.buildingId,
        }
        : null,
    }));
  }
}
