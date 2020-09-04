<template>
    <div class="text-center">
        <section id="hero">
             <v-row
                  align="center"
                  class="mx-auto"
                  justify="center"
                >
                <div >
                    <h2>Validador e Gerador de CPF</h2>
                            
                    <v-text-field
                        id="CPF"                    
                        placeholder="Digite o CPF"
                        outlined
                        clearable     
                        autofocus
                        :success="valido == 'ok'" 
                        :error="valido == 'nok'"
                        v-model="CPF"
                        :prepend-inner-icon="icone"            
                        :messages="resposta"                   
                    ></v-text-field>
                        
                    <v-btn color="primary" class="mr-2" @click="validar"><v-icon left>mdi-check</v-icon>Validar</v-btn>
                    <v-btn color="success"  @click="gerarCPF"><v-icon left>mdi-flash</v-icon> Gerar </v-btn>
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
                    <h3>O que é CPF ?</h3>
                    CPF - Cadastro de Pessoa Física - 
                    é um número que identifica uma pessoa junto a Receita Federal do Brasil.
                    É uma identificação única da pessoa para o Brasil. <br>
                    Vale ressaltar que a validação é realizada de acordo com o algoritmo do CPF
                     o que significa que um número válido não necessariamente é um número existente e 
                     com situação cadastral regular perante a Receita Federal. <br>
                    Mais informações, consulte: <br>
                    <a href="http://receita.economia.gov.br/contato/fale-conosco/cidadao/cpf" 
                       target="_blank"> Receita Federal - Ministério da Economia</a>
                    

                </v-responsive>  
            </v-container>
        </section>
    </div>
</template>

<script>
export default {
    name: 'validarCPF',
    data(){
        return{
            CPF: '',                   
            resposta: '',
            comPontos: false,   
            valido: '',
            icone: 'mdi-credit-card-multiple-outline'         
        }
    },
    methods:{
        validarCPF(cpf) {	
            let i
            let rev
            
            cpf = cpf.replace(/[^\d]+/g,'');	
            if(cpf == '') return false;	
            
            // Elimina CPFs invalidos conhecidos	
            if (cpf.length != 11 || 
                cpf == "00000000000" || 
                cpf == "11111111111" || 
                cpf == "22222222222" || 
                cpf == "33333333333" || 
                cpf == "44444444444" || 
                cpf == "55555555555" || 
                cpf == "66666666666" || 
                cpf == "77777777777" || 
                cpf == "88888888888" || 
                cpf == "99999999999")
                    return false;		
            
            // Valida 1o digito	
            let add = 0;	            
            for (i=0; i < 9; i ++)		
                add += parseInt(cpf.charAt(i)) * (10 - i);	
                rev = 11 - (add % 11);	
                if (rev == 10 || rev == 11)		
                    rev = 0;	
                if (rev != parseInt(cpf.charAt(9)))		
                    return false;		
            
            // Valida 2o digito	
            add = 0;	
            for (i = 0; i < 10; i ++)		
                add += parseInt(cpf.charAt(i)) * (11 - i);	
            rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)	
                rev = 0;	
            if (rev != parseInt(cpf.charAt(10)))
                return false;		
            return true;   
        },
        randomiza(n){
            return Math.round(Math.random()*n);            
        },
        mod(dividendo,divisor){
            return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
        },
        gerarCPF(){           			  
            const n = 9;
            const n1 = this.randomiza(n);
            const n2 = this.randomiza(n);
            const n3 = this.randomiza(n);
            const n4 = this.randomiza(n);
            const n5 = this.randomiza(n);
            const n6 = this.randomiza(n);
            const n7 = this.randomiza(n);
            const n8 = this.randomiza(n);
            const n9 = this.randomiza(n);
            
            let d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
            d1 = 11 - ( this.mod(d1,11) );
            if (d1>=10) d1 = 0;
            
            let d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
            d2 = 11 - ( this.mod(d2,11) );
            if (d2>=10) d2 = 0;                								
            
            this.CPF = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
						
            this.formatar()
            this.comSucesso()
            this.resposta = 'CPF GERADO'            

        },
        validar(){                        
            this.validarCPF(this.CPF) ? this.comSucesso() : this.comErro()
        },
        comErro(){
            this.valido = 'nok'
            this.icone = 'mdi-credit-card-remove-outline'
            this.resposta = 'CPF INVÁLIDO'
        },
        comSucesso(){
            this.valido = 'ok'
            this.icone = 'mdi-credit-card-check-outline'
            this.resposta = 'CPF VÁLIDO'
        },
        formatar(){
            if (this.comPontos){             
                this.CPF = this.CPF.substring(0,3) + '.' + this.CPF.substring(3,6) + '.' + this.CPF.substring(6,9) + '-' + this.CPF.substring(9,11)
            }else{
                this.CPF = this.CPF.replace(/[^\d]+/g,'');
            }
        }
    },
    watch:{
        CPF(){
            if(this.CPF == null){
                this.valido = ''
                this.icone = 'mdi-credit-card-multiple-outline'
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

</style>