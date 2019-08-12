
def fib(num):
    return 1 if num is 0 or num is 1 else fib(num - 1) + fib(num - 2)


fib_r = {"0": 1, "1": 1}


def fib_record(num):
    global fib_r
    if str(num) in list(fib_r.keys()):
        return fib_r[str(num)]
    else:
        res = fib_record(num - 1) + fib_record(num - 2)
        fib_r.update({str(num): res})
        return res

LIS_r = {"1":1}

def LIS(arr):
    return max()

if __name__ == '__main__':
    print(fib(10))
    print(fib_record(10))
    # print(fib_r)no
    print(LIS([1,5,2,8,9,3,1,4,7,5,6,7,8,9]))
