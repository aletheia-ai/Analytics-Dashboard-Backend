import { EmailService } from './email.service';
import { SendEmailDto, PasswordResetEmailDto } from '../presentations/dto/email';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    triggerPasswordReset(body: PasswordResetEmailDto): Promise<{
        success: boolean;
        message: string;
    }>;
    sendCustomEmail(body: SendEmailDto): Promise<{
        success: boolean;
        message: string;
    }>;
    healthCheck(): {
        service: string;
        status: string;
        timestamp: string;
        features: string[];
    };
    getStatus(): {
        configured: boolean;
        frontendUrl: string;
        mode: string;
    };
}
