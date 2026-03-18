def caught_speeding(speed, is_birthday):
    limit = 5 if is_birthday else 0
    if speed <= 60 + limit:
        return 0
    elif speed <= 80 + limit:
        return 1
    else:
        return 2