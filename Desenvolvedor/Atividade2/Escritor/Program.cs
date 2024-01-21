
using Atividade2.Models;
using System;  // Certifique-se de incluir o namespace System Console.WriteLine("Digite o primeiro número:");

string input1 = Console.ReadLine();
int numA = string.IsNullOrEmpty(input1) ? 0 : int.Parse(input1);

string input2 = Console.ReadLine();
int numB = string.IsNullOrEmpty(input2) ? 0 : int.Parse(input2);

string frase = "";
Escritor escritor = new Escritor(numA, numB);

frase = escritor.inicia();
Console.WriteLine(frase);