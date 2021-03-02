import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './pages/banner/banner.component';
import { BeneficiosCriarComponent } from './pages/beneficios-criar/beneficios-criar.component';
import { BeneficiosEditarComponent } from './pages/beneficios-editar/beneficios-editar.component';
import { BeneficiosComponent } from './pages/beneficios/beneficios.component';
import { ClientesCriarComponent } from './pages/clientes-criar/clientes-criar.component';
import { ClientesEditarComponent } from './pages/clientes-editar/clientes-editar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ConfiguracaoEmailComponent } from './pages/configuracao-email/configuracao-email.component';
import { ConfiguracaoGeralComponent } from './pages/configuracao-geral/configuracao-geral.component';
import { ConsultoriasCriarComponent } from './pages/consultorias-criar/consultorias-criar.component';
import { ConsultoriasEditarComponent } from './pages/consultorias-editar/consultorias-editar.component';
import { ConsultoriasComponent } from './pages/consultorias/consultorias.component';
import { ContatoGeralComponent } from './pages/contato-geral/contato-geral.component';
import { DepoimentosCriarComponent } from './pages/depoimentos-criar/depoimentos-criar.component';
import { DepoimentosEditarComponent } from './pages/depoimentos-editar/depoimentos-editar.component';
import { DepoimentosComponent } from './pages/depoimentos/depoimentos.component';
import { HomeComponent } from './pages/home/home.component';
import { ModulosCriarComponent } from './pages/modulos-criar/modulos-criar.component';
import { ModulosEditarComponent } from './pages/modulos-editar/modulos-editar.component';
import { ModulosComponent } from './pages/modulos/modulos.component';
import { PerguntasCriarComponent } from './pages/perguntas-criar/perguntas-criar.component';
import { PerguntasEditarComponent } from './pages/perguntas-editar/perguntas-editar.component';
import { PerguntasComponent } from './pages/perguntas/perguntas.component';
import { UsuariosCriarComponent } from './pages/usuarios-criar/usuarios-criar.component';
import { UsuariosEditarComponent } from './pages/usuarios-editar/usuarios-editar.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'usuarios/adicionar', component: UsuariosCriarComponent },
    { path: 'usuarios/editar/:id', component: UsuariosEditarComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'clientes/adicionar', component: ClientesCriarComponent },
    { path: 'clientes/editar/:id', component: ClientesEditarComponent },
    { path: 'depoimentos', component: DepoimentosComponent },
    { path: 'depoimentos/adicionar', component: DepoimentosCriarComponent },
    { path: 'depoimentos/editar/:id', component: DepoimentosEditarComponent },
    { path: 'configuracao-email', component: ConfiguracaoEmailComponent },
    { path: 'configuracao-geral', component: ConfiguracaoGeralComponent },
    { path: 'contato-geral', component: ContatoGeralComponent },
    { path: 'banner', component: BannerComponent },
    { path: 'beneficios', component: BeneficiosComponent },
    { path: 'beneficios/adicionar', component: BeneficiosCriarComponent },
    { path: 'beneficios/editar/:id', component: BeneficiosEditarComponent },
    { path: 'perguntas', component: PerguntasComponent },
    { path: 'perguntas/adicionar', component: PerguntasCriarComponent },
    { path: 'perguntas/editar/:id', component: PerguntasEditarComponent },
    { path: 'modulos', component: ModulosComponent },
    { path: 'modulos/adicionar', component: ModulosCriarComponent },
    { path: 'modulos/editar/:id', component: ModulosEditarComponent },
    { path: 'consultorias', component: ConsultoriasComponent },
    { path: 'consultorias/adicionar', component: ConsultoriasCriarComponent },
    { path: 'consultorias/editar/:id', component: ConsultoriasEditarComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
