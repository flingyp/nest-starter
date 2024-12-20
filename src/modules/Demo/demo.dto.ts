import { ApiProperty } from '@nestjs/swagger';

export class DemoDto {
  @ApiProperty({ example: '1', description: 'id' })
  id: string;

  @ApiProperty({ example: 'Demo', description: '昵称' })
  name: string;

  @ApiProperty({ example: 'Demo', description: '描述' })
  description: string;
}
