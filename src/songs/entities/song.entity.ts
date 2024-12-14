import { Album } from "src/album/entities/album.entity";
import { Artist } from "src/artist/entities/artist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'songs'})
export class Song {

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:'varchar'})
    title:string

    @Column({type:'int'})
    duration:number


    @Column({type:'date'})
    realese_date:Date


    @Column({type:'varchar', nullable:true})
    genre:string

    @Column({type:'date'})
    created_at:Date

    @Column({type:'varchar'})
    file_path:string

    @Column({type:'date'})
    updated_at:Date

    @ManyToOne(() => Artist , (artist) => artist.songs, {nullable:false, onDelete:"CASCADE"})
    artist:Artist;

    @ManyToOne(()=> Album, (album)=> album.songs, {nullable:false, onDelete:"CASCADE"})
    album:Album;
}
