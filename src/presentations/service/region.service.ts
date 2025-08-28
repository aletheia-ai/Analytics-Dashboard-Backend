// region.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Region } from '@utils/types/region-type';

@Injectable()
export class RegionService implements OnModuleInit {
  private readonly logger = new Logger(RegionService.name);

  constructor(@InjectModel('Region') private readonly regionModel: Model<Region>) {}

  async onModuleInit() {
    const count = await this.regionModel.estimatedDocumentCount();
    if (count === 0) {
      this.logger.log('Seeding AWS regions...');
      await this.regionModel.insertMany(this.getAwsRegions());
      this.logger.log('Regions seeded successfully.');
    } else {
      this.logger.log('Regions already exist, skipping seeding.');
    }
  }

  private getAwsRegions() {
    return [
      { regionId: 1, name: 'us-east-1' },
      { regionId: 2, name: 'us-west-1' },
      { regionId: 3, name: 'us-west-2' },
      { regionId: 4, name: 'eu-west-1' },
      { regionId: 5, name: 'eu-central-1' },
      { regionId: 6, name: 'ap-south-1' },
      { regionId: 7, name: 'ap-northeast-1' },
      { regionId: 8, name: 'ap-southeast-1' },
      { regionId: 9, name: 'ap-southeast-2' },
      { regionId: 10, name: 'sa-east-1' },
    ];
  }

  async getAllRegions(): Promise<
    { success: false; error: number } | { success: true; data: Region[] }
  > {
    try {
      const regions = await this.regionModel.find().exec();
      if (!regions || regions.length === 0) {
        return { success: false, error: 404 };
      } else {
        return { success: true, data: regions };
      }
    } catch {
      return { success: false, error: 500 };
    }
  }
}
