

text = """Lambda calculus ( also written as λ-calculus ) is a formal system in mathematical logic for expressing computation based on function abstraction and application using variable binding and substitution . It is a universal model of computation that can be used to simulate any Turing machine . It was first introduced by mathematician Alonzo Church in the 1930s as part of his research of the foundations of mathematics . """
text += text


def summary(_text, _keywords):
    separated = _text.split(" ")
    # print(separated)
    sequences = []
    cur = 0
    kw = _keywords[::1]
    start = 0
    end = 0
    while cur < len(separated):
        if separated[cur] in kw:
            if len(kw) is len(_keywords):
                start = cur
            kw.pop(kw.index(separated[cur]))
            if len(kw) == 0:
                end = cur
                kw = _keywords[::1]
                kw.pop(kw.index(separated[cur]))
                sequences.append((start, end))
                start = cur
                cur += 1
        cur += 1
    return sequences


if __name__ == '__main__':
    res = summary(text, ["universal", "machine"])
    print(res)
    separated = text.split(" ")
    for s in res:
        print(" - ", " ".join(separated[s[0]:s[1] + 1]))
