import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {TreeTransferComponent} from './tree-transfer.component';
import {StringTemplateOutletDirective} from './string-template-outlet.directive';

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
