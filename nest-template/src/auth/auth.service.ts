import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SignInDto } from './dto';
import { AuthRepository } from './auth.repository';
import { JwtPayload } from './strategies/jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private usersRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { username } = signInDto;
    const userSignIn = await this.usersRepository.signIn(signInDto);

    if (userSignIn) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      this.logger.verbose(`User ${username} signed in`);

      return {
        accessToken,
      };
    }
    throw new UnauthorizedException('Username or Password Incorrect');
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { username } = createUserDto;
    try {
      await this.usersRepository.signUp(createUserDto);

      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      this.logger.verbose(`User ${username} signed up`);

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
