import { CronJob } from "cron";

type CronTime = string | Date;
type onTick = () => void;

export class cronService {

  static createJob ( cronTime: CronTime, onTick: onTick ): CronJob {
		const job = new CronJob(cronTime, onTick);

			job.start();

			return job;
  }
}