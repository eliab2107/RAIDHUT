# Atividade 11 - Incidente com o servidor

No caso mencionado há um conjunto de arquivos com logs, como dito são vários e vários GB, analisar tudo seria um desperdicio de esforço computacional e de tempo, além de muito complicado. É simplismente um problema grande demais para ser tratado de uma vez. 

### Passo 0 - Entender o problema

É preciso saber o que aconteceu com o servidor, qual foi a mecânica, em que parte do código ela se encontra? Qual o formato do log que é gerado pelo envio dos itens? Como é possivel rastrear o quanto de itens um player deveria ter recebido? Todos deveriam ter recebido a mesma quantidade?

Se há mais de um servidor, seria interessante conferir se o mesmo problema aconteceu nos demais


### Passo 1 - Reduzir e conhecer o escopo

Trabalhar com muitos GB de informação seria dificil, então o primeiro passo é selecionar os arquivos que poderiam ter registrado o recebimento dos itens. Isto vai depender da maneira como os arquivos estavam organizados, se estavam separados por contexto, por data, por região... 
Ao conseguir separar os arquivos que armazenam esse tipo de informação, checaria se há uma data conhecida do começo desse recebimento indevido, ou se é possível delimitar também um escopo temporal dessas ocorrências, para afunilar ainda mais a quantidade de informação que será lida.

Além disso, é fundamental conferir quais são os formatos dos logs que podem estar naqueles arquivos, e qual o tipo que eu estarei procurando.
O mais importante desse passo é definir como filtrar os logs que nos interessam.


### Passo 2 - Decidir como organizar

Tendo um escopo menor, seria necessário ponderar entre organizar os logs em um banco, traduzi-los para um formato estruturado, ou realizar buscas diretamente nos arquivos de texto. A escolha disto depende bastante, se os logs seguirem um padrão o problema se torne muito mais simples, porém se os arquivos seguem padrões diferentes, a busca ficaria mais complexa. 

Ao meu ver, tentando seguir o processo de tornar um problema grande em problemas menores e trataveis, seria interessante reunir apenas o tipo de registros que são interessantes e deixa-los organizados. Após estarem em um formato conhecido, e em um banco de dados operável, encontrar uma ocorrência torna-se algo muito mais próximo do cotidiano. 

O mais importante desse passo é conseguir ter um arquivo em um formato conhecido.

### Passo 3 - Organizar a busca

Para encontrar os jogadores que receberam itens dobrados, é preciso que os arquivos contenham uma forma de identificar cada jogador. 
Após isso seria necessário como identificar os erros ocorridos, um palpite levaria a conferir jogadores com prêmios muito altos, mas isto é relativo ao modelos da mecânica, tendo conhecimento de como ela funciona seria precisar especificar uma maneira para identificar os erros. Por exemplo, se todos os jogadores devessem receber a mesma quantidade, então seria trivial identificar os erros, mas casos diferentes exigiriam buscas diferentes.

