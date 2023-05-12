// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

// class JwtConfig {
//   static getConfig(configService: ConfigService): JwtModuleOptions {
//     return {
//       secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
//       signOptions: {
//         expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
//       },
//     };
//   }
// }

// export const typeOrmConfigAsync: JwtModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (configService: ConfigService) =>
//     JwtConfig.getConfig(configService),
// };
