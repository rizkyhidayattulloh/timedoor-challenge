import { Body, Controller, Get, HttpCode, Post, Query, Render, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";
import { AuthService } from "src/modules/auth/auth.service";
import { LoginDto } from "src/modules/auth/dto/login.dto";
import { CookieAuthGuard } from "src/modules/auth/guard/cookie-auth.guard";
import { LoginWithCredentialGuard } from "src/modules/auth/guard/login-with-credential.guard";
import { OtpService } from "src/modules/otp/otp.service";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private otpService: OtpService
    ) { }

    @Get('login')
    @Render('web/auth/login')
    loginForm(@Req() req: any) {
        return {
            csrfToken: req.csrfToken()
        };
    }

    @Post('login-validate')
    loginValidate(@Body() body: LoginDto) {
        return { body };
    }

    @Post('login')
    @UseGuards(new LoginWithCredentialGuard())
    async login(@Req() request: RequestWithUser) {
        return {};
    }

    @Get('logout')
    @HttpCode(200)
    @UseGuards(CookieAuthGuard)
    async logout(@Req() request: RequestWithUser, @Res() response: Response) {
        request.logOut();
        request.session.cookie.maxAge = 0;

        return response.redirect('back');
    }

    @Get('register')
    @Render('web/auth/register')
    registerForm(@Req() req: any) {
        return {
            csrfToken: req.csrfToken()
        };
    }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        const user = await this.authService.register(body);

        await this.otpService.request(user);

        return {
            redirectUrl: '/register-success'
        };
    }

    @Get('register-success')
    @Render('web/auth/register-success')
    async registerSuccess() {
        return {}
    }

    @Get('email-verify')
    @Render('web/auth/email-verify')
    async verifyEmail(@Query('token') token: string) {
        await this.otpService.verify(token);

        return {};
    }
}