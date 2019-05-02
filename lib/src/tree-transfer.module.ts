import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeTransferComponent} from './tree-transfer.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {StringTemplateOutletDirective} from 'ng-tree-transfer/src/string-template-outlet.directive';

@NgModule({
  declarations: [
    TreeTransferComponent,
    StringTemplateOutletDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  exports: [
    TreeTransferComponent
  ]
})
export class TreeTransferModule { }
