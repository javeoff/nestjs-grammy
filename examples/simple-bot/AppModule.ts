import { Module } from '@nestjs/common';
import { GrammyModule } from 'nestjs-grammy';

import { AppListener } from './AppListener';

@Module({
  providers: [AppListener],
  imports: [
    GrammyModule.forRoot({
      name: '123',
      token: '5595375934:AAHVrrOwNM9zGtKSPlrHdaH-4mvZqJxnHpo',
    }),
    AppListener,
  ],
})
export class AppModule {}
