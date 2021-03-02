import { Cliente } from 'src/app/models/cliente.model';
import { ClientesApi, ClienteService } from 'src/app/services/admin/cliente.service';
// default
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { GlobalService } from 'src/app/services/global.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'imagem', '1', '2', 'actions'];
  // imagem, nome, link
  data: Cliente[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  search: string;
  filterSubscription: Subscription;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  selection = new SelectionModel<Cliente>(true, []);

  constructor(
    public global: GlobalService,
    public clienteService: ClienteService,
    public dialog: MatDialog,
    public helper: HelperService,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.buscar();
  }

  buscar() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.clienteService.get(this.paginator.pageIndex + 1, this.paginator.pageSize, this.sort.active, this.sort.direction.toLocaleUpperCase(), this.search);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.selection.clear();
          this.resultsLength = data.numeroPaginas * this.paginator.pageSize;
          return data.clientes;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          this.selection.clear();
          return observableOf([]);
        })
      ).subscribe(data => {
        this.data = data;
      });
  }

  deletarData(item: Cliente) {
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
        this.clienteService.delete(item).subscribe((res: any) => {
          this.helper.openSnackBar('Item removido com sucesso.');
          this.loadingService.dismiss();
          this.buscar();
        }, e => this.loadingService.dismiss());
      }
    })
  }

  deletarDatas() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Excluir itens',
        description: 'Você realmente quer excluir esses itens? Esse processe não pode ser desfeito.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.clienteService.deleteSelected(this.selection.selected).subscribe((res: any) => {
          this.loadingService.present('Excluindo itens');
          this.helper.openSnackBar('Itens removidos com sucesso.');
          this.loadingService.dismiss();
          this.buscar();
        }, e => this.loadingService.dismiss());
      }
    })
  }

  filter(e) {
    if (this.paginator.pageIndex > 1) {
      this.paginator.pageIndex = 0;
    }
    if (e) {
      if (this.filterSubscription && !this.filterSubscription.closed) {
        this.filterSubscription.unsubscribe();
      }
      this.filterSubscription = this.clienteService.get(this.paginator.pageIndex + 1, this.paginator.pageSize, this.sort.active, this.sort.direction.toLocaleUpperCase(), e.toLocaleLowerCase())
        .subscribe((res: ClientesApi) => {
          this.data = this.paginator.pageIndex == 0 ? res.clientes : this.data.concat(res.clientes);
        });
    } else {
      this.buscar();
    }
  }

  clearFilter() {
    this.search = '';
    this.buscar();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
