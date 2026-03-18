n = int(input())
lst = []

for _ in range(n):
    cmd, *args = input().split()
    if cmd == "insert":
        lst.insert(int(args[0]), int(args[1]))
    elif cmd == "print":
        print(lst)
    elif cmd == "remove":
        lst.remove(int(args[0]))
    elif cmd == "append":
        lst.append(int(args[0]))
    elif cmd == "sort":
        lst.sort()
    elif cmd == "pop":
        lst.pop()
    elif cmd == "reverse":
        lst.reverse()