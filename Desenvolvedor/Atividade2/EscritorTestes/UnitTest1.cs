using Atividade2.Models;
using Xunit;
namespace EscritorTestes;

[Collection("Testes")]
public class EscritorTestes
{
    private Escritor _escritor;
    
    public EscritorTestes(){
        _escritor = new Escritor();
    }

    [Theory]
    [InlineData(5, 12)]  // a = 2, b = 3, resultado esperado = 5
    [InlineData(3, 5)] // a = -1, b = 5, resultado esperado = 4
    [InlineData(1, 2)]  // a = 0, b = 0, resultado esperado = 0
    [InlineData(7, 4)]  // a = 2, b = 3, resultado esperado = 5
    [InlineData(0,2)] // a = -1, b = 5, resultado esperado = 4
    [InlineData(1,3)]  // a = 0, b = 0, resultado esperado = 0
    [InlineData(74, 150)]  // a = 2, b = 3, resultado esperado = 5
    [InlineData(1000, 2002)] // a = -1, b = 5, resultado esperado = 4
    [InlineData(90, 44)]  // a = 0, b = 0, resultado esperado = 0
    public void testComQuantidadesCertas(int numA, int numB)
    {
        //Conta os números de As e Bs na frase final
        int contA = 0;
        int contB = 0;

        //Define se há uma sequência de pelo menos 3 caracteres iguais
        bool aaaOrbbb = false;
        string lastTwoChars = "";

        //Total de letras esperadas na frase
        int tot = numA + numB;
        _escritor.numA = numA;
        _escritor.numB = numB;
        string  frase = _escritor.inicia();
        Console.WriteLine(frase);
        foreach (char letra in frase)
        {
            if (letra == 'a')
            {
                contA++;    
                //começa a juntas as de novo
                if(lastTwoChars == "b" || lastTwoChars == "bb")
                    lastTwoChars = "a"; 
                //juntou 3 a consecutivos
                else if (lastTwoChars == "aa"){
                    aaaOrbbb = true; 
                    lastTwoChars += 'a';
                }else{
                    lastTwoChars += 'a';
                }
            }else{
                lastTwoChars += 'b';
                contB++;    
                //começa a juntas as de novo
                if(lastTwoChars == "a" || lastTwoChars == "aa")
                    lastTwoChars = "b"; 
                //juntou 3 a consecutivos
                else if (lastTwoChars == "bb"){
                    aaaOrbbb = true; 
                    lastTwoChars += 'b';
                }else{
                    lastTwoChars += 'b';
                }
            }          
        }
        Assert.Equal(tot,frase.Length);
        Assert.Equal(contA, numA);
        Assert.Equal(contB, numB);
        Assert.Equal(false, aaaOrbbb);
    }



    [Theory]
    [InlineData(5, 15)] 
    [InlineData(9, 3)] 
    [InlineData(0, 3)]  
    [InlineData(7, 2)]  
    [InlineData(3,0)] 
    public void testComQuantidadesErradas(int numA, int numB)
    {
       
        _escritor.numA = numA;
        _escritor.numB = numB;
        string  frase = _escritor.inicia();
       
        Assert.Equal("Impossivel",frase);
    }
    
}