import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTransferComponent } from './tree-transfer.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { StringTemplateOutletDirective } from 'ng-tree-transfer/src/string-template-outlet.directive';
let TreeTransferModule = class TreeTransferModule {
};
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
export { TreeTransferModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS10cmFuc2Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy10cmVlLXRyYW5zZmVyLyIsInNvdXJjZXMiOlsic3JjL3RyZWUtdHJhbnNmZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLHVEQUF1RCxDQUFDO0FBZ0JwRyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFJLENBQUE7QUFBdEIsa0JBQWtCO0lBZDlCLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRTtZQUNaLHFCQUFxQjtZQUNyQiw2QkFBNkI7U0FDOUI7UUFDRCxPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osV0FBVztZQUNYLGlCQUFpQjtTQUNsQjtRQUNELE9BQU8sRUFBRTtZQUNQLHFCQUFxQjtTQUN0QjtLQUNGLENBQUM7R0FDVyxrQkFBa0IsQ0FBSTtTQUF0QixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7VHJlZVRyYW5zZmVyQ29tcG9uZW50fSBmcm9tICcuL3RyZWUtdHJhbnNmZXIuY29tcG9uZW50JztcbmltcG9ydCB7Tmdab3Jyb0FudGRNb2R1bGV9IGZyb20gJ25nLXpvcnJvLWFudGQnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtTdHJpbmdUZW1wbGF0ZU91dGxldERpcmVjdGl2ZX0gZnJvbSAnbmctdHJlZS10cmFuc2Zlci9zcmMvc3RyaW5nLXRlbXBsYXRlLW91dGxldC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUcmVlVHJhbnNmZXJDb21wb25lbnQsXG4gICAgU3RyaW5nVGVtcGxhdGVPdXRsZXREaXJlY3RpdmVcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBOZ1pvcnJvQW50ZE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVHJlZVRyYW5zZmVyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVHJlZVRyYW5zZmVyTW9kdWxlIHsgfVxuIl19