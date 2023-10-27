import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto';
import { AuthRepository } from './auth.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username } = authCredentialsDto;
    const userSignIn = await this.usersRepository.signIn(authCredentialsDto);

    if (userSignIn) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);

      return {
        accessToken,
      };
    }
    throw new UnauthorizedException('Username or Password Incorrect');
  }

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username } = authCredentialsDto;
    try {
      await this.usersRepository.signUp(authCredentialsDto);

      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return {
        accessToken,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username Not Available');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
