  app使用技术
  react <br/>
  es6<br/>
  react-router  路由管理 <br/>
  history 路由历史管理<br/>
  less<br/>
  使用react-redex管理数据<br/>
  使用big.js进行四则运算<br/>
  使用axios 进行数据请求<br/>
  样式表规则：高度由px控制，大小由rem控制，使用flex布局



src--代码目录<br/>
  router.js  路由控制<br/>
  conf   常量<br/>
  page 文件目录<br/>
    home  首页<br/>
    list 今日委托<br/>
    next  更多<br/>
    track 高手追踪<br/>
    trade  交易页面<br/>
      <!-- buy  买入 <br> 这两个取消
      shell 卖出 <br> -->
      index.js   处理redux数据
      indexconters.js   逻辑及h5
    account  选手的详细信息<br/>
    track  我的订阅，高手追踪<br>
      listtop  我的订阅<br>
      tracklist 高手追踪入口
    rankinglist 高手追踪详细页<br>
    rule  规则说明
    
  公用文件<br/>
    info  通用的个人信息<br/>
    common 通用头部，尾部<br/>
    tradeList 交易记录<br/>
    trademodule 买入，卖出<br/>
    modal  模态对话框<br/>
    loading  loading组件<br/>
  
  app.js  入口文件<br/>
  app.less  通用样式表<br/>

  使用方法 
  下载后 首先 npm install  安装依赖
  开发 ==  npm start 启动本地服务 根目录写的是stock 所以需要这样访问 ip:port/stock
  正式 npm run build 打包编译  把build文件放到服务器上即可  需要指定地址

