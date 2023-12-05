export interface EnvInfo {
  host: string,
  imgHost?: string,
  appId?: string,
}
type EnvEnum = "dev" | "test" | "prod"
type EnvType = { [k in EnvEnum]: EnvInfo }

const envs: EnvType = {
  dev: {
    host: 'https://www.baidu.com',
    imgHost: 'https://www.baidu.com/imgs/',
    appId: '123123123123'
  },
  test: {
    host: "",
    imgHost: "",
    appId: ""
  },
  prod: {
    host: "",
    imgHost: "",
    appId: ""
  }
}
export function getEnvInfo(env: EnvEnum = "dev"): EnvInfo {
  return envs[env]
}
