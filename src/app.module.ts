import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { CvsModule } from './cvs/cvs.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    UsersModule,
    JobsModule,
    // MongooseModule.forRoot(
    //   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.byb3v.mongodb.net/a1-fachpersonal?retryWrites=true&w=majority`,
    // ),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    CvsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
