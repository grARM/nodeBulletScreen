# 弹幕程序 nodeBulletScreen

### 项目分为两个部分：收发弹幕的服务程序和展示弹幕的chrome插件程序。
### 服务端程序在server文件夹、chrome插件程序在crx文件夹。


## 启动 
###  cd nodeBulletScreen/server/bulletScreenServer
###  DEBUG=bulletScreenServer npm start  默认端口8081

### 安装插件后刷新一个http页面（非https）点击插件按钮填写node服务的地址（IP ＋ 端口号）
### 点击开始，用手机扫描出现的二维码。
### 开始弹幕