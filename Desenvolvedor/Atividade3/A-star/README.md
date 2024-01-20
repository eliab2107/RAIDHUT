# A*

Este projeto foi desenvolvido para a disciplina de sistemas inteligentes no Centro de Informática em 2022.2. Consiste na implementação do algoritmo A* para solucionar o seguinte problema:

## O Problema do metrô de Paris 

Suponha que queremos construir um sistema para auxiliar um usuário do metrô de Paris a saber o trajeto mais rápido entre a estação onde ele se encontra e a estação de destino. O usuário tem um painel com o mapa, podendo selecionar a sua estação de destino. O sistema então acende as luzes sobre o mapa mostrando o melhor trajeto a seguir (em termos de quais estações ele vai atravessar e quais as conexões mais rápidas a fazer – se for o caso). Para 	facilitar a vida, consideramos apenas 4 linhas do metrô.

Considere que:

- A velocidade média de um trem é de 30km/h;
- O tempo gasto para trocar de linha dentro de mesma estação (fazer baldeação ) é de 4 minutos.

Como informações foi fornecido uma tabela com a distância em linha reta entre cada estação e uma segunda tabela com a distância real(caminho feito pelo metrô) entre as estações que se conectavam. 

## Resolução
## 1 - Converter tabelas em grafos.
O primeiro passo para poder trabalhar com o A* foi gerar o grafo sobre o qual ele iria rodar.
O grafo consiste em um dicionario de estações cujo a chave é o número da estação, e guarda uma lista com:
- 0 -> As estações adjacentes
- 1 -> A cor da sua linha
- 2 -> Um booleano para eliminar caminhos ruins.

Heurística:
A heuristica utilizada ponderava a distância em linha reta entre as estações e o destino final,
se seria necessário fazer mais baldeações ao seguir para uma estação, distância real entre a estação "atual" e cada estação candidata.


## Para executar
O programa recebe como entrada dois inteiro entre 1 14 e retorna o caminho escolhido e o tempo que será gasto.
Para acompanhar a execução é preciso alterar as linhas 18, 21-22 e 67-70. Com isso será possível ver o passo a passo da execução.