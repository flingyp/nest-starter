import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

// 公共实体类
export abstract class BaseEntity {
  @CreateDateColumn({ name: 'created_time', comment: '创建日期' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_time', comment: '更新日期' })
  updatedAt: Date;
}
