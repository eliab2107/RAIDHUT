def intercecao_completa(intervalo_1: list, intervalo_2: list) -> bool:
    #Testa se o intervalo_2 esta contido no intervalo_1
    if intervalo_1[0] <= intervalo_2[0] and intervalo_1[1] >= intervalo_2[1]:
        return True
    else:
        return False


def intercecao_esquerda(intervalo_1: list, intervalo_2: list) -> bool:
    #Testa se o intervalo_1 tem uma intercecao com intervalo2 e tem um limite inferior menor
    if intervalo_1[0] < intervalo_2[0] <= intervalo_1[1] <= intervalo_2[1]:
        return True
    else:
        return False


def intercecao_direita(intervalo_1: list, intervalo_2: list) -> bool:
    # Testa se o intervalo_1 tem uma intercecao com intervalo2 e tem um limite superior maior
    if intervalo_2[0] <= intervalo_1[0] <= intervalo_2[1] < intervalo_1[1]:
        return True
    else:
        return False

numeros = []

ranges = []
range_initial = input().strip("()").split("),(")
for i in range_initial:
    numeros.append(i.split(","))
for i in numeros:
    ranges.append([int(i[0]), int(i[1])])


#Garantindo que os pares estarão ordenados
for i in ranges:
    i.sort()

known_ranges = [ranges[0]]
for i in range(len(ranges)):
    alteracao = False
    for j in range(len(known_ranges)):
        if intercecao_completa(ranges[i], known_ranges[j]):
            known_ranges.append(ranges[i])
            known_ranges.remove(known_ranges[j])
            alteracao = True
        elif intercecao_esquerda(ranges[i], known_ranges[j]):
            known_ranges[j][0] = ranges[i][0]
            alteracao = True
        elif intercecao_direita(ranges[i], known_ranges[j]):
            known_ranges[j][1] = ranges[i][1]
            alteracao = True

    #Se houve alteração então o intervalo já esta entre os conhecidos
    if not alteracao:
        known_ranges.append(ranges[i])

#iterando sobre a known_ranges para unir possiveis intervalos que foram adicionados.
for i in range(len(known_ranges)):
    alteracao = False
    for j in range(len(known_ranges)):
        if intercecao_completa(known_ranges[i], known_ranges[j]):
            known_ranges.append(known_ranges[i])
            known_ranges.remove(known_ranges[j])
            alteracao = True
        elif intercecao_esquerda(known_ranges[i], known_ranges[j]):
            known_ranges[j][0] = known_ranges[i][0]
            alteracao = True
        elif intercecao_direita(known_ranges[i], known_ranges[j]):
            known_ranges[j][1] = known_ranges[i][1]
            alteracao = True

tot = 1
#Consertando intervalos repetidos na resposta
for i in range(len(known_ranges)):
    for j in range(len(known_ranges)):
        if known_ranges[i] != known_ranges[j]:
            tot += 1
        break

#print(known_ranges) para ver os intervalos necessários.
print(tot)
