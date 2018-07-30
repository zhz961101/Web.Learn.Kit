# arrow function
箭头函数

# this question
```javascript
((c) => {
  this.b = 2;
  console.log(this, c)
})(3);

((c) => {
  this.b = 2;
  console.log(this, c)
}).apply({
    a: 1
  }, [3])

  ~ function() {
    ! function(a) {
        console.log(this);
      this.a = a;
      (() => {
        console.log(this)
      })()
    }(1)
  }()
```
