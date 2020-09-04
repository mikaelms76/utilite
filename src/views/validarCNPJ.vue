<template>
    <div class="text-center">
        <section id="hero">
             <v-row
                  align="center"
                  class="mx-auto"
                  justify="center"
                >
                <div >
                    <h2>Validador e Gerador de CNPJ</h2>
                            
                    <v-text-field
                        id="CNPJ"                    
                        placeholder="Digite o CNPJ"
                        outlined
                        clearable     
                        autofocus
                        :success="valido == 'ok'" 
                        :error="valido == 'nok'"
                        v-model="cnpj"
                        :prepend-inner-icon="icone"            
                        :messages="resposta"                   
                    ></v-text-field>
                        
                    <v-btn color="primary" class="mr-2" @click="validar"><v-icon left>mdi-check</v-icon>Validar</v-btn>
                    <v-btn color="success"  @click="gerarCNPJ"><v-icon left>mdi-flash</v-icon> Gerar </v-btn>
                    <v-row justify="space-around">
                    <v-switch
                        v-model="comPontos"
                        class="ma-1"
                        label="Campo formatado"
                        align
                    ></v-switch>
                    </v-row>
                    
                </div>
             </v-row>
        </section>
        <div class="py-6"></div>
        <v-divider></v-divider>
        <section id="sobre">
            <div class="py-6"></div>
            <v-container>
                <v-responsive 
                    class="mx-auto title font-weight-light mb-8"
                    max-width="720"
                >
                    <h3>O que é CNPJ ?</h3>
                    <p>
                    CNPJ - Cadastro Nacional da Pessoa Jurídica - 
                    é um número que identifica uma empresa junto a Receita Federal do Brasil.
                    É uma identificação única da empresa no Brasil. <br>
                    Vale ressaltar que a validação é realizada de acordo com o algoritmo do CNPJ
                     o que significa que um número válido não necessariamente é um número existente e 
                     com situação cadastral regular perante a Receita Federal. <br>
                    Mais informações, consulte: <br>
                    <a href="http://receita.economia.gov.br/orientacao/tributaria/cadastros/cadastro-nacional-de-pessoas-juridicas-cnpj" 
                       target="_blank"> Receita Federal - Ministério da Economia</a>
                    </p>

                </v-responsive>  
            </v-container>
        </section>
    </div>
</template>

<script>
export default {
    name: 'validarCNPJ',
    data(){
        return{
            cnpj: '',                   
            resposta: '',
            comPontos: false,   
            valido: '',
            icone: 'mdi-credit-card-multiple'         
        }
    },
    methods:{
        validarCNPJ(cnpj){    
            
            cnpj = cnpj.replace(/[^\d]+/g,'');
            if(cnpj == '') {return false}
            
            if (cnpj.length != 14) { return false }
        
            // Elimina CNPJs invalidos conhecidos
            if (cnpj == "00000000000000" || 
                cnpj == "11111111111111" || 
                cnpj == "22222222222222" || 
                cnpj == "33333333333333" || 
                cnpj == "44444444444444" || 
                cnpj == "55555555555555" || 
                cnpj == "66666666666666" || 
                cnpj == "77777777777777" || 
                cnpj == "88888888888888" || 
                cnpj == "99999999999999"){
                return false
            }
                
            // Valida DVs
            let tamanho = cnpj.length - 2
            let numeros = cnpj.substring(0,tamanho)
            let digitos = cnpj.substring(tamanho)
            let soma = 0
            let pos = tamanho - 7

            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2){ pos = 9 }
            }
            
            let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)){ return false }
                
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;
            
            for (let i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--
                if (pos < 2) { pos = 9 }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1)){ return false }
            
            return true
            
            
        },
        randomiza(n){
            return Math.round(Math.random()*n);            
        },
        mod(dividendo,divisor){
        return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
        },
        gerarCNPJ(){
            const n = 9
            const n1 = this.randomiza(n)
            const n2 = this.randomiza(n)
            const n3 = this.randomiza(n)
            const n4 = this.randomiza(n)
            const n5 = this.randomiza(n)
            const n6 = this.randomiza(n)
            const n7 = this.randomiza(n)
            const n8 = this.randomiza(n)
            const n9 = 0
            const n10 = 0
            const n11 = 0
            const n12 = 1
            
            let d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5
           
            d1 = 11 - ( this.mod(d1,11) )            
            if (d1 >= 10){ d1 = 0}
           
            let d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6
            d2 = 11 - ( this.mod(d2,11) )
            
            if (d2>=10){ d2 = 0}            
            
            this.cnpj = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+d1+d2
            this.formatar()
            this.comSucesso()
            this.resposta = 'CNPJ GERADO'            

        },
        validar(){                        
            this.validarCNPJ(this.cnpj) ? this.comSucesso() : this.comErro()
        },
        comErro(){
            this.valido = 'nok'
            this.icone = 'mdi-credit-card-remove'
            this.resposta = 'CNPJ INVÁLIDO'
        },
        comSucesso(){
            this.valido = 'ok'
            this.icone = 'mdi-credit-card-check'
            this.resposta = 'CNPJ VÁLIDO'
        },
        formatar(){
            if (this.comPontos){             
                this.cnpj = this.cnpj.substring(0,2) + '.' + this.cnpj.substring(2,5) + '.' + this.cnpj.substring(5,8) + '/' + this.cnpj.substring(8,12) + '-' + this.cnpj.substring(12,14)
            }else{
                this.cnpj = this.cnpj.replace(/[^\d]+/g,'');
            }
        }
    },
    watch:{
        cnpj(){
            if(this.cnpj == null){
                this.valido = ''
                this.icone = 'mdi-credit-card-multiple'
                this.resposta = ''
            }
        },
        comPontos(){
           this.formatar()        
        }
    }
}
</script>

<style>
    p{
        font-size: 15px;
        color: dimgray
    }
</style>