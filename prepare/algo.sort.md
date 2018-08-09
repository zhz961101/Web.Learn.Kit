# 排序算法
常见问题，要求是做到熟悉和理解

# 写在前面
### 复杂度
>算法复杂度是指算法在编写成可执行程序后，运行时所需要的资源，资源包括时间资源和内存资源。应用于数学和计算机导论。

简单的说就是，约去了算法无关的参数所消耗的资源的那个值就是复杂度。用来衡量效率

- 空间复杂度：本身分为三个部分，在这里一般只考虑算法在运行时所需要的额外空间。
- 时间复杂度：时间频度中次数最高项并去掉常数


### 稳定性
排序算法的一个衡量优劣的特性，主要针对对象属性排序的问题，单纯的数值排序不用考虑此特性

> 假定在待排序的记录序列中，存在多个具有相同的关键字的记录，若经过排序，这些记录的相对次序保持不变，即在原序列中，r[i]=r[j]，且r[i]在r[j]之前，而在排序后的序列中，r[i]仍在r[j]之前，则称这种排序算法是稳定的；否则称为不稳定的。



# 冒泡排序 Bubble Sort
`交换`，`步进`。（无法并行）
<br>依次根据比较结果交换相邻元素，每走完一轮最后一个位置的元素就是排好的，直到未排序为空
```python
def bubble_sort(nums):
    for i in range(len(nums) - 1):  # 这个循环负责设置冒泡排序进行的次数
        for j in range(len(nums) - i - 1):  # j为列表下标
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
    return nums
```
时间复杂度：`O(n^2)`

### 鸡尾酒排序
可以看做改`进版`的`冒泡排序`或者一种`选择排序`，根据可视化的效果也可以叫做`来回/涟漪排序`，性能比冒泡排序快一点
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
时间复杂度：`O(n^2)`

# 选择排序 Selection Sort
`比较`，`插入`。
<br>比较`未排序`部分，找出`最大或最小值`，用这个值`插入`到排好的array中（通过交换的方式可以`不用额外空间`），直到未排序部分空
<br>可以说这算是`冒泡排序`的退化版本，没用巧妙的操作，就是直观的在两个array中操作

时间复杂度：`O(n^2)`

# 插入排序 Insertion Sort
从算法实现上，和选择排序有很大的相似程度，也是比较与插入两部分
<br>只是与选择排序不同的，插入排序以先插入后比较的方式来构造排序array
<br>基本思路，从未排序中选择一个元素并放到排好序的array最后一位，然后从插入位置开始判断元素位置是否正确，不正确就交换位置

时间复杂度：`O(n^2)`
### 二分插入排序
与插入排序的区别在于，比较的时候使用折半查找的方法，从排好序的array的两端开始比较，加快速度

时间复杂度：`O(n^2)`
### 希尔排序 Shell Sort
`分组`，`排序`。
属于插入排序的变种（笔者认为内部不用插入排序也是可以的）
<br>不同的是，需要一个`间隔值`di，初始值只要小于n（建议使用小于n/2来初始化）就行。
<br>首先根据`di`来分组，然后对组内元素排序，排好之后根据原分组的位置在整个array中`交换位置`
<br>di--之后再继续，直到di==1

希尔排序的核心思想就是减少较远的交换步数，所以只要是以交换为基础的排序方法放在希尔排序中使用都是可以优化的（暂无证明）

# 归并排序 Merge Sort
归并就是他的核心算法
<br>采用了`分治法`的思想。一千个数的数组要看它是否是排好序的很困难，但是一个数呢？还用看一个数不用排啊。分治的思想就是如此，array中的元素不是数字，而是一个个的排好序的部分，将这些排好的部分和相邻的部分再合并
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
时间复杂度：`O(n logn)`


# 堆排序 Heap Sort
> 大顶堆：arr[i] >= arr[2i+1] && arr[i] >= arr[2i+2]
> <br>即堆顶为最大值，下则反
> <br>小顶堆：arr[i] <= arr[2i+1] && arr[i] <= arr[2i+2]  


# 快速排序 Quick Sort

# 计数排序 Counting Sort

# 基数排序 Radix Sort

# 桶排序 Bucket Sort
