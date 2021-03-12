import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';

const pipes = [
    FilterPipe
]

@NgModule({
    declarations: [
        ...pipes
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ...pipes
    ],
})
export class PipesModule { }
