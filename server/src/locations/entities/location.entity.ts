import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("locations")
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  place_id: string;

  @Column()
  city: string;

  @Column("float")
  lat: number;

  @Column("float")
  lon: number;

  @ManyToMany(() => User, user => user.locations)
  users: User[];
}
