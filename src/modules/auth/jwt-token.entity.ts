import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../common/base-entity';
import { GENERATE_JWT_TYPE } from './enum';

@Entity({
  name: 'jwt_token',
})
export class JwtToken extends BaseEntity {
  @Index()
  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  token: string;

  @Column({
    type: 'enum',
    enum: GENERATE_JWT_TYPE,
    default: GENERATE_JWT_TYPE.REFRESH,
  })
  type: string;
}
