import * as yaml from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';
import { INestApplication, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AppConfig {
  application: {
    port: number;
  };
}

export default async () => {
  const env = process.env.NODE_ENV || 'development';
  const configFilePath = join(process.cwd(), `${env}.yaml`);
  const yamlFileContent = await readFileSync(configFilePath, {
    encoding: 'utf-8',
  });

  const envConfig = yaml.load(yamlFileContent) as AppConfig;
  console.log('envConfig:', envConfig);

  return envConfig;
};

export const initApplication = async (app: INestApplication, configService: ConfigService) => {
  const APPLICATION_PREFIX = configService.get<string>('application.prefix');

  // 设置全局路由前缀
  app.setGlobalPrefix(APPLICATION_PREFIX ?? '');

  /**
   * 设置 API 多版本控制 - Header版本类型
   * 参考文档：https://docs.nestjs.cn/10/techniques?id=api-%e5%a4%9a%e7%89%88%e6%9c%ac
   */
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-API-VERSION',
    defaultVersion: VERSION_NEUTRAL,
  });
};