# 排序算法
常见问题,要求是做到熟悉和理解

# 写在前面
### 复杂度
>算法复杂度是指算法在编写成可执行程序后,运行时所需要的资源,资源包括时间资源和内存资源.应用于数学和计算机导论.

简单的说就是,约去了算法无关的参数所消耗的资源的那个值就是复杂度.用来衡量效率

- 空间复杂度:本身分为三个部分,在这里一般只考虑算法在运行时所需要的额外空间.
- 时间复杂度:时间频度中次数最高项并去掉常数


### 稳定性
排序算法的一个衡量优劣的特性,主要针对对象属性排序的问题,单纯的数值排序不用考虑此特性

> 假定在待排序的记录序列中,存在多个具有相同的关键字的记录,若经过排序,这些记录的相对次序保持不变,即在原序列中,r[i]=r[j],且r[i]在r[j]之前,而在排序后的序列中,r[i]仍在r[j]之前,则称这种排序算法是稳定的；否则称为不稳定的.



# 冒泡排序 Bubble Sort
`交换`,`步进`.(无法并行)
<br>依次根据比较结果交换相邻元素,每走完一轮最后一个位置的元素就是排好的,直到未排序为空
```python
def bubble_sort(nums):
    for i in range(len(nums) - 1):  # 这个循环负责设置冒泡排序进行的次数
        for j in range(len(nums) - i - 1):  # j为列表下标
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
    return nums
```
时间复杂度:`O(n^2)`

### 鸡尾酒排序
可以看做改`进版`的`冒泡排序`或者一种`选择排序`,根据可视化的效果也可以叫做`来回/涟漪排序`,性能比冒泡排序快一点
```python
def cocktail_sort(nums):
    size = len(nums)
    sign = 1
    for i in range(size / 2):
        if sign:
            sign = 0
            for j in range(i, size - 1 - i):
                if nums[j] > nums[j + 1]:
                    nums[j], nums[j + 1] = nums[j + 1], nums[j]
            for k in range(size - 2 - i, i, -1):
                if nums[k] < nums[k - 1]:
                    nums[k], nums[k - 1] = nums[k - 1], nums[k]
                    sign = 1
        else:
            break
    return nums
```
时间复杂度:`O(n^2)`

# 选择排序 Selection Sort
`比较`,`插入`.
<br>比较`未排序`部分,找出`最大或最小值`,用这个值`插入`到排好的array中(通过交换的方式可以`不用额外空间`),直到未排序部分空
<br>可以说这算是`冒泡排序`的退化版本,没用巧妙的操作,就是直观的在两个array中操作

时间复杂度:`O(n^2)`

# 插入排序 Insertion Sort
从算法实现上,和选择排序有很大的相似程度,也是比较与插入两部分
<br>只是与选择排序不同的,插入排序以先插入后比较的方式来构造排序array
<br>基本思路,从未排序中选择一个元素并放到排好序的array最后一位,然后从插入位置开始判断元素位置是否正确,不正确就交换位置

时间复杂度:`O(n^2)`
### 二分插入排序
与插入排序的区别在于,比较的时候使用折半查找的方法,从排好序的array的两端开始比较,加快速度

时间复杂度:`O(n^2)`
### 希尔排序 Shell Sort
直观的称呼应该叫做`跨步排序`<br>
`分组`,`排序`.
属于插入排序的变种(笔者认为内部不用插入排序也是可以的)
<br>不同的是,需要一个`间隔值`di,初始值只要小于n(建议使用小于n/2来初始化)就行.
<br>首先根据`di`来分组,然后对组内元素排序,排好之后根据原分组的位置在整个array中`交换位置`
<br>di--之后再继续,直到di==1

希尔排序的核心思想就是减少较远的交换步数,所以只要是以交换为基础的排序方法放在希尔排序中使用都是可以优化的(暂无证明)

# 归并排序 Merge Sort
归并就是他的核心算法
<br>采用了`分治法`的思想.一千个数的数组要看它是否是排好序的很困难,但是一个数呢？还用看一个数不用排啊.分治的思想就是如此,array中的元素不是数字,而是一个个的排好序的部分,将这些排好的部分和相邻的部分再合并
```python
def MergeSort(lists):
    if len(lists) <= 1:
        return lists
    num = int( len(lists) / 2 )
    left = MergeSort(lists[:num])
    right = MergeSort(lists[num:])
    return Merge(left, right)
def Merge(left,right):
    r, l=0, 0
    result=[]
    while l<len(left) and r<len(right):
        if left[l] < right[r]:
            result.append(left[l])
            l += 1
        else:
            result.append(right[r])
            r += 1
    result += left[l:]
    result += right[r:]
    return result
```
时间复杂度:`O(n logn)`


# 堆排序 Heap Sort
> 大顶堆:arr[i] >= arr[2i+1] && arr[i] >= arr[2i+2]
> <br>即堆顶为最大值,下则反
> <br>小顶堆:arr[i] <= arr[2i+1] && arr[i] <= arr[2i+2]

其实就是`选择排序`,只不过选择的方式使用堆的特性

算法就一个部分,`顶堆调整`,将一个堆array排序为大顶或小顶,然后取出堆顶,放到已排序array中.当然根据堆的结构,可以不适用额外空间

# 快速排序 Quick Sort
比较巧妙,和以上的都不相同,性能与堆排序不相上下
<br>思想就一个,`分组`
<br>当所有元素都分为维度为1的组时,排序完毕

首先随机取其中一个数(一般取未排序的第一个),然后将待排数组分为比这个数大和比它小的两部分,分好之后,显而易见选择的这个数就是排好的.重复这一步,直到每组只剩两个并排好.
```python
#quick sort
def quickSort(L, low, high):
    i = low
    j = high
    if i >= j:
        return L
    key = L[i]
    while i < j:
        while i < j and L[j] >= key:
            j = j-1
        L[i] = L[j]
        while i < j and L[i] <= key:
            i = i+1
        L[j] = L[i]
    L[i] = key
    quickSort(L, low, i-1)
    quickSort(L, j+1, high)
    return L
```
时间复杂度:`O(n logn)`
### 随机快排
分割值取随机数,将轮分组最坏情况可能性从O(n^2)降低为O(1/(2^n))
<br>时间空间复杂度不变,降低了最终的时间期望
### 平衡快排
由于初始化时分组的数是随机的,容易导致算法落入最坏情况
<br>这个改进版本的思路是尽量选择中数做分割数
### 三路基数快排
针对`多关键字(multikey)`排序的一种高效排序方法,本质还是快排,区别在于快排的核心内包含了一个队`相等队列`的迭代排序过程
<br>主要用于`字符串排序`
# 计数排序 Counting Sort
`稳定性强`,且时间`复杂度超小O(n+k)`,`局限性`也非常大,只能对整数排序(浮点数不能？？？笔者不太清楚,明明都可以啊)
<br>基本思路是,选择一个数统计比他小的数的个数,这个值就是它排好的位置
```python
def sort(nums):
     n=len(nums)
     sorted=[None]*n
     for i in range(n):
          p=0
          q=0
          for j in range(n):
               if nums[j]<nums[i]:
                    p+=1
               elif nums[j]==nums[i]:
                    q+=1
          for k in range(p,p+q):
               sorted[k]=nums[i]
     print sorted
```

# 基数排序 Radix Sort
属于`桶排序`的`精简版本`<br>
根据基数选择方向又有`MSD`和`LSD`两种<br>
这里所称的基数是指一个数的各个位,比如`13`的基数为`1`和`3`
<br>思想就是有十个桶(当然16进制就需要16个),然后`顺序`的将待排数放入各个桶中,重复到最大位数被排序

> 优化,可以根据位数分桶后分别基数排序
> <br>其次,使用高位优先排序之后,可以不用递归基数排序,选用快排或者堆排来排序(等等,这不就是桶排？？？)...

# 桶排序 Bucket Sort
适合用于`超大数据`的`排序`或者找`临界值`的一种高效算法<br>
核心思想就如其名,将数据分桶,`分治`的思想也就使得桶排不一定贯穿整个过程,可以仅作为算法每一大步的`预优化`操作

分桶的方式很容易变种,比如上面的`基数`或者笔者所说的优化方法`位数分桶`

最简单的方法是构造一个长度为`最大数字`的数组,然后将数组放进和相等的下标的位置,比如数字12放到arr[12]的位置

其次用一些减少桶的公式都能优化:<br>
`下标 = Value * 待排个数 / (最大值+1)`<br>
可以将原数组映射到相同长度的桶列表中
