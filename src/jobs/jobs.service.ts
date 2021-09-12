import { Injectable, NotFoundException } from '@nestjs/common';
import { Job } from './jobs.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobsService {
  jobs: Job[] = [];

  insertJob(clicks: number, name: string, permalink: string, media: string) {
    const jobId = uuidv4();
    const newJob = new Job(jobId, name, permalink, clicks, media);
    this.jobs.push(newJob);
    return jobId;
  }
  getJobs() {
    return [...this.jobs];
  }
  getSingleJob(jobPermalink: string) {
    const job = this.findJob(jobPermalink)[0];
    return { ...job };
  }

  private findJob(permalink: string): [Job, number] {
    const jobIndex = this.jobs.findIndex(
      jobPermalink => jobPermalink.permalink === permalink,
    );
    const job = this.jobs[jobIndex];
    if (!job) {
      throw new NotFoundException('Could not find job.');
    }
    return [job, jobIndex];
  }

  updateJob(
    id: string,
    name: string,
    permalink: string,
    clicks: number,
    media: string,
  ) {
    const [job, index] = this.findJob(id);
    const updatedJob = { ...job };
    if (name) {
      updatedJob.name = name;
    }
    if (permalink) {
      updatedJob.permalink = permalink;
    }
    if (clicks) {
      updatedJob.clicks = clicks;
    }
    if (media) {
      updatedJob.media = media;
    }
    this.jobs[index] = updatedJob;
  }

  deleteJob(id: string) {
    const index = this.findJob(id)[1];
    this.jobs.splice(index, 1);
  }
}
