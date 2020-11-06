
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsOptional, IsString, MaxLength, IsNotEmpty, MinLength } from "class-validator";
import { CrudValidationGroups } from "@nestjsx/crud";
const { CREATE, UPDATE } = CrudValidationGroups;
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() id: number;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @MinLength(3, { always: true })
  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  name: string;
}