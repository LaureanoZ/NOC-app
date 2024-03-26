import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { cronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";


const filleSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDataSource(),
);


export class Server {

	public static start() {
		console.log('Server started...');
		cronService.createJob(
			'00 00 00 * * *',
			// '*/5 * * * * *', 
			() => {
				const url = ('https://google.com');
				new CheckService(
					filleSystemLogRepository,
					() => console.log(`${url} is ok`),
					(error) => console.log(error),
				).execute(url);
				// new CheckService().execute('http://localhost:3000');
			}	
		);
		
	}
}

