import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuariosCriarComponent } from './pages/usuarios-criar/usuarios-criar.component';
import { UsuariosEditarComponent } from './pages/usuarios-editar/usuarios-editar.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './admin.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClientesCriarComponent } from './pages/clientes-criar/clientes-criar.component';
import { ClientesEditarComponent } from './pages/clientes-editar/clientes-editar.component';
import { ContatoGeralComponent } from './pages/contato-geral/contato-geral.component';
import { ConfiguracaoGeralComponent } from './pages/configuracao-geral/configuracao-geral.component';
import { ConfiguracaoEmailComponent } from './pages/configuracao-email/configuracao-email.component';
import { DepoimentosComponent } from './pages/depoimentos/depoimentos.component';
import { DepoimentosCriarComponent } from './pages/depoimentos-criar/depoimentos-criar.component';
import { DepoimentosEditarComponent } from './pages/depoimentos-editar/depoimentos-editar.component';
import { BannerComponent } from './pages/banner/banner.component';
import { NgxMaskModule } from 'ngx-mask';
import { BeneficiosComponent } from './pages/beneficios/beneficios.component';
import { BeneficiosCriarComponent } from './pages/beneficios-criar/beneficios-criar.component';
import { BeneficiosEditarComponent } from './pages/beneficios-editar/beneficios-editar.component';
import { PerguntasComponent } from './pages/perguntas/perguntas.component';
import { PerguntasCriarComponent } from './pages/perguntas-criar/perguntas-criar.component';
import { PerguntasEditarComponent } from './pages/perguntas-editar/perguntas-editar.component';
import { ModulosComponent } from './pages/modulos/modulos.component';
import { ModulosCriarComponent } from './pages/modulos-criar/modulos-criar.component';
import { ModulosEditarComponent } from './pages/modulos-editar/modulos-editar.component';
import { FuncionalidadesComponent } from './pages/funcionalidades/funcionalidades.component';
import { FuncionalidadesModalComponent } from './components/funcionalidades-modal/funcionalidades-modal.component';
import { ConsultoriasComponent } from './pages/consultorias/consultorias.component';
import { ConsultoriasCriarComponent } from './pages/consultorias-criar/consultorias-criar.component';
import { ConsultoriasEditarComponent } from './pages/consultorias-editar/consultorias-editar.component';

@NgModule({
  declarations: [
    HomeComponent, 
    UsuariosComponent, 
    UsuariosCriarComponent, 
    UsuariosEditarComponent, 
    HeaderComponent, 
    AdminComponent, 
    ClientesComponent, 
    ClientesCriarComponent, 
    ClientesEditarComponent, 
    ContatoGeralComponent, 
    ConfiguracaoGeralComponent, 
    ConfiguracaoEmailComponent, 
    DepoimentosComponent, 
    DepoimentosCriarComponent, 
    DepoimentosEditarComponent, 
    BannerComponent, 
    BeneficiosComponent, 
    BeneficiosCriarComponent, 
    BeneficiosEditarComponent, 
    PerguntasComponent, 
    PerguntasCriarComponent, 
    PerguntasEditarComponent, 
    ModulosComponent, 
    ModulosCriarComponent, 
    ModulosEditarComponent, 
    FuncionalidadesComponent, 
    FuncionalidadesModalComponent, 
    ConsultoriasComponent, 
    ConsultoriasCriarComponent, 
    ConsultoriasEditarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialModule,
    NgxMaskModule.forChild()
  ]
})
export class AdminModule { }
