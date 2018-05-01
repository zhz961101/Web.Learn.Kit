# Random Text Generator

> 最不想写的一个README...主要是改写的呢，感觉又太没水平了，有东西的地方写起来又巨难
> <br>

> **虫口模型随机数生成器**<br>
> 随机数是一种非常特殊的概念，不好比较各种伪随机数自己的好坏，偏差，我这里用了比较取巧的方法，使用随机数去填满一块相同大小的图形，类似降维的方法可以容易的比较各方法的好坏<br>
> 下面是分别使用几种方法绘制的图像<br>

> 使用JS内置随机数生成器 use time : <=40<br>
> ![image](https://https://github.com/zhz961101/Web.Learn.Kit/tree/master/randTextGen/img/math.png)
> ```javascript
> [x,y].RGB = Math.random()
> ```
> 使用线性取模随机数生成器 use time : <=80<br>
> ![image](https://https://github.com/zhz961101/Web.Learn.Kit/tree/master/randTextGen/img/r_liner.png)
> ```javascript
> [x,y].RGB = randOne()
> ```
> 使用logistic模型随机数生成器 use time : >=100<br>
> ![image](https://https://github.com/zhz961101/Web.Learn.Kit/tree/master/randTextGen/img/r_logistic.png)
> ```javascript
> [x,y].RGB = rand_logistic()
> ```
> 使用正确logistic模型随机数生成器 use time : >=120<br>
> ![image](https://https://github.com/zhz961101/Web.Learn.Kit/tree/master/randTextGen/img/r_lowlogistic.png)
> ```javascript
> [x,y].RGB = rand_lowlogistic()
> ```

> todo:
> <br> 用马克洛夫链完成真正的随机文本生成
