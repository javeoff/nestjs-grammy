import { Listener, On } from 'nestjs-grammy';
import { Ctx } from 'nestjs-grammy/dist/decorators/params/Context';

@Listener()
export class AppListener {
  @On('text')
  public onText(@Ctx() ctx: { reply(str: string): void }): void {
    console.log('123');
    ctx.reply('123');
  }
}
