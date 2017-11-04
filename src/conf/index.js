//全局常量

//入口目录
export const URL_PATH = "/stock";

// 用户si = id

export const DEFAULT_SESSION_ID = 40;//"1mm5806tffyda1f9cus0h4rjzt"; //40 用户id 1eotpzlc9ws3m1nu2qbwtnlwqq
//账户fid = 22
export const FID_NUM = 22;

export const HOST = "long.86luck.com";//sanqi.86luck.com
//http url
export const HTTP_URL = "http://"+HOST+"/tradeweb/tradeHttpServlet";//"http://sanqi.86luck.com/tradeweb/tradeHttpServlet";
// websocket url
export const WEBSOCKED_URL ="ws://"+HOST+"/tradeweb/tradeWebSocketServlet?hs_sid_t="+DEFAULT_SESSION_ID;// 

//心跳时间
export const TIMER_INTERVAL = 60*1000;