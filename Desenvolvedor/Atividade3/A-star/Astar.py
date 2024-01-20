'''
    A busca A* tem uma função de avaliação f(n), que é a soma do custo do caminho já percorrido (g(n)) e a função heurística adotada no problema (h(n))
    A h(n) utilizada para esse caso é a distância em linha reta entre dois pontos, dada pela variável matriz_distancias_linha_reta
    O custo do caminho depende da matriz_distancias_real
'''

def fim(node:dict, inicial:int):
    global opcoes, caminho
    caminho_final = []
    tempo_final = caminho[node]["tempo_gasto"]
    linha_final = caminho[node]["linha"]
    while node != inicial:
        caminho_final.append(node)
        node = caminho[node]['origem']
    caminho_final.append(node)
    
    tempo_convert = "%02dh:%02dmin" % (divmod(tempo_final-4, 60)) #converte o tempo(min) para h:min
    '''print(f'\nO tempo total da viagem será {tempo_convert}, o caminho percorrido é:', end= ' ')'''
    
    estacoes = ', '.join(['E'+str(x) for x in reversed(caminho_final)])
''' print(estacoes)
    print(f'Linha Final: {linha_final}\n')'''


def heuristica(atual:int, proximo:int, final:int, tempo_ja_gasto:int, linha: str):
    global opcoes
    baldeacao = 4
 
    tempo_proximo_destino_reta = matrix_distancias_linha_reta[proximo-1][final-1] *2
    tempo_atual_destino_real = matrix_distancias_real[atual-1][final-1] *2
    tempo_atual_proximo_real = matrix_distancias_real[atual-1][proximo-1] * 2
   
    if linha in graph[atual][-2] and linha in graph[proximo][-2]:
        baldeacao = 0
    
    if proximo == final :
        func = tempo_ja_gasto + tempo_atual_destino_real + baldeacao 
    else:
        func = tempo_ja_gasto + tempo_proximo_destino_reta + tempo_atual_proximo_real + baldeacao 
    if linha not in graph[atual][-2]: 
        func += 4
    
    tempo_ja_gasto += tempo_atual_proximo_real + baldeacao
    dicio = {'estacao':proximo, 'origem': atual, 'tempo_gasto': tempo_ja_gasto, 'linha':linha, 'func': func,  'baldeacao': baldeacao}
    opcoes.append(dicio)
    

def Astar(node_atual:int):
    global linha, opcoes, initial, caminho
    if node_atual == destiny:
        fim(node_atual, initial)
    else: 
        for node in graph[node_atual][:-2]:
            if node != destiny and len(graph[node][-2]) == 1: 
                #para não adicionar nós que estejam na ponta 
                graph[node][-1] = False
            if node == destiny: 
                #Caso o nó que esta sendo observado tenha caminho direto com o destino sua func é atualizada para usar a distancia real
                if linha in graph[node_atual][-2] and linha in graph[node][-2]:
                    opcoes[0]['func'] = opcoes[0]['tempo_gasto'] + (matrix_distancias_real[node_atual-1][destiny-1] * 2) + 0.01
                else:
                    opcoes[0]['func'] = opcoes[0]['tempo_gasto'] + (matrix_distancias_real[node_atual-1][destiny-1] *2) + 4 + 0.01
                    
            if graph[node][-1]:
                #Para só aceitar nós que ainda valem a pena investigar
                heuristica(node_atual, node, destiny, opcoes[0]['tempo_gasto'] , linha)
        ''' print(f'\nFronteiras da E{node_atual}: {graph[node_atual][:-2]}')        
        for i in range (len(opcoes)-1):
        print(f"{opcoes[i]} ")
        print()'''
        opcoes.pop(0)
        opcoes = sorted(opcoes, key=lambda k: k['func'])
        for lin in graph[node_atual][-2]:      
            # atualizar cor da linha
            if lin in graph[opcoes[0]['estacao']][-2]: #pega 
                linha = lin
                opcoes[0]['linha'] = linha        
        if caminho[node_atual]['origem'] == opcoes[0]['estacao']:
            #escolheu o nó de onde veio
            #Se a melhor opção foi a anterior esse caminho nao tem futuro
            graph[node_atual][-1] = False
            opcoes.pop(1)
            del caminho[opcoes[1]['estacao']] #tirando do caminho
        caminho[opcoes[0]['estacao']] = opcoes[0]
        Astar(opcoes[0]['estacao'])
        
        
graph = {1 : [2, ['azul'], True ],
         2 : [1, 3, 10, 9,['azul', 'amarela'], True],
         3 : [2, 4, 9, 13,['azul', 'vermelha'], True],
         4 : [3, 5, 13, 8,['azul', 'verde'], True],
         5 : [4, 6, 7, 8,['azul', 'amarela'], True ],
         6 : [5,['azul'], True ],
         7 : [5,['amarela'], True ],
         8 : [4, 5, 9, 12,['verde', 'amarela'], True ],
         9 : [2, 3, 8, 11,['vermelha', 'amarela'], True ],
         10 : [2,['amarela'], True ],
         11 : [9,['vermelha'], True ],
         12 : [8,['verde'], True ],
         13 : [3, 4, 14,['verde', 'vermelha'], True ],
         14 : [13,['verde'], True ]
}

matrix_distancias_linha_reta = [
    [0, 10, 18.5, 24.8, 36.4, 38.8, 35.8, 25.4, 17.6, 9.1, 16.7, 27.3, 27.6, 29.8],
    [10, 0, 8.5, 14.8, 26.6, 29.1, 26.1, 17.3, 10, 3.5, 15.5, 20.9, 19.1, 21.8],
    [18.5, 8.5, 0, 6.3, 18.2, 20.6, 17.6, 13.6, 9.4, 10.3, 19.5, 19.1, 12.1, 16.6],
    [24.8, 14.8, 6.3, 0, 12, 14.4, 11.5, 12.4, 12.6, 16.7, 23.6, 18.6, 10.6, 15.4],
    [36.4, 26.6, 18.2, 12, 0, 3, 2.4, 19.4, 23.3, 28.2, 34.2, 24.8, 14.5, 17.9],
    [38.8, 29.1, 20.6, 14.4, 3, 0, 3.3, 22.3, 25.7, 30.3, 36.7, 27.6, 15.2, 18.2],
    [35.8, 26.1, 17.6, 11.5, 2.4, 3.3, 0, 20, 23, 27.3, 34.2, 25.7, 12.4, 15.6],
    [25.4, 17.3, 13.6, 12.4, 19.4, 22.3, 20, 0, 8.2, 20.3, 16.1, 6.4, 22.7, 27.6],
    [17.6, 10, 9.4, 12.6, 23.3, 25.7, 23, 8.2, 0, 13.5, 11.2, 10.9, 21.2, 26.6],
    [9.1, 3.5, 10.3, 16.7, 28.2, 30.3, 27.3, 20.3, 13.5, 0, 17.6, 24.2, 18.7, 21.2],
    [16.7, 15.5, 19.5, 23.6, 34.2, 36.7, 34.2, 16.1, 11.2, 17.6, 0, 14.2, 31.5, 35.5],
    [27.3, 20.9, 19.1, 18.6, 24.8, 27.6, 25.7, 6.4, 10.9, 24.2, 14.2, 0, 28.8, 33.6],
    [27.6, 19.1, 12.1, 10.6, 14.5, 15.2, 12.4, 22.7, 21.2, 18.7, 31.5, 28.8, 0, 5.1],
    [29.8, 21.8, 16.6, 15.4, 17.9, 18.2, 15.6, 27.6, 26.6, 21.2, 35.5, 33.6, 5.1, 0]
]

matrix_distancias_real = [
    [-1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [10, -1, 8.5, -1, -1, -1, -1, -1, 10, 3.5, -1, -1, -1, -1],
    [-1, 8.5, -1, 6.3, -1, -1, -1, -1, 9.4, -1, -1, -1, 18.7, -1],
    [-1, -1, 6.3, -1, 13, -1, -1, 15.3, -1, -1, -1, -1, 12.8, -1],
    [-1, -1, -1, 13, -1, 3, 2.4, 30, -1, -1, -1, -1, -1, -1],
    [-1,-1,-1,-1,3,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,2.4,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, -1, -1, 15.3, 30, -1, -1, -1, 9.6, -1, -1, 6.4, -1,-1],
    [-1, 10, 9.4, -1, -1, -1, -1, 9.6, -1, -1, 12.2, -1, -1, -1],
    [-1, 3.5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1],
    [-1, -1, -1, -1, -1, -1, -1, -1, 12.2, -1, -1, -1,-1,-1],
    [-1, -1, -1, -1, -1, -1, -1, 6.4, -1, -1, -1, -1, -1, -1],
    [-1, -1, 18.7, 12.8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5.1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5.1, -1]
]

caminho = {}
initial = int(input('Qual sua estação inicial? '))
destiny = int(input('Para onde você quer ir? '))
linha = ''
tempo_gasto_tot = 0
opcoes = []
opcoes.append({'estacao':initial, 'origem': 'origem', 'tempo_gasto': 0, 'linha':linha, 'func': 999999})
caminho[initial] = {'estacao':initial, 'origem': 'origem', 'tempo_gasto': 0, 'linha':linha, 'func': 999999}

if initial in graph and destiny in graph: #verificar se o numero digitado pelo usuário está dentro do limite da quantidade de estações
    if initial == destiny: # verifica se a estação inicial é igual a estação destino
        print(f'Você já se encontra na estação destino. Para mudar de linha, o tempo demorado é de {tempo_gasto_tot} minutos')
    else:
        tempo_gasto_tot = 0
        Astar(initial)
else:
    print("Existe uma estação que não está dentro dos limites.")