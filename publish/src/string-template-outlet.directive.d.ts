import { TemplateRef, ViewContainerRef } from '@angular/core';
export declare class StringTemplateOutletDirective {
    private viewContainer;
    private defaultTemplate;
    private isTemplate;
    private inputTemplate;
    private inputViewRef;
    private defaultViewRef;
    constructor(viewContainer: ViewContainerRef, defaultTemplate: TemplateRef<void>);
    stringTemplateOutlet: string | TemplateRef<void>;
    updateView(): void;
}
