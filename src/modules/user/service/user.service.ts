import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AWS_S3_MANAGER_SERVICE } from 'src/modules/common/aws/s3/token';
import { IS3ManagerService } from 'src/modules/common/aws/s3/types';
import {
  USER_CREATE_REPOSITORY_TOKEN,
  USER_FIND_REPOSITORY_TOKEN,
} from '../token';
import { IUserCreateRepository } from '../types/repository/user-create.interface';
import { IUserFindRepository } from '../types/repository/user-find.interface';
import { IUserService } from '../types/service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_FIND_REPOSITORY_TOKEN)
    private readonly _userFindRepository: IUserFindRepository,

    @Inject(USER_CREATE_REPOSITORY_TOKEN)
    private readonly _userCreateRepository: IUserCreateRepository,

    @Inject(AWS_S3_MANAGER_SERVICE)
    private readonly _awsS3ManagerService: IS3ManagerService,
  ) {}

  async getPreSignedUrl(bucketPath: string) {
    return this._awsS3ManagerService.getPreSignedUrl(bucketPath);
  }

  async updateUserProfileImage(userId: number, bucketPath: string) {
    try {
      const user = await this._userFindRepository.findOne({
        select: ['id', 'profile_img'],
        where: {
          id: userId,
        },
      });
      if (!user) throw new Error(`id: ${userId} 유저를 찾을 수 없습니다.`);
      const { profile_img: before_profile_img } = user;
      if (before_profile_img) {
        // s3 버킷 삭제 로직
      }
      user.profile_img = bucketPath;
      return await this._userCreateRepository.save(user);
    } catch (err) {
      console.log(err);
      return new BadRequestException(err.message);
    }
  }
}
