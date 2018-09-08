case_graph = {
    "a": {"b": 5, "c": 1},
    "b": {"a": 5, "c": 2, "d": 1},
    "c": {"a": 1, "b": 2, "d": 4, "e": 8},
    "d": {"b": 1, "c": 4, "e": 3, "f": 6},
    "e": {"c": 8, "d": 3},
    "f": {"d": 6}
}


class priorty_queue(list):
    def priorty_push(self, val):
        for item in self:
            if item[0] > val[0]:
                self.insert(self.index(item), val)
                break
        else:
            self.append(val)

    def priorty_pop(self):
        if len(self) == 0:
            return None
        return self.pop(0)


def dijkstra(graph, start):
    pqueue = priorty_queue()
    pqueue.priorty_push((0, start))
    result = []
    parent = {start:None}
    distance = {start: 0}
    while len(pqueue) > 0:
        dist, node = pqueue.pop(0)
        if node in result:
            continue
        result.append(node)
        distance[node] = dist
        for k, v in graph[node].items():
            pqueue.priorty_push((distance[node] + v, k))
            if k not in parent:
                parent[k] = node
            elif k not in distance or distance[node] + v < distance[k]:
                parent[k] = node
    return result, parent, distance


if __name__ == '__main__':
    r,p,d = dijkstra(case_graph,"a")
    print(r)
    print(p)
    print(d)
