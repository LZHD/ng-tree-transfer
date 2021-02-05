import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTreeModule } from 'ng-zorro-antd/tree';

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
