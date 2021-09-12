import { Module } from '@nestjs/common';
import { CvsController } from './cvs.controller';

@Module({
  controllers: [CvsController]
})
export class CvsModule {}
