---
title: Flex属性的深入浅出
date: "2019-12-12 23:15:18"
tags: ["切图小王子"]
---
 ### Flex 属性的深入浅出

 ```scss
  .demo {
  
  flex: none */\* value 'none' case \*/*
  
  flex: <'flex-grow'> */\* One value syntax, variation 1 \*/*
  
  flex: <'flex-basis'> */\* One value syntax, variation 2 \*/*
  
  flex: <'flex-grow'> <'flex-basis'> */\* Two values syntax, variation 1 \*/*
  
  flex: <'flex-grow'> <'flex-shrink'> */\* Two values syntax, variation 2 \*/*
  
  flex: <'flex-grow'> <'flex-shrink'> <'flex-basis'> */\* Three values syntax \*/*
  
  flex: inherit
  
  }
  ```

  

 起因是我很少用到felx的这个属性，但是**在日常的项目使用中， 竟然看到有队友会这样设置flex：**

 ` flex: 1 1 auto;`

 上面这个部分其实等同于： 

 ```scss
  .item {flex: auto;}
  .item {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: auto;
  	  }
  ```

 

 首先明确一点是， flex 是 flex-grow、flex-shrink、flex-basis的缩写。故其取值可以考虑以下情况：

 ```scss
  .item {flex: 2333 3222 234px;}
  
  .item {
      flex-grow: 2333;
      flex-shrink: 3222;
      flex-basis: 234px;
       }
  
  
  ```

 上面两个是相同的， 

  

 #### 好了， **知识盲区默默的显示出来了， 这三个含义我忘了**  

- flex-grow: 扩展比例
- flex-shrink: 收缩比例
- flex-basis: 伸缩基准值

  

犹豫， 夜晚被同事约着去吃了个宵夜，撸了下别人家的猫， 这部分的总结还没完成- ·hhhhh， 让我们改日再来完善吧

> Todo List:

- 1.  参考： https://juejin.im/post/59df7803f265da4325284df7

- 2.  https://segmentfault.com/q/1010000004080910/a-1020000004121373

- 3.  https://css-tricks.com/almanac/properties/f/flex/



再来一张苦大仇深的🐱吧

![](https://raw.githubusercontent.com/wangtoday/Picturebed/master/131576163674_.pic_hd.jpg) 

### LET'S SEE WHEN WILL I BACK TO THIS AND GET IT DONE

