---
title: js面向对象程序设计「红宝书」笔记
date: "2019-10-09 22:18:23"
tags: ["web"]
---

### 正式开始准备面试了

> 时间大概是3:00 pm

先看一个小时的书，平复一下心情💢。



## 对象

### 工厂模式

什么是工厂模式： 工厂模式是抽象了创建具体对象的过程。

### 构造函数模式

构造函数里面New的作用是什么？ 

1. 创建一个新对象

2. 将构造函数的作用域赋予给新对象，因此this就指向了这个对象

3. 执行构造函数中的代码

4. 返回新对象

   ```javascript
   function Person(name,age,job){
   	this.name = name;
     this.age = age;
     this.job = job;
     
     this.sayName = function(){
       alert(this.name)
     }
   }
   
   var person1 = new Persion('大哥大',12,'程序员吧');
   
   ```

   上面这个 person1中的构造函数就指向Person这个函数对象。



进一步理解： 

上面这个构造函数其实也是函数， 那么，**构造函数和其他函数唯一的区别就是**，调用它的方式不同。 

任何函数， 只要通过 new 操作符来调用，那它就可以用作构造函数，而任何函数，如果不使用new操作符来调用， 那么它和普通函数也不会有两样。

例如下图： 

![构造函数的使用](https://raw.githubusercontent.com/wangtoday/Picturebed/master/eaTiGmCjSA6UFXE7p3aE4w_thumb_56d5.jpg)

第一个就是普通的构造函数使用方式， 然后通过对象 . 的方式来调用方法

第二个就是普通函数的使用， **并且在这个地方使用的时候， 算是一个全局作用域的使用。 当在全局作用域里面调用一个函数时候，因为这个函数里面（在设计的时候是作为构造函数的）的this，是指向Global对象的， 在浏览器环境下就是window对象，因此在调用完函数以后，就可以通过window来调用sayName这个函数**

```javascript
function Person(name,age,job){
	this.name = name;
  this.age = age;
  this.job = job;
  
  this.sayName = function(){
    alert(this.name)
  }
}

var person1 = new Persion('大哥大',12,'程序员吧');

var person2 = new Persion('xiao哥xiao',12,'tiny programmer');
```

注意，这个this就指向了winndow对象， 也就是说， 在当前的全局window上有name,age,job着三个对象，以及sayname这个方法。

第三个就是用call（或者类似的apply)， 这个相当于新建了这个对象 `new Object()` **o**, 然后就是在对象o的作用域里面调用person函数， 于是person对象（姑且这么说）上面的几个属性和方法都赋予给了新的作用域o上。

#### 构造函数的缺点

如上面这个 **person**构造函数， 构造函数模式的方法建立了person1  和 person2的对象。 但是有一个问题， 

对于person1 和person2两个实例， 他们的sayName方法，相当于创建了两次， 并且由于每个person实例上的sayname函数虽然用了相同的机制来创建这个方法，但是其实他们本质上是不同的，对应着不同的作用域链和符号解析，**我个人的理解这里是，各自对应在自己的person1 和person2的作用域里面**

即进一步可以理解为， 虽然目的一样，但是他们用一个相同的function在不同的作用域里面进行创建。 这样来看的话， 我们可以尝试把这个公用的方法挪到构造函数外面来，

```javascript
function Person(name,age,job){
	this.name = name;
  this.age = age;
  this.job = job;
  
  this.sayName = sayName;
}

function sayName(){
    alert(this.name)
}

var person1 = new Persion('大哥大',12,'程序员吧');

var person2 = new Persion('xiao哥xiao',12,'tiny programmer');
```



> 上面这部分的解释我不是很理解， 因为这样感觉没什么意义，相当于把sayName拿出来以后，用一个指针指向这边。 有涉及到函数作用域的东西了。。。。。



### 原型模式

我们每创建一个函数都有一个 prototype属性， 这个属性是一个指针。 指向一个对象。



下面的说法有一点拗口

**prototype属性是一个指针， 指向一个对象。 然后这个对象（是指prototype指向的对象）的用途是包含可以由特定类型的所有实例共享的属性和方法。**

进一步理解这句话， 特定类型的所有实例共享的属性和方法。 实例共享的属性和方法， 也就是这个指针（prototype）指向的对象是包含了属性和方法的对象。 而且这些属性和方法是共用的。 

***回到构造函数模式的缺点来看*** ， 那么其实就是在构造函数里面有时候会遇到一些复用的方法，比如上面提到的sayname，由于这个sayname会在不同的实例时候都会用到（person1 and person2)， 所以，可以把这个共享（复用）的方法放到一个单独的对象里面， 然后用prototype来指向这里。

原书里面下面这句话还是不太理解 

<!--如果按照字面意思来理解， 那么prototype就是通过调用构造函数而创建的那个对象实例的原型对象-->

使用原型对象的好处是让所有对象实例共享它所包含的属性和方法。 这里需要后面理解一下什么是**原型对象**

不必在构造函数中定义对象实例的信息，而是将这些信息直接添加到原型对象里面。--> 这句话倒是能够理解清楚。



下面来一波代码例子： 

```javascript
function Personn(){}

Person.prototype.name = '木爸爸';
Person.prototype.age = '30';
Person.prototype.job = 'programmer';
Person.prototype.sayName = function(){
  alert(this.name);
}

var person1 = new Person();
person1.sayName(); // 木爸爸

var person2 = new Personn();
person2.sayName(); //木爸爸

person1.sayName === person2.sayName // true
```



照抄一波原书，来复读一把，

我们将sayname方法 和 所有的属性（name,age,job)都直接添加到了Person的prototype属性中，构造函数变成了空函数。

即使如此，也仍然可以通过构造函数来创建新对象（new）， 而且新的对象还会具有相同的属性和方法。 但是与构造函数模式不同的是，新对象的这些属性和方法是由所有实例共享的。

换句话说， person1 and person2 both have the same attributes and functions.

要理解原型模式的工作原理， 必须先理解ECMAScript中的原型对象的性质。 



#### 理解原型对象

无论什么时候， 只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性。 这个属性指向函数的原型对象。

在默认情况下，所有原型对象都会自动获得一个constructor属性， 这个属性是一个指向protytype属性所在函数的指针。

妈的，拗口

先看一下图， 再结合上面Person的代码，就能稍微再理解一点。



![image-20191006162926827](/Users/mupapa/Library/Application Support/typora-user-images/image-20191006162926827.png)



```javascript
function Personn(){}

Person.prototype.name = '木爸爸';
Person.prototype.age = '30';
Person.prototype.job = 'programmer';
Person.prototype.sayName = function(){
  alert(this.name);
}

var person1 = new Person();
person1.sayName(); // 木爸爸

var person2 = new Personn();
person2.sayName(); //木爸爸

person1.sayName === person2.sayName // true
```



创建了自定义的构造函数以后（这里自定义的构造函数指的是**Person**），也就是上面这个Person的构造函数以后， 原型对象默认只会获取constructor属性，再again的解释一下， 这个属性（constructor）是指向prototype属性所在函数的指针， 也就是这个属性指向了它自己（它这里指 **Person**）

至于其它方法（默认方法） 都是从哦那个Object继承而来的。 

当调用构造函数（Person）创建一个新的实例以后， 该实例的内部将会包含一个指针，指向构造函数的原型对象。 **也有一点拗口**， 我们成这个指针叫做 [[Prototype]] 注意要有[[]]符号在。访问这个指针的方式为： 

通过` __proto__ `访问.

这个连接存在于实例和构造函数的**原型对象**之间， 注意是通过构造函数创建的实例和该构造函数prototype指针指向的原型对象之间。（看看上图的图示更能理解）

同时看对于Person的原型对象里面， 有后来添加的name,age,job的其他属性和方法。 Person的每一个实例，person1 和person2都包含一个内部属性`__proto_`， 这个属性仅仅指向了Person。prototype，换句话说，他们和构造函数没有直接的关系。 

下面这句话有一点原型链的感觉了

> 虽然这两个实例 Person1 和 Person2 都不包含属性和方法， 但是我们却可以调用person1.sayName（）方法， 也可以调用person2.sayname（）方法。 这是通过查找对象属性的过程来实现的

虽然在所有的实现里面都无法访问到`__proto_`这个东西， 也就是说， 上面的person1.sayName()这个sayname的方法虽然是通过`__proto__`来逐步link到的， 但是在使用的时候则是直接的`person1.sayName()`这样的使用。 也就是说，前面那句话，<!--在所有的实现里面都无法访问到__proto__这个东西-->。 

这个时候， 如果想找到两个对象之间是否存在这种关系，又要引入到另一个方法了。 

> 注意， 这个地方说的， 两个对象之间的**这种关系**指的是，person1是通过Person的构造函数来生成的对象， 也就是person1的原型（算是原型这么一说吧）指向的是Person的原型对象

```javascript
Person.prototype.isPrototypeOf(person1)
```

这种用法来判断， 上 main这段代码读起来就是， Person的原型属性（也即是原型对象）是否是person1的原型。 差不多这么理解吧。

es5里面又新增了一个方法， 也能判断

```javascript
Object.getPrototypeOf(person1)===Person.prototype // true
```

**进一步， 由于这个getPrototypeOf方法能够方便的获取该实例化对象person1的原型， 那么也就是它能够很方便的获取该原型里面的共享属性，方法，constructor**

```javascript
Object.getPrototypeOf(person1).name // '木爸爸'
```

这样就方便的获取了对象的原型里面的属性（自己添加的属性-name）



上面这个过程其实就是浅层次的原型链的原理： 

每当代码读区某个对象的某个属性的时候，都会执行一次搜索。目标是具有给定名字的属性。搜索首先从对象实例本身开始，如果实例中呢找到了具有给定名字的属性，就返回该属性的值。 如果没有找到，就继续搜索指针指向的原型对象，在原型对象中查找具有给定名称的属性。如果在原型对象中找到了这个属性，则返回这个属性的值。

也就是说， 我们在调用person1.sayName()的时候，会先后执行两次搜索， 首先第一次是在person1自身身上查找是否有sayname属性，如过没有， 就去person1的原型砂锅去搜索，。

> **这也是多个对象呢实例共享与言行所保存的属性和方法的基本原理**



虽然可以通过对象实例访问保存在原型中的值（name,age,job,sayName())， 但是却不能通过对象实例重写（修改）原型中的值。如果我们在实例里面添加了一个属性，而该属性和原型的属性同名， 那么我们就在实例中创建该属性，并且该属性会屏蔽原型中的那个属性。 

上面这一部分我在复习原型相关的时候关注过，可以很快看完。 

当为对象实例添加一个属性的时候，这个属性会屏蔽原型对象保存的同名属性。添加这个属性到实例里面去，只会屏蔽原型中的同名属性，却不会去修改原型中的这个同名属性。 可以理解为是互相独立的。 如果依然想要使用原型中的该属性， 那么要用`delete`把实例中的这个属性删除才可以， 比如：

```javascript
delete person1.name;
```

这样才能访问person1的原型上面的name属性。



经过了上面这一段的理解，我们就能move 到 `hasOwnProperty()`这个函数了。 

**hasOwnProperty()**这个函数的作用是检测一个属性是否存在于实例上还是存在于原型上的。



![](https://raw.githubusercontent.com/wangtoday/Picturebed/master/6dshiNb%RHCCePf0boM0kQ_thumb_56d7.jpg)

#### 原型与in操作符



我们通常使用 `in` and `hasOwnProperty()`两个来结合使用，判断一个属性的归属是在该对象上， 还是该对象的原型上。

`in`的单独使用方法为： 

```javascript
"name" in person1
```

这个返回的是true，因为name存在于person1上，不论是存在它自己上，还是它的原型上，都是true，因为它是存在的。 这也是为什么可以通过`in` and `hasOwnProperty`来综合判断属性的位置。 



在使用 for-in循环的时候，返回的是所有能够通过对象访问的，可枚举的属性。其中既包括存在于**实例中的属性**，也包括存在于**原型中的属性**。屏蔽了原型中不可枚举的属性的实例属性也会在for in 中返回， **因为所有开发人员定义的属性都是可枚举的**

Another引入两个方法

```javascript
Object.keys(Person.prototype)
Object.keys(p1)

// 上面 这两个会返回可以枚举属性的字符串数组

Object.getOwnPropertyNames(Person.prototype)

// 这个会返回所有的属性，不论是否可以枚举or not
```



> 在上面这段的读取和分析中， 我有一个困惑的地方是可枚举这个属性到底是什么东西？ 什么意思？ 属性的类型： 这又是一段很长的故事， 下面我们慢慢道来------

只有内部才用的特性，描述了属性的各种特征，枚举性 就是属性的特征，它代表能够通过for-in循环返回的属性，像Person上面定义的这些属性，默认值都为 true.

强烈建议这个地方回看一下第四章节作用域部分， 现在还是有一点模模糊糊。



#### 更简单的原型语法以及该原型语法的一些新的设定



```javascript
function Personn(){}

Person.prototype.name = '木爸爸';
Person.prototype.age = '30';
Person.prototype.job = 'programmer';
Person.prototype.sayName = function(){
  alert(this.name);
}

//这是之前的原型语法， 如果添加到共享原型对象里面， 那么每次的添加都要敲打 .prototype. 这一段
```



引入一个新的对象书写方式： 

```javascript
function Person(){

}

Person.prototype = {
  name: '木爸爸',
  age: 30,
  job: 'programmer',
  sayName : function(){
    alert(this.name)
  }
}
```

<!--在上面的代码中，我们将Person.prototype设置为等于一个以对象字面量形式创建的新对象，最终的结果相同， 只有一个例外，constructor属性不再指向Person了。 前面曾今介绍过，每创建一个函数，就会同时创建它的pr4ototype对象，这个对象也会自动获得constroctor属性，而上面这个字面意义的创建，本质上完全重写了默认的prototype对象，也就是把这个「{}」之内的新对象付给了prototype，因此constructor也就变成了这个{}之内的对象的constructor，也就是指向了祖宗辈的对象Object而非Person，**此时发生的进一步变化为下图的代码**-->

```javascript
var friend = new Person() //这个person是上面的这个新式声明法

friend instanceof Object // true
friend instanceof Person // true

friend.constructor == Person // false
friend.contrsutor == object // true
```



如果强制要使用constructor为Person， 那么在设置的时候，

```javascript
Person.prototype = {
	constructor: Person,
  name: '木爸爸',
  age: 30,
  job: 'programmer',
  sayName : function(){
    alert(this.name)
  }
}
```

强行转换。 



#### 原型的动态性

在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反应出来。

```javascript
function Person(){

}

Person.prototype.name = '木爸爸';
Person.prototype.age = '30';
Person.prototype.job = 'programmer';
Person.prototype.sayName = function(){
  alert(this.name);
}

// 上面Person的prototype上面添加了一系列的新属性

var friend = new Person()

//这个时候 friend获取了 Person上面 prototype的属性和方法

Person.prototype.sayHi = function(){
  alert('hi');
}

//在 friend 声明了以后， 在person的prototype上面添加新的方法 SayHi

friend.sayHi()
// 仍然可以调用这个新添加的方法

```



以上代码先创建了person实例---friend, 然后才添加新的function（sayHi） 到person的prototype中。 但是并没有影响friend去使用sayHi这个方法， 原因是实例于原型之间的松散链接关系。 当我们调用friend。sayHi这个方法的时候， 首先会在实例中搜索名为sayHi的属性，在没有找到的情况下，会去搜索原型。 因为实例与原型之间的联系不过是一个指针，而不是一个copy的方式，也就是原型的更改会立即影响实例的效果。 这个就可以说是一种动态性。





**但是注意！！！！**

上面这种的连接，还保持了一种连接的方式，如果后面的更改为： 

```javascript
Person.prototype = {
	constructor: Person,
	sayBig: function(){
		alerty("I am big")
	}
}

friend.sayBig()   // 这个就会有一个error
```

原因就是， 新的这个prototype实际上是修改了原型， 创建了一个新的原型。 但是我们之前的friend指向的仍然是之前的原型，于是就找不到。



![](https://raw.githubusercontent.com/wangtoday/Picturebed/master/0bWzKUEKSP65+UDaUtH8ZQ_thumb_56d8.jpg)

上面这个图能够容易的理解发生的改变。





#### 原生对象的原型

写了这么多，原型模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式创建的。 所有**原生引用类型(Object, Array,String 等)都**在其**构造函数的原型上定义了方法**, 为什么这么说， 听起来很拗口， 构造函数的原型上定义了方法。 

我们来看一个例子吧

```javascript
function Person(){

}

Person.prototype.name = '木爸爸';
Person.prototype.age = '30';
Person.prototype.job = 'programmer';
Person.prototype.sayName = function(){
  alert(this.name);
}

var Baba = new Person();

// 把 Person理解为String/Object/Array 就好了，
//  namem, age, job 都称之为在构造函数上添加的属性， Person用new的方式使用就是构造函数
// sayName就是构造函数上面添加的方法
```



所以我们能够从Array.prototype上找到sort()方法， 在String.prototype上面找到substring()等

这有什么用呢？ 之前写代码， 看别人的代码的时候，都会发现他们很高端的感觉， 比如直接去对String对象进行操作。 这个操作就是通过原生对象的原型，不仅可以取得所有默认方法的引用（substring,sort)， 还可以定义新的方法， 可以像修改自定义对象原型一样修改原生对象的原型（like change the prototype of Person)， 下面就是一个贴切的例子

```javascript
String.prototype.startsWith = function(text){
	return this.indexOf(text)===0
}

var msg = "hello word";

msg.startsWith("hello") // true

```



🦅！

> 当然， 虽然有这么灵活的方法， 但是我们只要知道这个灵活的原理就可以了，实际使用上，非常不推荐这样， 因为这样会破坏默认的原型方法集，并且可能会有意外的命名冲突



#### 原型对象的问题「缺点」

原型模式也不是没有缺点的， 这个时候我们来讨论一下原型模式的缺点。

首先它省略了为构造函数传递初始化参数这一环节

```javascript
function Person(){

}

Person.prototype.name = '木爸爸';
```

这个Person就没有传递任何参数。 

原型模式的最大问题是由其共享的本性所导致的。

- 原型中所有属性的共享，对于函数来说非常合适。
- 对于包含基本值的属性来说也说得过去。毕竟这种基本属性也可以通过在实例上面添加一个同名属性来屏蔽

**然而对于包含引用类型值的属性来说，问题就比较突出了**

```javascript
function Person(){
  
}

Person.prototype = {
  constructor: Person,
  name: '木爸爸',
  age: 30,
  job: 'programmer',
  friends: ['professor','soldier','senior programmer'],
  sayName: function(){
	   alert(this.name);
  }
}

var person1 = new Person();
var person2 = new Person();

// 目前一切顺利， 注意看上面原型里面的friends是一个引用类型的属性

person1.friends.push('面试官');

person1.friends // 'professor','soldier','senior programmer', '面试官'
person2.friends // 'professor','soldier','senior programmer', '面试官'

person1.fiiends === person2.friends // true
```

上面如果，我们本意是共享这个friends这个属性， 那么这一切都ok， 但是通常情况下，friends对于不同的人应该是不同的。 而如果使用上面这个方法就会导致所有的人共享同一个朋友列表。



### 组合使用构造函数和原型模式

来个例子， 结合了构造函数和原型模式， 并且care了原型模式的缺点。

```javascript
function Person(name,age,job){
  this.name = name;
  this.age = age;
  this.job = job;
  
  this.friends = ['Yu','Jian'];
}

// 上面就是构造函数的模式

Person.prototype = {
  constructor: Person,
  sayName: function(){
    alert(this.name)
  }
}



var person1 = new Person('木爸爸',30,'programmer')
var person2 = new Person('教授jian',29,'教授');

person1.friends.push('Fang');

// 互相不影响

person1.sayName === person2.sayName

//方法同时共享了

// 注意方法的共享， 这个地方又设计到作用域这个东西， 
// 忘了具体的原因了-  - # 
// 后面还会复习到的
```



### 动态原型模式「🦅」

有其他oo经验的开发人员在看到独立的构造函数和原型时候（就是上面这种）， 很可能会感到困惑，动态原型模式正式致力于解决这个困惑。 「我最开始的时候应该是没有感觉到困惑的吧？ 好像都没有关注过这方面，都是在直接angular来学习的」。

> 动态原型是把所有信息都封装在构造函数中，通过构造函数中初始化原型，又保持了同时使用构造函数和原型的有点。 让我们来看一看吧：



```javascript
function Person(name, age, job){
  // 属性
  this.name = name;
  this.age = age;
  this.job = job;
  
  //方法
  if(typeof this.sayName !='function'){
    Person.protytype.sayName = function(){
      alert(this.name)
    }
  }
}

var friend = new Person('木爸爸'，30，'programmer');
friend.sayName();
```



注意上面这个方法的部分， 和之前我们写法不一样， 之前都是在外面单独写protytotype的东西， 但是这里搞到一起去了。这个好处是， 这段方法的代码只会在第一次调用构造函数的时候执行，此后， 原型完成了初始化， 不需要在做什么修改， if这里就是判断原型中有没有这个方法， if这里还可以判断原型上的任何方法或者属性。

比如上面的friend的new的时候会触发protytype添加sayname这个方法， 但是

```javascript
var frind2 = new Person('爸爸把'，31，'doctor')
```

就不会在出发这个方法了， 但是并不妨碍我使用 sayname 在friend2上面

**完美**

### 寄生构造函数模式

虽然我觉得上面的这几个方式都已经完全够用了， 但是可能还会有这几个模式都不使用的情况出现？ 真蛋疼-

那么可以使用寄生(parasitic)构造函数模式。 这种模式的基本思想是**创建一个函数**， 该函数的作用仅仅是**封装创建对象的代码**，然后在返回新创建的对象。

看看代码吧：



```javascript
function Person(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  
  o.sayname = function(){
    alert(this.name);
  }
  
  return 0;
}

var friend = new Person('木爸爸'，30，'programmer');
friend.sayName();

```

原来这个就叫寄生模式啊。。。。。。。soga！

这个模式和工厂模式其实是一摸一样啊。



#### 这个模式的意义是什么呢？

这个模式可以在特殊的情况下用来为对象创建构造函数。 

假设我们像创建一个具有额外方法的特殊数组，由于不能直接修改Array的构造函数。 <!--也不是不能修改， 是不能直接修改， 在前面呢 原生对象的原型里面我们探讨过--> 

于是我们可以通过寄生构造函数的方法来解决问题： 



```javascript
function SpecialArray(){
  var values = new Array();
  
  // 注意下面这个arguements是一个默认的，也就是如果我们在SpecialArray这个函数里面添加参数，
  // 那么这个arguements就会有值， 但是有不是必须要有值
  // 所以用这个方法
  values.push.apply(values,arguements);
  
  values.toPipeString = function(){
    return this.join("|");
  }
  
  return values;
}

var colors = new SpecialArray('red','blue','green')

console.log(colors.toPipedString()) ; // red|blue|green
```



上面就是给SpecialArray构造函数添加了新的方法.



> 构造函数返回的对象与在构造函数外部创建对象的方式没有什么不同， 都是一样的。不能依赖instanceof操作符号来确定对象类型（返回的对象类型）。 所以不建议使用这个方法。 
>
> 我感觉也就是知道就行了， 不一样非要用，或者不一定要完全知道.



### 稳妥构造函数模式

没细看。。。。。以后估计能看一下？？？？？

## 继承



js里面没有接口的继承， 只有实现的继承。 

### 原型链

总算来到了火红火红的原型链。

基本思路是利用原型，让一个引用类型继承另一个引用类型的属性和方法。回顾上面的构造函数-原型-实例的关系，其实继承就是利用了这个关系来实现的。

让我们看看代码先： 

```javascript
	function SuperType(){
    this.property = true;
  }
	
	SuperType.prototype.getSuperValue = function(){
    return this.property;
  }

	function SubType(){
    this.subproperty = false;
  }

	// 下面是继承
	
	SubType.prototype = new SuperType();	

	SubType.prototype.getSubVaule = function(){
    return this.subproperty;
  }

	var instance = new SubType();

	instance.getSuperValue() // true


```



先看一下下图的图示， 我再来详细解释

![](https://raw.githubusercontent.com/wangtoday/Picturebed/master/w%DlDtlNTX27Kvy549I1Jg_thumb_56d9.jpg)

上面的代码定义了两个类型

1. SuperType
2. SubType

每个类型分别有一个属性和方法。 他们的主要区别是SubType继承了SuperType, 这个继承是通过创建SuperType的实例，并且将该实例赋予给SubType.property实现的。

实现的本质是重写原型对象，代之以一个新类型的实例。 换句话说，原来存在于SuperType的实例中的所有属性和方法，现在也存在于SubTupe.property之中了。 

再确定了这个连接以后， 我们有给SubTuype.prototype添加一个新方法，这样就继承了SuperType的属性和方法的基础上又添加了一个新方法。



上面这个图其实还少了一环，我们要记得，所有的引用类型默认都继承了Object，而这个继承也是通过原型链实现的。大家要记住，所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针，指向Object.prototype。

所以，进一步完整的继承的示意图如下： 

![](https://raw.githubusercontent.com/wangtoday/Picturebed/master/l2gz4Dx%R%GeE5fB%KJs4Q_thumb_56da.jpg)

也就是SuperType的原型上面还有一个指向Object原型的指针， 也就是对于我们之前使用过的一些方法， 比如hasOwnProperty, toString这些，其实都是Object上面的方法。 一路上寻找过去的。



#### **如何确定原型和实例的关系**

可以通过两种方式来确定原型和实例之间的关系， 

第一种方式是使用 instanceof 操作符，只要用这个操作符来测试实例于原型链中出现过的构造函数，结果都会返回true

如下：

```javascript
instance instanceof Object // true
instance instanceof SuperType // true
instance instanceof SubType // true


```



由于原型链的关系，我们可以说instance这个实例是Object, SubperType, SubType中任何一个类型的实例。 因此此时这三个构造函数的结果都返回 true

第二个方式是用 isPrototypeOf()的方法来， 是另一个途径， 原理一样的。



#### **使用继承的时候， 要谨慎的定义方法，**

子类型有时候需要覆盖超类型中的某个方法，或者需要添加超类型中不存在的某个方法。但是不管怎么样， 给原型添加方法的代码一定要放在替换运行的语句之后。「这个其实很好理解， 因为原型的继承实际上就是把默认的原型替换成超累的原型， 所以如果要添加新的方法，一定要先替换，不然会丢失」

这个其实就是最开始之前的屏蔽方法的功能。 还有之前字面意义的传递prototype也要注意一些情况。「相对简单易懂不需要多做笔记这里」

#### 原型链的问题

原型链虽然很强大，可以用来实现继承，也存在一些问题。其中最主要的问题来自包含引用类型的原型。这个就会到了之前包含引用类型的原型属性会被所有实例共享，而这也正是为什么在构造函数中，而不是在原型对象定义属性的原因。

但是呢，上面的这个通过原型链来实现继承的方式的时候， 继承这部分的实现， 是`new`一个超类， 然后把这个new来的超类赋予prototype，那么这个就是相当于这个new后的超类变成子类的原型属性了。 

下面的代码可以说明这个问题： 

```javascript
function SuperType(){
	this.colors = ["red","blue","green"];
}
// 上面这个SuperType 把引用类型放在构造函数里面是对的， 
// 但是下面被SubType继承的时候「通过原型链的方式」

function SubType(){
  
}

SubType.prototype = new SuperType();

//这个时候， SubType的prototype就是引用类型了
var instance1 = new SubType();
instance.colors.push("black");

var instance2 = new SubType();

console.log(instance1, instance2)
// 这个时候会发现， 两个instace的color都是一样的， 这个是不对的
```

**也就是 在创建子类型的实例的时候，不能想超类型的构造函数中传递参数，上面的代码就是对超类型的传递了参数，导致所有的子类型都共享同一个值**





### 借用构造函数

为了解决上面原型链的问题，我们开始是哟哦那个一种叫做借用构造函数的技术。 先看代码： 

```javascript
function SuperType(){
  this.colors = ['red','yellow'];
}

function SubType(){
  SuperType.call(this);
}


var instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors) ; //. red, yellow, black

var instance2 = new SubType();
inscane2.colors; // red, yellow



```

**SuperType.call(this)** 这个的作用就是借调了超类型的构造函数，通过使用call的方式，我们实际上是在新创建的SubType实例环境下调用了SuperType的构造韩式，这样就会在新的SubType对象上执行SuperType函数定义的所有对象初始化代码，这样一来 **SubType的每个实例都会具有自己的colors属性的副本了**， 注意这个本质上是seperate超类的属性到每一个实例化的个体上。 而不是共享。 



#### 传递参数

相对于原型链而言， 借用构造函数有一个很大的优势，可以在子类型构造函数中向超类型构造函数传递参数。

```javascript
function SuperType(name){
	this.name = name;
}

functioon SubType(){
  SuperType.call(this,'爸爸');
  
  this.age = 29;
}

var instacen = SubType();

instancen // 爸爸， 29
```

以上的代码中， SuperType接受了一个参数 name，在SubType构造函数内部调用Supertype构造函数的时候，实际上是为SubType的实例设置了一个name属性，

同时看到有一个 age的属性， 这个是为了确保 SuperType中的属性不会覆盖这个age的属性（有可能如果SubperType中有age属性， 会把下面的覆盖，如果age写在这个call上面的话）

#### 借用构造函数的问题

如果仅仅是借用构造函数， 那么有一个问题是无法避免构造函数存在的问题，即方法都在构造函数里面定义，那么函数的复用就无从谈起了。 而且在超类型的原型的定义的方法，对子类型而言也不可见的。

### 组合继承

组合继承有时候也叫做伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承， 而通过构造函数来实现对实例属性的继承。这样double both都工作了。

```javascript
function SuperType(name){
	  this.name = name;
  	this.colors = ['yellow', 'red'];
}

SuperType.propotype.sayName = function(){
  alerty(this.name);
}

//上面是超类的写法， 也就是之前我们在对象里面说到的写的方式

function SubType(name,age){
  //继承属性
  SuperType.call(this,name);
  
  this.age = age;
}

//继承方法
SubType.prototype= new SuperType();
// 这个地方是为什么呢？？？ 为什么要给constructor又指向了自己呢？
// 我个人的理解这里就是告诉它 我的prototype的构造函数指向自己
SubType.prototype.constructor = SubType;

// 实现自己新的方法
SubType.prototype.sayAge = function(){
  console.log(this.age)
}

```



> 构造函数的继承是copy， 原型链的继承是share

