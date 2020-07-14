---
title: interview 随手记录
date: "2019-10-09 22:18:23"
tags: ["web"]
categories: readings
---


## hmtl， js， css， dom的关系和使用

#### html： 

作为网页的布局上的框架和基础。 用来编写网页的结构， 即网页的组成元素和各个元素之间的层级关系。

#### DOM:

使得js能够通过dom代码访问html的结构， 对html的元素结构直接进行干预。 通过对html的访问和操作，使得js的效果最终能够被施加于html上。 js 和 html本来是没有联系，两者之间都不能互相访问的， dom是作为两者沟通的桥梁。**js对html的单向作用**， *由于是操作html元素， 所以只能在html完全后起作用，只能写在body之后*。

##### 在html中使用JavaScript的方法：

1. 当前页面的书写， 就是直接把js代码写在html页面的任何地方

    > 包含在script标签元素内部的js代码将被从上到下依次解释。 解释器会解释一个函数的定义，然后将该定义保存在自己的环境当中。 在解释器对script元素内部的所有代码求值完毕以前，页面的其余内容都不会被浏览器加载或者现实

2. 外部引入方式， 用到了 script标签的 src属性， **需要注意的地方是 如果使用了src的这个属性， 那么script标签只会关注src指向的代码，而不会再去执行script标签内部（之间）的js代码**

3. *在当前html标签中书写js代码*， 这个我很少用到。 先放一下代码： 

   ```
   <a href="Javascript:alert('我就是不给你跳');">这个 a 链接不会跳转</a>
   <button type="button" onclick="javascript:document.location.href='http://www.baidu.com'">普通按钮也可以跳转</button>
   ```

##### Script标签的属性和JS代码的书写位置「more」

> 无论何种方式书写Js代码，只要不存在 defer 和 async的属性， 浏览器都会按照 script 元素在页面出现的先后顺序对他们一次进行解析。 换句话说在第一个script元素包含的代码解析完毕之后，第二个包含的代码才会被解析，然后是三， 四 这样的顺序。

**上面这个就涉及到了defer的属性， 相信在后面我们还会接触到的**

按照传统的做法，所有的 JavaScript 代码都需要书写在 `<head>` 标签当中，但是这样所有的 CSS 样式、JavaScript 脚本全部加载完成后，再加载 HTML 代码中的 body 部分，就会影响当前页面的加载速度，所以，推荐的书写 JavaScript 脚本的位置是在 body 的末尾部分，

##### script标签元素的属性

- async 表示应该立即下载脚本，但不应该妨碍页面中的其他操作
- defer 表示脚本可以延迟到文档完全被解析和显示之后再执行。

##### head标签的一点点涉猎

head标签包含了当前文档的元数据。 元数据的意思就是描述数据的数据，比如文档的标题，使用的字符集，关键字等信息。 这些信息并不会真正的被浏览器所渲染。 

但是head标签

1. 设定网站的样式
2. 加载和运行脚本
3. 为搜索引擎提供关键字，做seo
4. 设定viewport，告诉设备如何进行选软
5. dns-prefetch 提前对某些域名进行dns解析「预浏览」

**关于在head里面放置script和在body尾部方式script的页面处理流程问题**

![](https://raw.githubusercontent.com/wangtoday/Picturebed/master/bXbdNa.jpg)

![](https://raw.githubusercontent.com/wangtoday/Picturebed/master/IOZbCd.jpg)



defer 和 async这里的区别是， defer使用了以后， 仍然按照顺序来执行script，async就不会。

知乎有一个更深层次的介绍， 可以看一下， 关于head里标签的

[what‘s in your head](https://zhuanlan.zhihu.com/p/56920476)



------



### 三者之间关系的描述：

**DOM，浏览器，HTML，javasript，css之间的关系**可以理解成；一个画家(程序员)用画笔(javascript)画了个画(DOM),接着打印机（浏览器）打印，在打印过程中加上彩墨(css),最终一张漂亮好看的一张纸（html）就展示在大家面前

Dom和html之间的关系： 浏览器拿到dom这棵树，将其渲染成html

dom算是因，html算是果











