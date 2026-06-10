import { UserProfileDto } from '../../user/dto/user-profile.dto';

export class AuthResponseDto {
  accessToken!: string;
  user!: UserProfileDto;
}
