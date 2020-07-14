---
title: Hello World
date: "2020-07-08"
description: "Hello World"
tags: ["每日一醒",'DNS']
---
#### The first Hello-World
折腾了好几天， 
显示花时间把 Gatsby 的运行原理弄明白了个7788
之前用了很久也荒废了很久的的 `wang.today`  又拿了出来。

配置 DNS, Record 花了一天多， 一直没明白这套逻辑是怎么运转的， 就是 DNS 传播以及 Record里的配置这些。
要说单个拎出来， 那都能按照面试题的问法来回答个大概， 但是结合到一起去，然后刷不出来我配置的 `wang.today` 页面就懵逼了。 

> 大佬， 我问你一个问题以及我自己的琢磨的原因
  wang.today 这个域名， 
  你在你那里应该是可以访问的， 
  我在我手机的网上也是可以访问的，
  但是我在我家里面的网暂时不能访问， 
  我现在估计的原因应该是我配好了DNS 以及 record 以后， 
  DNS的传播， 还没有传播到我家里面的这个对应的网络上去。 
  大佬分析下， 估计是这个原因蛤？

我按照我自己的想法， 问了一下朋友。 在朋友还没回答之前，分别在 VPN， 手机， Mac use mobile's network 的模式下，尝试了几遍，
才确认， 上面就是整个 `wang.today` 无法访问的 原因。 

<center>  配一张能够解释各种 DNS 异常 造成的问题的图。</center> 

![image](https://too-zhuang-image-host.s3.ap-east-1.amazonaws.com/v2-bc5d35e3760818eaf8800e79bea983ee_1440w.jpg)


