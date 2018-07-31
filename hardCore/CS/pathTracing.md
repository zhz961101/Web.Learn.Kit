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
- intersect：相交判断，如果没交点返回0
