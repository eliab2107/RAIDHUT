# BACKEND

## Ideia original
Com os requisitos que foram estabelecidos, ficava bem em aberto o que deveria ser feito. Levei um tempo pensando e tentando escolher algo, minha mente acabou me levando a pensar em algo simples, mas que eu mesmo gostaria de usar. A ideia era de bloco de notas online, para deixar resgitradas ideias, pensamentos, reflexões, objetivos, relatos ou qualquer coisa escrita, não seria visto por outras pessoas como uma rede social e deveria funcionar como um lugar para depositarc uma certa "bagagem mental", todas aquelas coisas legais que pensamos e logo esquecemos.

## Estrutura técnica
A principio, comecei a executar o projeto utilizando nestjs, porém, depois dos primeiros passos, perecebi que seriam apenas algumas rotas e comunicação com o BD, então optei por voltar atrás e inicar o projeto com Express, que acabou sendo uma boa decisão pois serviu muito bem as finallidades. O banco de dados escolhido foi o SQLITE, que apesar de simples poderia suprir muito bem as demandas do sistema que eu havia planejado. A todo momento deixar o código o mais modularizado possivel, evitando dependências entre escopos diferentes para principalmente aumentar a legibilidade e facilitar possiveis mudanças. 
 


## Tarefa preferida
Se eu tivesse que fazer um ranking diria que essa foi a que eu mais gostei de fazer, apesar de ter consumido mais tempo do que as demais, eu tive uma ideia interessantes para desenvolver, infelizmente não consegue concretizar tudo, me esforcei pra deixar o backend completo o mais rápido possível pois queria completar a aplicação com o frontend, um deploy e até uns testes unitários entraram nos planos. Não consegui terminar tudo que planejei, e acabei não conseguindo entregar tanto quanto desejava na task do frontend e integração,mesmo assim esta tudo aqui, até o ponto em que eu parei. Apesar disso, me sinto satisfeito pelo que consegui concluir nas outras atividades, e grato por ter participado. Agradeço a oportunidade e aguardo um retorno


## Para executar este projeto

1 npm install
2 configurar .env da seguinte maneira

SECRET_KEY = 'ASLDBZVXMJCLOQUEOPASNDASYHSOIASSCDOSNDUAEBLSONOASD'
CIPHER_KEY = 'Esta e a frase que vou transformar em chave de criptografia'
ALGORITHM = 'aes-192-cbc'

3 executar app.js
