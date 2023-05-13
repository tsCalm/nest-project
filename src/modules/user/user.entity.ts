import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { LOGIN_TYPE } from './enum';

@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: true, select: false })
  password: string;

  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: 15, comment: '유저 이름' })
  name: string;

  @Column({ type: 'varchar', comment: '주소', nullable: true })
  address: string;

  @Column({ type: 'enum', enum: LOGIN_TYPE, default: LOGIN_TYPE.LOCAL })
  login_type: string;

  @Column({ type: 'date', nullable: true }) // 추가
  birth: string;

  @Column({ type: 'varchar', length: '11', nullable: true, unique: true }) // 추가
  tel: string;
}
