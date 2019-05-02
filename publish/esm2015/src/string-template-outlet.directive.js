import * as tslib_1 from "tslib";
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
let StringTemplateOutletDirective = class StringTemplateOutletDirective {
    constructor(viewContainer, defaultTemplate) {
        this.viewContainer = viewContainer;
        this.defaultTemplate = defaultTemplate;
        this.inputTemplate = null;
        this.inputViewRef = null;
        this.defaultViewRef = null;
    }
    set stringTemplateOutlet(value) {
        if (value instanceof TemplateRef) {
            this.isTemplate = true;
            this.inputTemplate = value;
        }
        else {
            this.isTemplate = false;
        }
        this.updateView();
    }
    updateView() {
        if (!this.isTemplate) {
            /** use default template when input is string **/
            if (!this.defaultViewRef) {
                this.viewContainer.clear();
                this.inputViewRef = null;
                if (this.defaultTemplate) {
                    this.defaultViewRef = this.viewContainer.createEmbeddedView(this.defaultTemplate);
                }
            }
        }
        else {
            /** use input template when input is templateRef **/
            if (!this.inputViewRef) {
                this.viewContainer.clear();
                this.defaultViewRef = null;
                if (this.inputTemplate) {
                    this.inputViewRef = this.viewContainer.createEmbeddedView(this.inputTemplate);
                }
            }
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], StringTemplateOutletDirective.prototype, "stringTemplateOutlet", null);
StringTemplateOutletDirective = tslib_1.__decorate([
    Directive({
        selector: '[stringTemplateOutlet]'
    }),
    tslib_1.__metadata("design:paramtypes", [ViewContainerRef, TemplateRef])
], StringTemplateOutletDirective);
export { StringTemplateOutletDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXRlbXBsYXRlLW91dGxldC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy10cmVlLXRyYW5zZmVyLyIsInNvdXJjZXMiOlsic3JjL3N0cmluZy10ZW1wbGF0ZS1vdXRsZXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFtQixLQUFLLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSy9GLElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQTZCO0lBT3hDLFlBQW9CLGFBQStCLEVBQVUsZUFBa0M7UUFBM0Usa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQW1CO1FBSnZGLGtCQUFhLEdBQTZCLElBQUksQ0FBQztRQUMvQyxpQkFBWSxHQUFpQyxJQUFJLENBQUM7UUFDbEQsbUJBQWMsR0FBaUMsSUFBSSxDQUFDO0lBRXNDLENBQUM7SUFHbkcsSUFBSSxvQkFBb0IsQ0FBQyxLQUFpQztRQUN4RCxJQUFJLEtBQUssWUFBWSxXQUFXLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsaURBQWlEO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUNuRjthQUNGO1NBQ0Y7YUFBTTtZQUNMLG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDL0U7YUFDRjtTQUNGO0lBQ0gsQ0FBQztDQUVGLENBQUE7QUFoQ0M7SUFEQyxLQUFLLEVBQUU7Ozt5RUFTUDtBQWxCVSw2QkFBNkI7SUFIekMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtLQUNuQyxDQUFDOzZDQVFtQyxnQkFBZ0IsRUFBMkIsV0FBVztHQVA5RSw2QkFBNkIsQ0EwQ3pDO1NBMUNZLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbWJlZGRlZFZpZXdSZWYsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzdHJpbmdUZW1wbGF0ZU91dGxldF0nXG59KVxuZXhwb3J0IGNsYXNzIFN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlIHtcblxuICBwcml2YXRlIGlzVGVtcGxhdGU6IGJvb2xlYW47XG4gIHByaXZhdGUgaW5wdXRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpbnB1dFZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGRlZmF1bHRWaWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgZGVmYXVsdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx2b2lkPikge31cblxuICBASW5wdXQoKVxuICBzZXQgc3RyaW5nVGVtcGxhdGVPdXRsZXQodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHRoaXMuaXNUZW1wbGF0ZSA9IHRydWU7XG4gICAgICB0aGlzLmlucHV0VGVtcGxhdGUgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1RlbXBsYXRlID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICB9XG5cbiAgdXBkYXRlVmlldygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNUZW1wbGF0ZSkge1xuICAgICAgLyoqIHVzZSBkZWZhdWx0IHRlbXBsYXRlIHdoZW4gaW5wdXQgaXMgc3RyaW5nICoqL1xuICAgICAgaWYgKCF0aGlzLmRlZmF1bHRWaWV3UmVmKSB7XG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICB0aGlzLmlucHV0Vmlld1JlZiA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuZGVmYXVsdFZpZXdSZWYgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuZGVmYXVsdFRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvKiogdXNlIGlucHV0IHRlbXBsYXRlIHdoZW4gaW5wdXQgaXMgdGVtcGxhdGVSZWYgKiovXG4gICAgICBpZiAoIXRoaXMuaW5wdXRWaWV3UmVmKSB7XG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICB0aGlzLmRlZmF1bHRWaWV3UmVmID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuaW5wdXRWaWV3UmVmID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmlucHV0VGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==