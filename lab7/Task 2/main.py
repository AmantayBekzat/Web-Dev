from models import Animal, Dog, Cat

a = Animal("Pixel", 5, "white")
d = Dog("Gold", 3, "yellow", "Labrador")
c = Cat("Bars", 2, "gray", "fish")

animals = [a, d, c]

for animal in animals:
    print(animal)
    print(animal.info())
    print(animal.speak())
    print("------")

print(d.fetch())
print(c.sleep())