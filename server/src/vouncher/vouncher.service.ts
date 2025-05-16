import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vouncher } from 'src/entities/vouncher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VouncherService {
    constructor(
        @InjectRepository(Vouncher)
        private vouncherRepository:Repository<Vouncher>
    ){
        
    }
    async getVouncher(){
        return this.vouncherRepository.find()
    }
}
