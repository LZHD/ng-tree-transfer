import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTransferComponent } from './tree-transfer.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { StringTemplateOutletDirective } from 'ng-tree-transfer/src/string-template-outlet.directive';
var TreeTransferModule = /** @class */ (function () {
    function TreeTransferModule() {
    }
    TreeTransferModule = tslib_1.__decorate([
        NgModule({
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
    ], TreeTransferModule);
    return TreeTransferModule;
}());
export { TreeTransferModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS10cmFuc2Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy10cmVlLXRyYW5zZmVyLyIsInNvdXJjZXMiOlsic3JjL3RyZWUtdHJhbnNmZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLHVEQUF1RCxDQUFDO0FBZ0JwRztJQUFBO0lBQWtDLENBQUM7SUFBdEIsa0JBQWtCO1FBZDlCLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDWixxQkFBcUI7Z0JBQ3JCLDZCQUE2QjthQUM5QjtZQUNELE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsaUJBQWlCO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHFCQUFxQjthQUN0QjtTQUNGLENBQUM7T0FDVyxrQkFBa0IsQ0FBSTtJQUFELHlCQUFDO0NBQUEsQUFBbkMsSUFBbUM7U0FBdEIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1RyZWVUcmFuc2ZlckNvbXBvbmVudH0gZnJvbSAnLi90cmVlLXRyYW5zZmVyLmNvbXBvbmVudCc7XG5pbXBvcnQge05nWm9ycm9BbnRkTW9kdWxlfSBmcm9tICduZy16b3Jyby1hbnRkJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7U3RyaW5nVGVtcGxhdGVPdXRsZXREaXJlY3RpdmV9IGZyb20gJ25nLXRyZWUtdHJhbnNmZXIvc3JjL3N0cmluZy10ZW1wbGF0ZS1vdXRsZXQuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVHJlZVRyYW5zZmVyQ29tcG9uZW50LFxuICAgIFN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTmdab3Jyb0FudGRNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRyZWVUcmFuc2ZlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVUcmFuc2Zlck1vZHVsZSB7IH1cbiJdfQ==