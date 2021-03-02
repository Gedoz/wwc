import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContatoGeral } from 'src/app/models/contato-geral.model';
import { ContatoGeralService } from 'src/app/services/admin/contato-geral.service';
import { HelperService, ViaCEP } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-contato-geral',
  templateUrl: './contato-geral.component.html',
  styleUrls: ['./contato-geral.component.scss']
})
export class ContatoGeralComponent implements OnInit {
  data: ContatoGeral = new ContatoGeral();

  loading: boolean = false;

  phoneMask: string = '(00) 0000-00009';

  constructor(
    public contatoGeralService: ContatoGeralService,
    public helper: HelperService,
    public loadingService: LoadingService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    this.buscar();
  }

  submit(f: NgForm) {
    if (f.invalid) {
      this.helper.formMarkAllTouched(f);
      this.helper.openSnackBar('Preencha os campos requiridos, por favor!');
      return;
    }

    this.loadingService.present('Alterando cadastro geral...');

    this.contatoGeralService.alterarGeral(this.data)
      .subscribe((res: any) => {
        this.router.navigate(['/admin']).then(() => {
          this.helper.openSnackBar('Contato geral alterado com sucesso.');
          this.loadingService.dismiss();
        })
      }, e => this.loadingService.dismiss());

  }

  buscar() {
    this.contatoGeralService.buscarGeral()
      .subscribe((res: ContatoGeral) => this.data = res);
  }

  changePhoneMask(event) {
    let val = event;
    if (!val) {
      return;
    }
    if (val.replace(/\D/g, '').substring(0, 4) == "0800") {
      this.phoneMask = '0000 000 0000';
    } else {
      if (val.replace(/\D/g, '').length === 11) {
        this.phoneMask = '(00) 0 0000-0000';
      } else {
        this.phoneMask = '(00) 0000-00009';
      }
    }
  }

  @ViewChild('numeroEnderecoInput', { static: false }) numeroEnderecoInput: ElementRef;
  onCepBlur(e) {
    if (this.data.cep.length == 8) {
      this.helper.viaCep(this.data.cep).subscribe((res: ViaCEP) => {
        this.data.bairro = res.bairro;
        this.data.uf = res.uf;
        this.data.cidade = res.localidade;
        this.data.rua = res.logradouro;
        this.numeroEnderecoInput.nativeElement.focus();
      });
    }
  }

}
