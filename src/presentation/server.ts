import { cronService } from "./cron/cron-service";
import { CheckService } from "./domain/use-cases/checks/check-service";

export class Server {

	public static start() {
		console.log('Server started...');

		cronService.createJob(
			'*/5 * * * * *', 
			() => {
				new CheckService(
					() => console.log('success'),
					(error) => console.log(error),
				).execute('https://google.com');
				// new CheckService().execute('http://localhost:3000');
			}	
		);
		
	}
}

