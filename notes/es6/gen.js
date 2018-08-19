function* Fibonacci(times){
    times=times||10;
    let v1=1,v2=1;
    while(times>=0){
        times-=1;
        yield v1+=v2;
        times-=1;
        yield v2+=v1;
    }
}
for(var n of Fibonacci(20)){
    console.log(n)
}
