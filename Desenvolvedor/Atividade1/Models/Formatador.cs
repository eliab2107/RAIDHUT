using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atividade1.Models
{
    public class Formatador{
        public Formatador(){
            
        }
        public static List<List<int>> ConverterStringParaListaDeListas(string entrada){
            List<List<int>> listaDeListas = new List<List<int>>();

            // Removendo os ()
            string[] pares = entrada.Trim('(', ')').Split("),(");

            foreach (var par in pares){
                // Dividindo os pares e convertendo para inteiros
                string[] numeros = par.Split(",");
                List<int> lista = new List<int>(numeros.Length);

                foreach (var numero in numeros){
                    if (int.TryParse(numero, out int valor)){
                        lista.Add(valor);
                    }
                }
                listaDeListas.Add(lista);
            }
            return listaDeListas;
        }
    }
}