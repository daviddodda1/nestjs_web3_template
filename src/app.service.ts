import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  async getHello(): Promise<string> {
    // const lastCommit: any = await getGitCommit();
    // const d = new Date(0);
    // eslint-disable-next-line @typescript-eslint/no-var-requires

    // d.setUTCSeconds(parseInt(lastCommit?.committedOn || 0));
    return `${this.configService.get('STAGE')} server is running ${
      process.pid
    }`;
  }
}
