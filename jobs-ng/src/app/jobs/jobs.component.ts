import { Component, OnInit } from '@angular/core';
import { JobsService } from '../_services/jobs.service';
import { Job } from '../_models/Jobs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  constructor(public jobService: JobsService) { }

  ngOnInit() {
    this.jobService.fetchJobs().subscribe((res: any) => {
     this.jobs = res;
     console.log (this.jobs);
    }, error => {
      console.log(error);
    });
  }

}
