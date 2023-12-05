import { getEnvInfo } from "./env";
const envInfo = getEnvInfo('dev')
/**
 * HttpMethod 类型 api 处要用
 */
export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Options = "OPTIONS",
  Put = "PUT",
  Delete = "DELETE",
}

/**
 * 请求参数接口
 */
interface RequestConfig extends WechatMiniprogram.RequestOption {
  showMsg?: true,//显示错误信息
  auth?: Boolean,//是否需要鉴权
}

/**
 * 请求类
 */
class HttpRequest {
  private static instance: HttpRequest;
  private constructor() { };

  /**
   * 实例
   */
  public static getInstance(): HttpRequest {
    if (!this.instance) {
      this.instance = new HttpRequest()
    }
    return this.instance
  }

  /**
   * 请求
   * @param option 
   */
  private request<T>(option: RequestConfig): Promise<T> {
    let _this = this;
    return new Promise((resolve, reject) => {
      const { method, data, dataType } = option;
      let url = option.url;
      if (/^(http|https)\:\/\//.test(option.url)) {
        url = `${envInfo.host}${option.url}`
      }

      if (option.auth) {
        option.header = {
          "Authorization": "bearer token"
        }
      }
      wx.request({
        url, method, data, dataType,
        success(res: WechatMiniprogram.RequestSuccessCallbackResult) {
          const code = res.statusCode;
          const result = res.data as any;
          if (code === 200) {

            if (result.code == 200) {
              resolve(result.data)
            } else {

              //处理业务异常
              wx.showToast({
                title: result.msg,
                icon: "none"
              })

            }

          } else if (code === 401) {
            //一些登出提示
            reject({ code, msg: "登录超时", data })
          } else {
            const msg = _this.handleErrorStatus(code, option);
            reject({ code, msg, data })
          }
        },
        fail(err: WechatMiniprogram.RequestFailCallbackErr) {
          _this.handleError(err, option);
          reject(err);
        }
      })

    })
  }

  /**
   * 服务异常处理
   * @param statusCode 
   * @param option 
   */
  private handleErrorStatus(statusCode: number, option: RequestConfig) {
    let msg = "服务找不到";
    if (statusCode === 502 || statusCode === 503) {
      msg = "服务开小差了~"
    }
    if (option.showMsg) {
      wx.showToast({
        title: `${msg},错误码:${statusCode}`,
        icon: "none"
      })
    }
    return msg;
  }
  /**
   * 请求失败处理
   * @param err 
   * @param option 
   */
  private handleError(err: { errMsg: string }, option: RequestConfig): string {
    console.log(err, '异常请求');
    let msg = "请求异常";
    if (/timeout/.test(err.errMsg)) {
      msg = "请求超时"
    }
    if (option.showMsg) {
      wx.showToast({
        title: msg,
        icon: "none"
      })
    }
    return msg;
  }

  /**
   * Get 请求
   * @param url 
   * @param data 
   */
  public Get<T = any>(url: string, data?: any, otherOption?: RequestConfig): Promise<T> {
    return this.request<T>({ method: HttpMethod.Get, url, data, ...otherOption })
  }

  /**
   * Post 请求
   * @param url 
   * @param data 
   */
  public Post<T = any>(url: string, data?: any, otherOption?: RequestConfig): Promise<T> {
    return this.request<T>({ method: HttpMethod.Post, url, data, ...otherOption });
  }

  /**
   * Delete 请求
   * @param url 
   * @param data 
   */
  public Delete<T = any>(url: string, data?: any, otherOption?: RequestConfig): Promise<T> {
    return this.request<T>({ method: HttpMethod.Delete, url, data, ...otherOption })
  }

  /**
  * Put 请求
  * @param url 
  * @param data 
  */
  public Put<T = any>(url: string, data?: any, otherOption?: RequestConfig): Promise<T> {
    return this.request<T>({ method: HttpMethod.Put, url, data, ...otherOption });
  }

}

/**
 * 单例请求实例
 */
export const httpRequest = HttpRequest.getInstance()
