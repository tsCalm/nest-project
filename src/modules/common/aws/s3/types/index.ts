export interface IS3ManagerService {
  getPreSignedUrl(fileName: string): Promise<string>;
}
