import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {useRandomString} from '@flypeng/tool/browser'

import { CommonService } from './index.service';


@ApiTags('公共模块')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiOperation({ summary: 'Hello Common!' })
  @Get('hello')
  getHello(): string {
    return 'Hello Auth!';
  }


  @ApiOperation({ summary: '上传文件到OSS' })
  @Post('uploadToOSS')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFileToOSS(@UploadedFile() file: Express.Multer.File) {
    const filename = `${Date.now()}_${useRandomString(10, true)}_${file.originalname}`;
    const ossPath = `/${filename}`;
    // @ts-ignore
    const result = await this.commonService.uploadFileToOSS(file.buffer, ossPath);
    return {
      imgUrl: result,
    };
  }
}

