import fs from 'fs'
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class FileSystemDataSource implements LogDataSource {

  private readonly logPath = 'logs/';
  private readonly allLogPath = 'logs/logs-all.log';
  private readonly mediumLogPath = 'logs/logs-medium.log';
  private readonly highLogPath = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    [
      this.allLogPath,
      this.mediumLogPath,
      this.highLogPath
    ].forEach(path => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, '');
    })
  }

  async saveLog(newLog: LogEntity): Promise<void> {

    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogPath, logAsJson);
    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogPath, logAsJson)
    } else {
      fs.appendFileSync(this.highLogPath, logAsJson)
    }
  }

  private getLogsFromFile = ( path:string ): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');
    const logs = content.split('\n').filter(Boolean).map(line => JSON.parse(line));
    return logs;
  }

  async getLogs(severyLevel: LogSeverityLevel): Promise<LogEntity[]> {

    switch (severyLevel) {
      case LogSeverityLevel.low:
        return [];
      case LogSeverityLevel.medium:
        return [];
      case LogSeverityLevel.high:
        return [];
      default:
        throw new Error ( `${ severyLevel } not implemented` )
    }

  }

}