// src/email/email.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto, PasswordResetEmailDto } from '../presentations/dto/email';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * Trigger password reset email via API
   */
  @Post('password-reset')
  @HttpCode(HttpStatus.OK)
  async triggerPasswordReset(@Body() body: PasswordResetEmailDto) {
    try {
      const { email, name } = body;
      
      if (!email) {
        return {
          success: false,
          message: 'Email is required'
        };
      }

      // Generate a reset token (in real scenario, this would come from auth service)
      const resetToken = 'reset-token-' + Date.now();
      
      const sent = await this.emailService.sendPasswordResetEmail(email, name || 'User', resetToken);
      
      // Always return same message for security
      return {
        success: true,
        message: 'If the email exists, a reset link has been sent'
      };
    } catch (error) {
      console.error('Password reset email error:', error);
      return {
        success: true, // Still return success for security
        message: 'If the email exists, a reset link has been sent'
      };
    }
  }

  /**
   * Send custom email (for admin purposes)
   */
  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendCustomEmail(
    @Body() body: SendEmailDto
  ) {
    try {
      const { to, subject, template, data } = body;
      
      if (!to || !subject || !template) {
        return {
          success: false,
          message: 'To, subject, and template are required'
        };
      }
      
      return {
        success: true,
        message: 'Email would be sent (check console for details)'
      };
    } catch (error) {
      console.error('Custom email error:', error);
      return {
        success: false,
        message: 'Failed to send email'
      };
    }
  }

  /**
   * Health check endpoint
   */
  @Get('health')
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return {
      service: 'Email Service',
      status: 'operational',
      timestamp: new Date().toISOString(),
      features: ['password-reset', 'test-emails']
    };
  }

  /**
   * Get email service status
   */
  @Get('status')
  @HttpCode(HttpStatus.OK)
  getStatus() {
    return {
      configured: !!process.env.EMAIL_USER,
      frontendUrl: process.env.FRONTEND_URL || 'Not configured',
      mode: process.env.NODE_ENV || 'development'
    };
  }
}