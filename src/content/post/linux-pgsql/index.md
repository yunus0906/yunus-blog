---
title: CentOS8 安装 postgresql13 数据库完整步骤
publishDate: 2024-11-23 15:30:00
description: '在linux CentOS8 上安装 postgresql13 数据库的完整步骤'
tags:
  - postgresql
  - linux
heroImage: { src: './thumbnail.jpg', color: '#B4C6DA' }
language: '中文'
---


## 安装依赖包
列出可用的PostgreSQL模块流，请输入:
``` plaintext
$ dnf module list postgresql
```
输出结果, 可以看到有9.6, 10, 12, 13等版本, 每个流有两个配置文件：服务器和客户端。带有服务器配置文件的流 10 是默认的：
``` plaintext
Last metadata expiration check: 0:01:19 ago on Sat 23 Nov 2024 03:30:54 PM CST.
CentOS-8 - AppStream
Name                   Stream             Profiles                       Summary                                       
postgresql             9.6                client, server [d]             PostgreSQL server and client module           
postgresql             10 [d]             client, server [d]             PostgreSQL server and client module           
postgresql             12                 client, server [d]             PostgreSQL server and client module           
postgresql             13                 client, server [d]             PostgreSQL server and client module  

Hint: [d]efault, [e]nabled, [x]disabled, [i]nstalled
```
我这里安装最新版的13版本，所以选择13流：
``` plaintext
$ sudo dnf install @postgresql:13
```
输出, 输入Y 继续：
``` plaintext
Last metadata expiration check: 0:05:43 ago on Sat 23 Nov 2024 03:30:54 PM CST.
Dependencies resolved.
=======================================================================================================================
 Package                     Architecture     Version                                        Repository           Size
=======================================================================================================================
Installing group/module packages:
 postgresql-server           x86_64           13.5-1.module_el8.5.0+1062+8eba5f44            AppStream           5.6 M
Installing dependencies:
 libicu                      x86_64           60.3-2.el8_1                                   BaseOS              8.8 M
 libpq                       x86_64           13.3-1.el8_4                                   AppStream           197 k
 postgresql                  x86_64           13.5-1.module_el8.5.0+1062+8eba5f44            AppStream           1.5 M
Installing module profiles:
 postgresql/server                                                                                                    
Enabling module streams:
 postgresql                                   13                                                                      

Transaction Summary
=======================================================================================================================
Install  4 Packages

Total download size: 16 M
Installed size: 61 M
Is this ok [y/N]: 
```
提示`Complete`安装完成！
``` plaintext
Downloading Packages:
(1/4): libpq-13.3-1.el8_4.x86_64.rpm                                                   684 kB/s | 197 kB     00:00    
(2/4): postgresql-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64.rpm                       3.3 MB/s | 1.5 MB     00:00    
(3/4): libicu-60.3-2.el8_1.x86_64.rpm                                                   34 MB/s | 8.8 MB     00:00    
(4/4): postgresql-server-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64.rpm                8.1 MB/s | 5.6 MB     00:00    
-----------------------------------------------------------------------------------------------------------------------
Total                                                                                   23 MB/s |  16 MB     00:00     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                               1/1 
  Installing       : libpq-13.3-1.el8_4.x86_64                                                                     1/4 
  Installing       : postgresql-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64                                         2/4 
  Installing       : libicu-60.3-2.el8_1.x86_64                                                                    3/4 
  Running scriptlet: libicu-60.3-2.el8_1.x86_64                                                                    3/4 
  Running scriptlet: postgresql-server-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64                                  4/4 
  Installing       : postgresql-server-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64                                  4/4 
  Running scriptlet: postgresql-server-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64                                  4/4 
  Verifying        : libpq-13.3-1.el8_4.x86_64                                                                     1/4 
  Verifying        : postgresql-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64                                         2/4 
  Verifying        : postgresql-server-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64                                  3/4 
  Verifying        : libicu-60.3-2.el8_1.x86_64                                                                    4/4 

Installed:
  libicu-60.3-2.el8_1.x86_64                             libpq-13.3-1.el8_4.x86_64                                    
  postgresql-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64  postgresql-server-13.5-1.module_el8.5.0+1062+8eba5f44.x86_64 

Complete!
```
## 初始化数据库

安装完成后，使用下面命令初始化PostgreSQL数据库：
``` plaintext
$ sudo postgresql-setup --initdb --unit postgresql
```
提示初始化成功，配置文件就在`/var/lib/pgsql/data`里：
``` plaintext
 * Initializing database in '/var/lib/pgsql/data'
 * Initialized, logs are in /var/lib/pgsql/initdb_postgresql.log
```
启动 PostgreSQL 服务，并设置开机自启动
``` plaintext
$ sudo systemctl start postgresql
$ sudo systemctl enable postgresql
```

验证PostgreSQL是否启动成功：
``` plaintext
$ sudo systemctl status postgresql
```

输出以下信息说明数据库已经启动成功：
``` plaintext 
● postgresql.service - PostgreSQL database server
   Loaded: loaded (/usr/lib/systemd/system/postgresql.service; enabled; vendor preset: disabled)
   Active: active (running) since Sat 2024-11-23 15:58:36 CST; 1min 21s ago
 Main PID: 836388 (postmaster)
    Tasks: 8 (limit: 10836)
........
```

## 配置PostgreSQL

> PostgreSQL使用角色的概念处理数据库访问权限。一个角色可以代表一个数据库用户或一个数据库用户组。
>
> PostgreSQL支持多种认证方法。最常用的方法是:
> 
> - 信任 - 只要满足pg_hba.conf中定义的条件，一个角色可以在没有密码的情况下连接。
> 
> - 密码 - 一个角色可以通过提供一个密码来连接。密码可以存储为scram-sha-256、md5和密码（明文）。
> - Ident - 仅在TCP/IP连接上支持。它通过获取客户端的操作系统用户名来工作，并有一个可选的用户名映射。
> - Peer - 与Ident相同，但它只支持本地连接。
> 
> PostgreSQL客户端认证在名为pg_hba.conf的配置文件中定义。默认情况下，对于本地连接，
> 
> PostgreSQL被设置为使用对等认证方法。
>
当你安装PostgreSQL服务器时，会自动创建postgres用户。这个用户是PostgreSQL实例的超级用户。它等同于MySQL的根用户。你需要切换到该用户来管理数据库：
``` plaintext
$ sudo -i -u postgres
```
在 postgres 用户下，输入命令以进入 PostgreSQL 的命令行界面：
``` plaintext
$ psql
```
为 postgres 用户设置密码：
``` plaintext 
ALTER USER postgres PASSWORD 'root'; //密码设置复杂一点，这里演示密码为 root
```
``` plaintext 
#返回: ALTER ROLE
```
### 以下是初始化时常用命令
使用下面的命令创建一个新的PostgreSQL角色。
``` plaintext
CREATE USER yunus WITH PASSWORD 'root'; //密码设置复杂一点，这里演示密码为 root
```
创建一个新的数据库。
``` plaintext
CREATE DATABASE demoDB;
```
通过运行下面的查询，授予用户在数据库上的权限。
``` plaintext
GRANT ALL PRIVILEGES ON DATABASE demoDB TO yunus;
```

输入 \q 退出 PostgreSQL 命令行
``` plaintext
\q
```

退出 postgres 用户：
``` plaintext
$ exit
```

## 配置远程访问
> 默认情况下，PostgreSQL服务器只监听本地接口127.0.0.1。

要启用对PostgreSQL服务器的远程访问，请打开配置文件。
``` plaintext
$ sudo nano /var/lib/pgsql/data/postgresql.conf
```

找到下面这一行，并取消注释（即删除前面的#）：
``` plaintext
找到以下行：
#listen_addresses = 'localhost'
修改为：
listen_addresses = '*'
```

编辑 pg_hba.conf 文件，添加允许远程访问的客户端 IP 地址
``` plaintext
$ sudo vi /var/lib/pgsql/data/pg_hba.conf
```
在文件末尾添加以下内容（允许所有 IP 通过密码进行连接）：
``` plaintext 
host    all             all             0.0.0.0/0               md5
```

其他情况的例子：
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# The user jane can access all databases from all locations using an md5 password
host    all             jane            0.0.0.0/0                md5

# The user jane can access only the janedb database from all locations using an md5 password
host    janedb          jane            0.0.0.0/0                md5

# The user jane can access all databases from a trusted location (192.168.1.134) without a password
host    all             jane            192.168.1.134            trust
```

保存文件，然后用以下方法重启PostgreSQL服务。
``` plaintext
$ sudo systemctl restart postgresql
```
检查 PostgreSQL 版本
``` plaintext
$ psql --version
```

## Windows电脑 使用pgAdmin4 远程连接PostgreSQL
这里就不概述安装pgAdmin4了，直接看远程连接。

首先，如果你的服务器是云服务器，可能需要在在防火墙开放端口并且在安全组放行端口。

``` plaintext
$ firewall-cmd --zone=public --add-port=5432/tcp --permanent   //开放指定端口
$ netstat -ntlp   //查看端口号
$ firewall-cmd --reload   //重启防火墙
```

![20241123164816](http://blog.notd.cn/images/20241123164816.png)

配置完成后，打开pgAdmin4，点击注册服务器。

![20241123164303](http://blog.notd.cn/images/20241123164303.png)

输入服务器地址，端口号，用户名，密码，然后点击连接。

![20241123164416](http://blog.notd.cn/images/20241123164416.png)

## 遇到的问题：

1. 初始化失败：请使用 `sudo postgresql-setup --initdb --unit postgresql` 初始化
``` plaintext
$ sudo postgresql-setup initdb

WARNING: using obsoleted argument syntax, try --help
WARNING: arguments transformed to: postgresql-setup --initdb --unit postgresql
 * Initializing database in '/var/lib/pgsql/data'
 * Initialized, logs are in /var/lib/pgsql/initdb_postgresql.log
```
2. 已经初始化过一遍了，需要将`/var/lib/pgsql/data`里的文件删除。（最好备份一下）
``` plaintext
$ sudo postgresql-setup --initdb --unit postgresql
 * Initializing database in '/var/lib/pgsql/data'
ERROR: Data directory /var/lib/pgsql/data is not empty!
ERROR: Initializing database failed, possibly see /var/lib/pgsql/initdb_postgresql.log
```


## 参考资料

> [如何在CentOS 8上安装PostgreSQL](https://www.yfname.com/help/detail/300)
>
> [CentOS 8 上安装并启动 PostgreSQL 10.15](https://segmentfault.com/a/1190000045251900)