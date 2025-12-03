// src/email/email.module.ts
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailController } from './email.controller';
import { Email,UserEmail ,EmailSchema ,UserEmailSchema} from './email.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    
    // ✅ Mailer Module Configuration
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        // Transport configuration (Gmail SMTP)
        transport: {
          service: 'gmail',
          auth: {
            user: config.get<string>('EMAIL_USER'),
            pass: config.get<string>('EMAIL_PASS'),
          },
        },
        
        // Default sender
        defaults: {
          from: `"Aletheia" <${config.get<string>('EMAIL_USER')}>`,
        },
        
        // Template configuration
        template: {
       dir: join(process.cwd(), 'src/email/email-templates'), // absolute from project root
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    
   
    MongooseModule.forFeature([
      { name: 'Email', schema: EmailSchema },
      { name: 'UserEmail', schema: UserEmailSchema }
    ]),
    
    
    ScheduleModule.forRoot(),
  ],
  
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService], 
})
export class EmailModule {}