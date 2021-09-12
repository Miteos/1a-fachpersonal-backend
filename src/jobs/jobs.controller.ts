import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  addJobs(
    @Body('name') jname: string,
    @Body('permalink') jpermalink: string,
    @Body('media') jmedia: string,
    @Body('clicks') jclicks: number,
  ): any {
    const generatedId = this.jobsService.insertJob(
      jclicks,
      jname,
      jpermalink,
      jmedia,
    );
    return { id: generatedId };
  }
  @Get()
  getAllJobs() {
    return this.jobsService.getJobs();
  }

  @Get(':permalink')
  getJob(@Param('permalink') jobPermalink: string) {
    return this.jobsService.getSingleJob(jobPermalink);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') jobId: string,
    @Body('name') jobTitle: string,
    @Body('permalink') jobPermalink: string,
    @Body('clicks') jobClicks: number,
    @Body('media') jobMedia: string,
  ) {
    this.jobsService.updateJob(
      jobId,
      jobTitle,
      jobPermalink,
      jobClicks,
      jobMedia,
    );
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') jobId: string) {
    this.jobsService.deleteJob(jobId);
    return null;
  }
}
