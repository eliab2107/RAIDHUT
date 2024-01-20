# Sistema de recompensas 
O sistema de recompensas em jogo pode incluenciar fortemente em cativar usuários e melhorar a experiência. Este sistema vai depender bastante do jogo em questão, por exemplo, entre um MOBA, RPG e um MMO parâmetros diferentes podem ser utilizados para definir o momento de dar uma recompensa e qual recompensa deverá ser dada.

## Resposta
Há uma necessidade uma função que defina se dar ou não o a recompensa ao jogador, e esta função deve levar em consideração principalmente algumas questões. 

### Para criar a função distribuirRecompens():

- 1 Definir momentos para executar, após determinadas ações executadas, por exemplo, após vencer uma partida, ou após concluir uma partida, abater um inimigo, concluir uma missão, fazer login...

- 2 Como dito na questão, não é positivo que jogadores ganhem recompensas o tempo todo e nem que fiquem muito tempo sem recebe-las, então o tempo entre a última recompensa recebida e o agora deve ser levado em consideração nesta função, aumentando a probabilidade de receber uma recompensa de acordo com o tempo.

- 3 Comportamento do jogador com outros players. Em caso de jogos online um jogador constantemente denunciado por abuso verbal ou interações tóxicas devem receber menos recompensas enquanto jogadores com bom comportamento devem ter mais chances de recompensas.

- 4 Fator aleátorio, a função deve aumentar ou diminuir as chances de acordo com as questões mencionadas, mas tentar criar uma algoritmo justo que defina o momento em que se pode dar a recompensa pode ser trabalhoso e pouco eficaz.

- 5 Tempo de login ou jogando. Levar em consideração um histórico do tempo de jogo, este parâmetro poderia ter um peso maior para identificar o nivel de interesse dos jogadores e reforçar alguns comportamentos, por exemplo, um player que passa muito tempo logado deve ter seu comportamento reforçado, enquanto um que entra pouco deve receber recompensar que lhe incentive a jogar mais. Esse fator pode ser muito complexo pois exige que se conheça os jogadores, precisando de analises e possivelmente isto levaria a um modelo de aprendizagem e poderia demandar bastante esforço mas ajudaria a definir qual o melhor momento para dar cada recompensa. 

- 6 Quantidade de jogos, vitorias, derrotas, participação de eventos, missoes concluidas...

- 7 Level da conta e das recompensas. Os prêmios devem ser o mais condizentes possível com o level do jogador.

- 8 A recompensa a ser entregue também deve denpender do momento, se ele esta recebendo após um longo tempo, ou se um bom comportamento conseguiu influenciar bastante nas chances de recebimento de recompensa, isso deve ser considerao ao definir qual será o prêmio.  

### distribuirRecompensa()
Para calcular se o usuario vai ou não receber um prêmio um número deve ser sorteado em um range, se este número for menor ou igual a soma dos parâmetros levados em consideração, então ele ganha um prêmio.

    recompensaNumero = random(100, 2000)
    tempoSemRecompensa = tempo_em_dias_desde_a_última_recompensa * x
    comportamentoPlayer = score_de_avaliacao * y
    TempoLogadoJogando = tempo_de_login_desde_a_ultima_recompensa * z
    recompensaUser = tempoSemRecompensa + comportamentoPlayer + TempoLogadoJogando
    se recompensaUser >= recompensaNumero
        dar recompensa

Em cada faixa de valores haveria uma lista de possiveis prêmios, por exemplo:

200 e 500 [espada nivel 1, armadura nivel 2, calçados especiais]
501 - 800 [armadura nivel 2, arco e flecha, poção de dano]
...
1900 - 2000 [espada lendária, escudo invencivel]

Estas poderiam ser escolhidas aleátoriamente, mas isto depende da mecânica do jogo, tudo isso são apenas exemplos, para conseguir setar estes parâmetros e escolher pesos pra cada um é preciso conhecer a dinâmica do jogo e se adaptar a ela.