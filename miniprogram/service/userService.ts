import { httpRequest } from "./request"
import { UserInfo } from "./types/userTypes";
class UserService {

  /**
   * User API 地址集合
   */
  private Urls = {
    getUserInfo: `123123`,
    getUserName: (id: string) => `sdkfjsdf${id}`
  }

  public GetUserInfo(data: { name: string }): Promise<UserInfo> {
    return httpRequest.Get<UserInfo>(this.Urls.getUserInfo, data);
  }

}
export const userService = new UserService()
