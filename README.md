# 个人博客

## 技术栈：vue2+express+mysql+nginx

### 一、购买阿里云服务器(ECS) centos7.9

### 二、远程连接云服务器

进入远程服务器之后，建立一个新用户来进行之后的操作，避免一直使用 root 用户

```Bash
1.adduser Ru // 添加用户名Ru
2、passwd Ru  // 重新设置密码
3、whereis sudoers // 查询sudo权限者路径
4、chmod -v u+w /etc/sudoers // 给该路径下的sudoers者添加读写权限
5、vim /etc/sudoers // 编辑该文件，在里面添加sudoers，在root All=(ALL) ALL下面添加一行 Ru All=(ALL) ALL，就能保存了
```

退出 root 用户，切换刚刚添加的 Ru 用户

### 三、更换阿里的 yum 源且更新

1.备份原来的 yum 源

```Bash
#下面命令的意思是把 /etc/yum.repos.d/CentOS-Base.repo 这个原生的 yum 源文件复制并改名为 /etc/yum.repos.d/CentOS-Base.repo.bak
[root@CentOS7-dns-master ~]# sudo cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
```

2、下载阿里云的 yum 源文件并替换本地 yum 源文件

```Bash
[root@CentOS7-dns-master ~]# sudo curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
#这里也可以用 wget，推荐使用 curl 是因为有些最小化安装的 centos 默认不带 wget，上下两条命令选择一条即可
[root@CentOS7-dns-master ~]# sudo wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
#清理缓存
[root@CentOS7-dns-master ~]# sudo yum clean all
#生成新的缓存
[root@CentOS7-dns-master ~]# sudo yum makecache
```

3、添加 epel 源（如果已有就替换，操作同上）

```Bash
#查看一下系统是否已有 epel
[root@CentOS7-dns-master ~]# sudo rpm -qa |grep epel
#如果有的话先用下面的命令卸载以前的 epel 以免受影响
[root@CentOS7-dns-master ~]# sudo rpm -e epel-release
#下载阿里的 epel 源
[root@CentOS7-dns-master ~]# sudo wget -P /etc/yum.repos.d/ http://mirrors.aliyun.com/repo/epel-7.repo
#清理缓存
[root@CentOS7-dns-master ~]# sudo yum clean all
#生成新的缓存
[root@CentOS7-dns-master ~]# sudo yum makecache
```

注：替换 yum 和添加 epel 源并不会相互影响， EPEL (Extra Packages for Enterprise Linux) 是基于 Fedora 的一个项目，适用于 Enterprise Linux 的其他软件包，包括但不限于 Red Hat Enterprise Linux（RHEL），CentOS 和 Scientific Linux（SL），Oracle Linux（OL）。可以认为它是 yum 源中的一个比较优秀的扩展源

### 四、下载宝塔 linux 面板

```Bash
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

参考：[https://www.bt.cn/new/download.html](https://www.bt.cn/new/download.html)

下载好之后会有该面板的外网和内网 ip 地址以及登录的账号和密码

![](https://secure2.wostatic.cn/static/dJyz4QE5Qvir8b9ryHCwaf/bt.png?auth_key=1675159612-5SJb4ZRzKSxJQ7bCJC6Umq-0-a3d38e4da6b6bcced3a53b3738b5cae4)

### 五、安装项目依赖的环境

首先在安装之前需要去阿里云的安全组上开放 13822 端口以可以顺利登录宝塔面板，当我们登录成功后就在宝塔面板上的软件商店安装 nginx，mysql（对应的版本），PM2 管理器（里面已内置 nodejs 环境）。

### 六、部署前端项目

待安装完成之后, 这里也是先去阿里云安全组开放 80 端口，接着再打包 vue 项目并在宝塔上传到 /www/server/nginx/html 目录下，最后找到 nginx.conf 配置文件并进行编辑。

```text
server {
            listen 80;
            server_name 120.79.163.152;

            location / {
                index index.html index.htm;
                root /www/server/nginx/html/client;
            }

            location /blog-api {
                proxy_pass  http://127.0.0.1:3000/blog-api;
            }
        }
```

到这里前端项目就部署完了，可以访问一下服务器的 ip 地址（比如我的就是 120.79.163.152）出现页面了就说明成功了。

### 七、部署数据库 mysql

在部署之前，我们需要先去阿里云安全组开放 3306 端口，但现在还不能用，因为 linux 的防火墙并没有开放 3306 端口，所以我们还要在 linux 防火墙开放该端口。

**如果你是市面上一些流行的云服务器（如：阿里云或腾讯云）的用户，在系统**「防火墙」已经开放了相关的端口的情况下，任然无法正常连接端口，需要首先想到是否已经通过云服务器提供的「安全组配置规则」**开放了端口，避免一不留意掉入坑里！！！**

![](https://secure2.wostatic.cn/static/oP4uTrPnrnpfbVULC9DiAS/image.png?auth_key=1675159611-ae8Bo89LoyxE5yZDATQzT9-0-bf367edfebdaa83d3b44412ebfee4a93)

```Bash
# 防火墙常用命令

# 查看已开启的端口信息：
firewall-cmd --list-ports
# 查看防火墙状态，running代表正在运行：
firewall-cmd --state
# 停止命令
systemctl stop firewalld.service
# 启动命令
systemctl start firewalld.service
# 重启命令
systemctl restart firewalld.service

# 以开放3306端口为例
firewall-cmd --zone=public --add-port=3306/tcp --permanent
systemctl restart firewalld.service

```

接着我们就可以开始部署数据库了,如果你 linux 服务器上的 mysql 版本和你开发中用的版本一样，你可以在你的电脑上导出你的数据库.sql 文件（我是直接在 navicat 上导出)，接着你就在宝塔面板上直接导入你的.sql 文件(我想切换 mysql 版本时提示我的 linux 服务器 cpu 核数不支持 mysql8.0)。当然你也可以用 sql 命令来初始化你的数据库

```SQL
# 登录数据库
mysql -u root -p
# 新建一个数据库，库名尽量和你nodejs项目中连接数据库时的名字相同
create database blog;
# 产看所有数据库
show databases;
# 建表
use blog;
CREATE TABLE IF NOT EXISTS `blog_user`(
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `accountName` VARCHAR(40) NOT NULL,
   `password` VARCHAR(40) NOT NULL,,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 插入一条用户数据
mysql> INSERT INTO blog_user
    -> (name, accountName, password)
    -> VALUES
    -> ("张三", "test", "123456");

create table blog_article
create table article_label
...
```

### 八、部署后端 nodejs 项目

- 先在阿里云安全组和 Linux 防火墙开放你的 nodejs 项目运行端口，方法同上。
- 在宝塔的文件目录里添加 Node 项目资源，上传的时候去掉 node modules。
- npm i 安装依赖
- 安装好依赖，就可以打开 PM2 管理器，添加 Node 项目，让项目跑起来
- 在 nginx 中配置接口

```text
server
{
    location /blog-api {
        proxy_pass http://127.0.0.1:3000/blog-api;
    }
}
```
