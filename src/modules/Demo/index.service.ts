import { Injectable } from '@nestjs/common';
import { DemoDto } from './index.dto';

@Injectable()
export class DemoService {
  private demos: DemoDto[] = [];

  getDemoList() {
    return this.demos;
  }

  getDemoById(id: string) {
    return this.demos.find((demo) => demo.id === id);
  }

  createDemo(demoDto: DemoDto) {
    this.demos.push(demoDto);
    return demoDto;
  }

  updateDemo(demoDto: DemoDto) {
    const index = this.demos.findIndex((demo) => demo.id === demoDto.id);
    if (index > -1) {
      this.demos[index] = demoDto;
      return demoDto;
    }
    return null;
  }

  deleteDemoById(id: string) {
    const index = this.demos.findIndex((demo) => demo.id === id);
    if (index > -1) {
      return this.demos.splice(index, 1);
    }
    return null;
  }
}
