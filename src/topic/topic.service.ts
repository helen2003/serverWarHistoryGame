import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TopicService {
    constructor(private prisma: PrismaService){}

    async create(input){

    }

    async findAll(){

    }
}
