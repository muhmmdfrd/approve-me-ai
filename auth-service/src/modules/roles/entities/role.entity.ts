import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('role', { schema: 'evote_db' })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @Column('int', { name: 'created_by', default: () => "'1'" })
  createdBy: number;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('int', { name: 'modified_by', default: () => "'1'" })
  modifiedBy: number;

  @Column('datetime', {
    name: 'modified_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @OneToMany(() => UserEntity, (userEntity) => userEntity.role)
  users: UserEntity[];
}
