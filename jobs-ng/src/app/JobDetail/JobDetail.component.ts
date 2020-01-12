import { Component, OnInit } from "@angular/core";
import { Job } from "../_models/Jobs";
import { JobsService } from "../_services/jobs.service";
import { AuthService } from "../_services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-JobDetail",
  templateUrl: "./JobDetail.component.html",
  styleUrls: ["./JobDetail.component.css"]
})
export class JobDetailComponent implements OnInit {
  job: Job;
  id: number;
  isAppliedToJob = true;
  private sub: any;
  constructor(
    public jobService: JobsService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number
      this.jobService.fetchJob(this.id).subscribe((res: any) => {
        this.job = res;
      });
    });
    this.isApplied();
  }
  applyforJob() {
    this.jobService
      .applyforAJob({ userid: this.authService.currentUser.id, jobid: this.id })
      .subscribe();
    this.isAppliedToJob = true;
  }
  isApplied() {
    const token = localStorage.getItem('token');
    this.jobService
      .getUserJobs(this.authService.currentUser.id)
      .subscribe((res: any[]) => {
        const array = res[0];

        if (
          !token ||
          (array.userjobs &&
            array.userjobs.filter(el => el.jobId === this.id).length)
        ) {
          this.isAppliedToJob = true;
        } else {
          this.isAppliedToJob = false;
        }
      });
  }
}
