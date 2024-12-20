import { Injectable } from '@nestjs/common';
import { DemoDto } from './demo.dto';

@Injectable()
export class DemoService {
  private demos: DemoDto[] = [];

  create(demoDto: DemoDto) {
    this.demos.push(demoDto);
    return demoDto;
  }

  findAll() {
    return this.demos;
  }

  findOne(id: string) {
    return this.demos.find((demo) => demo.id === id);
  }

  update(demoDto: DemoDto) {
    const index = this.demos.findIndex((demo) => demo.id === demoDto.id);
    if (index > -1) {
      this.demos[index] = demoDto;
      return demoDto;
    }
    return null;
  }

  remove(id: string) {
    const index = this.demos.findIndex((demo) => demo.id === id);
    if (index > -1) {
      return this.demos.splice(index, 1);
    }
    return null;
  }
}
