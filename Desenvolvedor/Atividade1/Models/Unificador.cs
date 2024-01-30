using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atividade1.Models
{
    public class Unificador
    {
        public Unificador(){

        }
        public List<List<int>> intervalos {get;set;}
        public List<List<int>> novosIntervalos {get;set;}

        public bool alteracao {get;set;}
        public bool alteracao2 {get;set;}

        public bool intersecaoEsquerda(List<int> intervalo1, List<int> intervalo2 ){
            //Testa se o intervalo_1 tem uma intercecao com intervalo2 e tem um limite inferior menor
            // Exemplo Intervalo1(1,4), Intervalo2(3,6) -> (1,6) : Return true
            if (intervalo1[0] < intervalo2[0] &&  intervalo2[0] <= intervalo1[1] && intervalo1[1] <= intervalo2[1]){
                return true;
            }else{
                return false;
            }
        }

        public bool intercecao_direita(intervalo1: list, intervalo2: list){
             // Testa se o intervalo_1 tem uma intercecao com intervalo2 e tem um limite superior maior
             // Exemplo Intervalo1(3,6), Intervalo2(1,4) -> (1,6) : Return true
            if (intervalo2[0] <= intervalo1[0] && intervalo1[0] <= intervalo2[1] && intervalo2[1] < intervalo1[1]){
                return true;
            }else{
                return false;
            }
        }

        public
        
       

    }
}