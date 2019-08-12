case_graph = {
    "a": ["b", "c"],
    "b": ["a", "c", "d"],
    "c": ["a", "b", "d", "e"],
    "d": ["b", "c", "e", "f"],
    "e": ["c", "d"],
    "f": ["d"]
}


def bfs(graph, start):
    queue = []
    queue.append(start)
    result = []
    parent = {start: None}
    while len(queue) > 0:
        node = queue.pop(0)
        if node in result:
            continue
        result.append(node)
        queue += graph[node]
        for sub in graph[node]:
            if sub not in parent:
                parent[sub] = node
    return result, parent


def dfs(graph, start):
    stack = []
    stack.append(start)
    result = []
    parent = {start: None}
    while len(stack) > 0:
        node = stack.pop()
        if node in result:
            continue
        result.append(node)
        stack += graph[node]
        for sub in graph[node]:
            if sub not in parent:
                parent[sub] = node
    return result, parent


def get_path(graph, start, end, use_bfs=True):
    nodes, parent = (bfs(graph, end) if use_bfs else dfs(graph, end))
    result = []
    v = start
    while v is not None:
        result.append(v)
        v = parent[v]
    return result


if __name__ == '__main__':
    print(bfs(case_graph, "a"))
    print(get_path(case_graph, "f", "a"))
    print(get_path(case_graph, "f", "a", use_bfs=False))
    # print(bfs(case_graph, "e"))
    # print(dfs(case_graph, "a"))
