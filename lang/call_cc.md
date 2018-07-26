# LISP

# zhihu实现 作者：Belleve
```javascript
function $(C, E, K) {
    if (!(C instanceof Array)) return K("string" == typeof C ?
        E[C] : C);
    switch (C[0]) {
        case "lambda":
            return K(function(K) {
                return function() {
                    for (var e = Object.create(E), u = 0; u < C[1].length; u++) e[C[1][u]] = arguments[u];
                    return $(C[2], e, K)
                }
            });
        case "if":
            return $(C[1], E, function(e) {
                return e ?
                    $(C[2], E, K) : $(C[3], E, K)
            });
        case "callcc":
            return $(C[1], E, function(C) {
                var
                    E = function() {
                        return function(C) {
                            return K(C)
                        }
                    };
                return C(E)(E)
            });
        case "'":
            return K(C[1]);
        default:
            return $c(C, E, K)
    }
}

function $c(C, E, K) {
    return $(C[0], E, function(e) {
        return $$(C.slice(1), E, function(C) {
            return e(K).apply(
                null, C)
        })
    })
};

function $$(C, E, K) {
    return C.length ? $(C[0], E, function(e) {
        return $$(C.slice(1), E, function(C) {
            return K(C ? [e] : [e].concat(C))
        })
    }) : K(
        null)
}
var e = {
    trace: function(k) {
        return function(x) {
            return k(console.log(
                x))
        }
    }
};
$(['trace', ['callcc', ['lambda', ['return'],
    ['return', ["'", 42]]
]]], e, function(x) {
    return x
}); // (c) Belleve Invis.
```
