def intercecao_completa(intervalo_1: list, intervalo_2: list) -> bool:
    # Testa se os intervalos são iguais
    if intervalo_1[0] == intervalo_2[0] and intervalo_1[1] == intervalo_2[1]:
        return True
    else:
        return False


# Testa se o intervalo_2 esta contido no intervalo_1
def contido(intervalo_1: list, intervalo_2: list) -> bool:
    if intervalo_1[0] < intervalo_2[0] and intervalo_1[1] > intervalo_2[1]:
        return True
    else:
        return False


def intercecao_esquerda(intervalo_1: list, intervalo_2: list) -> bool:
    # Testa se o intervalo_1 tem uma intercecao com intervalo2 e tem um limite inferior menor
    # Exemplo intervalo_1 = (0,5) intervalo_2 = (3, 6)  -> 0,6 return True
    if intervalo_1[0] < intervalo_2[0] <= intervalo_1[1] <= intervalo_2[1]:
        return True
    else:
        return False


def intercecao_direita(intervalo_1: list, intervalo_2: list) -> bool:
    # Testa se o intervalo_1 tem uma intercecao com intervalo2 e tem um limite superior maior
    # Exemplo intervalo_1 = (6,10) intervalo_2 = (3, 7)  -> 3,10 return True
    if intervalo_2[0] <= intervalo_1[0] <= intervalo_2[1] < intervalo_1[1]:
        return True
    else:
        return False
    

def main(ranges:list)-> list:
        
    alteracao = True
    while alteracao:
        ranges_remove = []
        ranges_add = []
        for i in ranges:
            alteracao = False
            #a combinação de dois conjuntos sempre deve cair em uma destas possibilidades
            for j in ranges:
                if intercecao_completa(i, j):
                    continue
                #Confere se deve excluir um dos dois intervalos por estar contido no outro
                elif contido(i, j):
                    ranges_remove.append(j)
                    alteracao = True
                    break
                elif contido(j, i):
                    ranges_remove.append(i)
                    alteracao = True
                    break
                #Se i abranger numeros abaio de j e algum que esteja em j então ambos são substituido por um nojo intervalo que mantem seus extremos
                elif intercecao_esquerda(i, j):
                    ranges_remove.append(i)
                    ranges_remove.append(j)
                    ranges_add.append([i[0], j[1]])
                    alteracao = True
                    break
                #Se i abranger numeros acima de j e algum que esteja em j então ambos são substituido por um nojo intervalo que mantem seus extremos
                elif intercecao_direita(i, j):
                    ranges_remove.append(i)
                    ranges_remove.append(j)
                    ranges_add.append([j[0], i[1]])
                    alteracao = True
                    break
            #Caso haja um novo conjunto encontrado ou intervalos contidos em outros, a lista será atualizada e lida novamente.  
            if alteracao:
                break

        #Atualizando a lista
        for i in ranges_add:
            ranges.append(i)
        for i in ranges_remove:
            try:
                ranges.remove(i)
            except:
                continue
    return ranges

# Organizando a entrada
numeros = []
ranges = []
range_initial = input().strip("()").split("),(")
for i in range_initial:
    numeros.append(i.split(","))
for i in numeros:
    ranges.append([int(i[0]), int(i[1])])

# Garantindo que os pares estarão ordenados
for i in ranges:
    i.sort()
    
intervalos = main(ranges)
print(len(intervalos))
#print(intervalos)


'''alguns dos testes que usei para me orientar
(1,2),(2,4),(3,5)
(1,3),(6,8),(12,15),(4,7),(2,5)
(3,5),(7,9),(4,8)
(2,3)(4,5),(7,8),(1,9)
(11,9)(1,3)(5,8)(2,6)(10,7)
'''