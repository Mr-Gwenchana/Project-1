import { Injectable } from '@nestjs/common';
import { NavisClientService } from './navis/navis-client/navis-client.service';

@Injectable()
export class ThirdpartyService {
    constructor(public readonly navisClient: NavisClientService) { }
}
