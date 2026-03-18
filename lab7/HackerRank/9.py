n = int(input())
student_marks = {}
for _ in range(n):
    name, *scores = input().split()
    student_marks[name] = list(map(float, scores))

query_name = input()
print(f"{sum(student_marks[query_name]) / len(student_marks[query_name]):.2f}")