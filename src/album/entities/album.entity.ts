import { Song } from "src/songs/entities/song.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity({name:'albums'})
export class Album {

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:'varchar'})
    title:string

    @Column({type:'date'})
    release_date:Date

    @Column({type:'date'})
    created_at:Date

    @Column({type:'date'})
    updated_at:Date

    @OneToMany(()=>Song, (song)=> song.album)
    songs:Song[]
}
