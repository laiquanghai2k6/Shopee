import { VouncherService } from './vouncher.service';
import { Controller, Get } from '@nestjs/common';

@Controller('vouncher')
export class VouncherController {
    constructor(
        private vouncherService:VouncherService
    ){

    }
    @Get('get-vouncher')
    GetVouncher(){
        return this.vouncherService.getVouncher()
    }
}
