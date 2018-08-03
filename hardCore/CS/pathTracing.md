# 路径跟踪
第一部分是读源码[99行](http://www.kevinbeason.com/smallpt/)

后面则是渲染优化

可能会有一点物理碰撞的内容

# smallpt: Global Illumination in 99 lines of C++

### struct Vec
定义三维坐标系和一些常用的计算工具，
```cpp
Vec operator%(Vec&b){return Vec(y*b.z-z*b.y,z*b.x-x*b.z,x*b.y-y*b.x);}
```
叉乘定义

### struct Ray
光线对象，起点终点，三维线段

### enum Refl_t
反射(reflect)枚举类，在radiance()中用到

- DIFF:diffuse , 漫反射
- SPEC：specular，镜面
- REFR：Refraction，折射

### struct Sphere
图形，形状（球）

- emission：辐射，发光度？
- intersect：相交判断，如果没交点返回0否则返回距离(?暂时不懂指的那段距离)

### spheres\[\]
定义各个物体，显而易见，包括看上去像正方形的墙壁也是圆而已

- Vec(1,1,1)*.999：两个球体的颜色定义成这个(不太清楚直接1会怎样？玻璃材质的什么颜色无所谓吧？懵逼了)
- Sphere(600, Vec(50,681.6-.27,81.6),Vec(12,12,12),  Vec(), DIFF)：灯光的设置。(灯光颜色应该是...不能改的吧？)

### clamp
显而易见

### toInt
写的比较抽象，怀疑是用来做色彩空间映射的

### intersect
判断光线与各个现状是否相交，id就是spheres数组下标，t则返回距离

### radiance
