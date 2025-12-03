import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendTestEmail(body: {
        to: string;
        name: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    triggerPasswordReset(body: {
        email: string;
        name: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    sendCustomEmail(body: {
        to: string;
        subject: string;
        template: string;
        data: any;
    }): Promise<{
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
