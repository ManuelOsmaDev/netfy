import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { SongsModule } from './songs/songs.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { LikesModule } from './likes/likes.module';
import { PlaylistsModule } from './playlists/playlists.module';

import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'admin',
      password:'root',
      database:'netfy',
      autoLoadEntities:true,
      synchronize:true,
      //logging:['query', 'error']
    }),
    UsersModule, 
    ArtistModule, 
    AlbumModule, 
    SongsModule, 
    SubscriptionsModule, 
    LikesModule, 
    PlaylistsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
