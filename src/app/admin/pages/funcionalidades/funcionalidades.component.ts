// default
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Funcionalidade } from 'src/app/models/funcionalidade.model';
import { FuncionalidadeService } from 'src/app/services/admin/funcionalidade.service';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';
import { FuncionalidadesModalComponent } from '../../components/funcionalidades-modal/funcionalidades-modal.component';

@Component({
  selector: 'app-funcionalidades',
  templateUrl: './funcionalidades.component.html',
  styleUrls: ['./funcionalidades.component.scss']
})
export class FuncionalidadesComponent implements OnInit, AfterViewInit {

  @Input('idModulo') idModulo: number;

  displayedColumns: string[] = ['1', 'actions'];
  // imagem, nome, descricao 
  data: Funcionalidade[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  search: string;
  filterSubscription: Subscription;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    public global: GlobalService,
    public funcionalidadeService: FuncionalidadeService,
    public dialog: MatDialog,
    public helper: HelperService,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.buscar();
  }

  buscar() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.funcionalidadeService.get(this.idModulo, this.search);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.length;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.data = data;
      });
  }

  deletarData(item: Funcionalidade) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir item',
        description: 'Você realmente quer excluir esse item? Esse processe não pode ser desfeito.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingService.present('Excluindo item...');
        this.funcionalidadeService.delete(item).subscribe((res: any) => {
          this.helper.openSnackBar('Item removido com sucesso.');
          this.loadingService.dismiss();
          this.buscar();
        }, e => this.loadingService.dismiss());
      }
    })
  }

  filter(e) {
    if (e) {
      if (this.filterSubscription && !this.filterSubscription.closed) {
        this.filterSubscription.unsubscribe();
      }
      this.filterSubscription = this.funcionalidadeService.get(this.idModulo, e.toLocaleLowerCase())
        .subscribe(res => this.data = res);
    } else {
      this.buscar();
    }
  }

  clearFilter() {
    this.search = '';
    this.buscar();
  }

  openModal(item?: Funcionalidade) {
    const dialogRef = this.dialog.open(FuncionalidadesModalComponent, {
      width: '640px',
      data: {
        funcionalidade: item ? item : null,
        idModulo: this.idModulo,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buscar();
      }
    })
  }

}
