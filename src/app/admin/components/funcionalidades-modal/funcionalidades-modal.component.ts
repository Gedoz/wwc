import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Funcionalidade } from 'src/app/models/funcionalidade.model';
import { FuncionalidadeService } from 'src/app/services/admin/funcionalidade.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-funcionalidades-modal',
  templateUrl: './funcionalidades-modal.component.html',
  styleUrls: ['./funcionalidades-modal.component.scss']
})
export class FuncionalidadesModalComponent implements OnInit {

  funcionalidade: Funcionalidade = new Funcionalidade();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public funcionalidadeService: FuncionalidadeService,
    public helper: HelperService,
    public loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: Funcionalidade
  ) {
  }

  ngOnInit(): void {
    if (this.data.funcionalidade) {
      this.funcionalidade = this.data.funcionalidade;
    }
  }

  submit() {
    if (!this.funcionalidade.descricao) {
      this.helper.openSnackBar('Preencha uma descrição para continuar');
      return;
    }

    if (!this.funcionalidade.id) {
      const data = {
        ...this.funcionalidade,
        idModulo: this.data.idModulo,
      }
      this.loadingService.present('Adicionando...');
      this.funcionalidadeService.post(data)
        .subscribe(res => {
          this.dialogRef.close(true);
          this.loadingService.dismiss()
        }, e => this.loadingService.dismiss());
    } else {
      this.loadingService.present('Alterando...');
      this.funcionalidadeService.patch(this.funcionalidade)
        .subscribe(res => {
          this.dialogRef.close(true);
          this.loadingService.dismiss()
        }, e => this.loadingService.dismiss());
    }

  }

  dismiss() {
    this.dialogRef.close();
  }
}
