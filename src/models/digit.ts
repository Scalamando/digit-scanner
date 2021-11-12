import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Digit {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	value!: number;

	@Column({ type: "bytea", nullable: false })
	image!: Buffer;
}
