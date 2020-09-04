import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import validarCNPJ from '../views/validarCNPJ.vue'
import validarCPF from '../views/validarCPF.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/validar-cnpj', name: 'validarCNPJ', component: validarCNPJ },  
  { path: '/validar-cpf', name: 'validarCPF', component: validarCPF },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
