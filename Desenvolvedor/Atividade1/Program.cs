using System;
using System.Collections.Generic;
using Atividade1.Models;

class Program
{
    static void Main()

    {
        Formatador formatador = new Formatador();
        string entrada = Console.ReadLine();

        List<List<int>> intervalos = Formatador.ConverterStringParaListaDeListas(entrada);
        Console.WriteLine(intervalos);
        
        foreach (var lista in intervalos)
        {
            Console.WriteLine($"[{string.Join(", ", lista)}]");
        }
    }

   
}
