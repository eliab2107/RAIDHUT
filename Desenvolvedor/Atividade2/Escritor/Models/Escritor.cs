using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atividade2.Models
{   // O objetivo é deixar os dois números iguais e após isso decrementar ambos de dois em dois
    public class Escritor
    {
        public Escritor(int numa, int numb){
            
            this.numA = numa;
            this.numB = numb;
        }
    
        public Escritor (){
        }
        public int numA {get; set;}
        public int numB {get; set;}
        public char lastChar {get; set;}
        public int difAB {get; set;} 
        public string frase {get; set;}

        //A condição para que seja possível escrever a string pedida é que {x, y E inteiros | x <= y*2+2 e y <= x*2 +2  }
        //esta função retorna se é possível ou não realizar a operação 

        public void addLetra(int num, char letra){
            //num sempre vai ser 1 ou 2
            if (num == 1){
                frase += letra;
            }else{
                frase    += letra;
                frase    += letra;
            }
            lastChar = letra;
        }

        //A lógica desta solução é tentar deixar os números de a's e b's iguais o mais rápido possível
        //Pois quando os números forem iguais a operação de adicionar na string ficará mais simples

        //Se os números forem iguais e ímpares, torna-os par e começa a adicionar na string de 4 em 4
        public string final(){
            //Garantir que o numero de a's e b's é par
            if (numA%2 == 1){
                if(lastChar == 'a'){
                    addLetra(1, 'b');
                    addLetra(1, 'a');
                    numB -= 1;
                    numA -= 1;
                }else{
                    addLetra(1, 'a');
                    addLetra(1,'b');
                    numA -= 1;
                    numB -= 1;
                }    
            }
            //Se o final da string for um a, então preciso sempre adicionar aabb até não ter mais nenhum pra adicionar
            if (lastChar == 'a'){
                while (numB > 0) {
                    addLetra(2, 'b');
                    addLetra(2, 'a');
                    numB -= 2;
                    numA -=2;
                }
             //Se o final da string for um b, então preciso sempre adicionar bbaa até não ter mais nenhum pra adicionar
            }else{
                while(numA > 0){ 
                    addLetra(2, 'a');
                    addLetra(2, 'b');
                    numB -= 2;
                    numA -= 2;
                }
            }  
            return frase;
        }
                
        //Esta função inicia o processo, sua intenção é sempre adicionar uma sequência de 2 da letra que se repetirá mais vezes e 1 da outra letra.
        //A sua outra prioridade é encontrar o momento para chamar a função final, que torna o processo mais rápido.
        //Esta solução é especialmente eficaz paras as situações em que numA e numB iniciais são próximos.
        public string inicia(){
            if (numA > (2*numB)+2 || numB > (2*numA)+2){
                return "Impossivel";
            }
            while (numA != numB && numA > 0 || numB > 0){
                difAB = numA - numB;
                if(difAB>0){  //difAB > 0 indica que numA é maior que numB
                    if (difAB <=2 && lastChar != 'a'){
                        addLetra(difAB, 'a');
                        numA -= difAB;
                        string f = final();
                    }else if (lastChar != 'a'){
                        addLetra(2, 'a');
                        numA-=2;
                    }else{
                        addLetra(1, 'b');
                        numB -= 1;
                    }
                
                }else{
                    difAB *= -1;                         //difAB é negativo se numB é maior que numA  
                    if (difAB <= 2 && lastChar != 'b'){ //lastChar != 'b' -> caso seja a primeira rodada e lastchar ainda esteja vazio
                        addLetra(difAB, 'b');
                        numB -= difAB;
                        string f = final();
                    }else if ( lastChar != 'b'){
                        addLetra(2, 'b');
                        numB -= 2;
                    }else{
                        addLetra(1, 'a');
                        numA -= 1;
                    }
                }
            }
            return frase;
        }
       
    }
}