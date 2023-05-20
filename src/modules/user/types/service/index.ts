import { User } from '../../user.entity';

export interface IUserService {
  getPreSignedUrl(bucketPath: string): Promise<string>;
  updateUserProfileImage(
    userId: number,
    bucketPath: string,
  ): Promise<Partial<User>>;
}
