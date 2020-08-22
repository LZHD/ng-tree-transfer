import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule, NzButtonModule, NzInputModule, NzCheckboxModule, NzTreeModule } from 'ng-zorro-antd';
import { TreeTransferComponent } from './tree-transfer.component';
import { StringTemplateOutletDirective } from './string-template-outlet.directive';

@NgModule({
  declarations: [
    TreeTransferComponent,
    StringTemplateOutletDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    NzTreeModule
  ],
  exports: [
    TreeTransferComponent
  ]
})
export class TreeTransferModule { }
