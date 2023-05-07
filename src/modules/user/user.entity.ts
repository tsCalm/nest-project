import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/base-entity';

@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false })
  password: string;

  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: 15, comment: '유저 이름' })
  name: string;

  @Column({ type: 'varchar', comment: '주소' })
  address: string;

  // @Column({ type: 'varchar', comment: '주소 상세' })
  // address_etc: string;

  @Column({ type: 'date', nullable: false }) // 추가
  birth: string;

  @Column({ type: 'varchar', length: '11', nullable: false, unique: true }) // 추가
  tel: string;
}
