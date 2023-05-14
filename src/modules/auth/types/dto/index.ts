export interface ILoginParam {
  email: string;
  password: string;
}

export interface IKakaoProfile {
  provier: string;
  id: number;
  username: string;
  displayName: string;
  _raw: string;
  _json: IKakaoJson;
}

export interface IKakaoJson {
  id: number;
  connected_at: string;
  properties: IKakaoProperties;
  kakao_account: IKakaoAccount;
}

export interface IKakaoProperties {
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
}

export interface IKakaoAccount {
  profile_nickname_needs_agreement: boolean;
  profile_image_needs_agreement: boolean;
  profile: [IKakaoAccountProfile];
  has_email: boolean;
  email_needs_agreement: boolean;
  is_email_valid: boolean;
  is_email_verified: boolean;
  email: string;
}

export interface IKakaoAccountProfile {
  nickname: string;
  thumbnail_image_url: string;
  profile_image_url: string;
  is_default_image: boolean;
}
