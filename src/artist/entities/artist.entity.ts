import { Song } from "src/songs/entities/song.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'artist'})
export class Artist {

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:'varchar'})
    name:string

    @Column({type:'varchar'})
    bio:string

    @Column({type:'date'})
    created_at:Date

    @Column({type:'date'})
    updated_at:Date

    @OneToMany(()=>Song, (song)=> song.artist)
    songs:Song[]
}
