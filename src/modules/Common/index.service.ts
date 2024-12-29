import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OSS from 'ali-oss';

@Injectable()
export class CommonService {
  private client: any;

  constructor(private readonly configService: ConfigService) {
    // CHORE: 阿里云OSS配置后开启
    // const { endpoint, accessKeyId, accessKeySecret, bucket } = this.configService.get('oss');
    // this.client = new OSS({
    //   region: endpoint, // 你的OSS区域
    //   accessKeyId,
    //   accessKeySecret,
    //   bucket,
    // });
  }

  async uploadFileToOSS(localPath: string, ossPath: string) {
    let res;
    try {
      res = await this.client.put(ossPath, localPath);
      await this.client.putACL(ossPath, 'public-read'); // 设置为公共可读
    } catch (error) {
      console.log('error:', error);
    } finally {
      return res.url;
    }
  }
}
