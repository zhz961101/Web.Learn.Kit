function xobj(){
    this.log = ()=>console.log(this)
    return this
}
console.dir(xobj)
xobj.prototype.constructor = xobj

let f = xobj.prototype.constructor()
console.log(f)
f.log()
