import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import * as _ from 'lodash';
let TreeTransferComponent = class TreeTransferComponent {
    constructor() {
        this.titles = ['源数据', '目的数据'];
        this.source = []; // 源数据
        this.target = []; // 目标数据
        this.showSearch = true; // 是否显示搜索框
        this.treeSearchValue = ''; // 树的搜索值
        this.listSearchValue = ''; // 列表的搜索值
        this.listData = []; // 列表数组
        this.listCheckedKeys = []; // 选中的列表keys
        this.treeCheckedKeys = []; // 选中的树keys
        this.treeExpandedKeys = [];
        this.treeExpandAll = false;
        this.leafKeys = []; // 树的所有叶子节点
        this.allKeys = []; // 树的所有keys
    }
    ngOnInit() {
        this.initData(this.source);
        this.treeCheckedKeys = this.listData.map(item => item.key);
        this.treeExpandedKeys = this.treeCheckedKeys;
    }
    initData(source) {
        source.map(item => {
            if (this.target.indexOf(item.key) > -1) {
                this.listData.push(item);
            }
            if (!item.children) {
                this.leafKeys.push(item.key);
            }
            else {
                this.initData(item.children);
            }
        });
    }
    leftToRight() {
        this.target = this.treeCheckedKeys;
        this.listData = [];
        this.initData(this.tree.getTreeNodes());
    }
    rightToLeft() {
        this.target = this.listData.map(item => item.key).filter(key => this.listCheckedKeys.indexOf(key) < 0);
        this.listData = [];
        this.initData(this.tree.getTreeNodes());
        this.listCheckedKeys = [];
        this.treeCheckedKeys = this.listData.map(item => item.key);
    }
    treeOnCheck(event) {
        this.allKeys = [];
        this.getTreeCheckedKeys(this.tree.getCheckedNodeList());
        this.treeCheckedKeys = this.allKeys.filter(key => this.leafKeys.indexOf(key) > -1);
    }
    treeOnCheckAll(e) {
        if (e) {
            this.treeCheckedKeys = this.leafKeys;
        }
        else {
            this.treeCheckedKeys = [];
        }
    }
    listOnCheck(e, checkedKeys) {
        if (e) {
            this.listCheckedKeys = _.uniq([...this.listCheckedKeys, ...checkedKeys]);
        }
        else {
            this.listCheckedKeys = this.listCheckedKeys.filter(key => checkedKeys.indexOf(key) < 0);
        }
    }
    listOnCheckAll(e) {
        this.listOnCheck(e, this.listData.map(item => item.key));
    }
    getTreeCheckedKeys(source) {
        source.map(item => {
            if (item.isChecked) {
                this.allKeys.push(item.key);
            }
            if (item.children.length > 0) {
                this.getTreeCheckedKeys(item.children);
            }
        });
    }
    get getLeftDisabled() {
        return _.difference(this.listData.map(item => item.key), this.treeCheckedKeys).length === 0 &&
            _.difference(this.treeCheckedKeys, this.listData.map(item => item.key)).length === 0;
    }
    showListSearchValue(item) {
        return this.listSearchValue.length > 0 && item.title.indexOf(this.listSearchValue) > -1;
    }
    listSearch(e) {
        this.listSearchValue = e.target.value;
    }
    treeSearch(e) {
        this.treeSearchValue = e.target.value;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], TreeTransferComponent.prototype, "titles", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], TreeTransferComponent.prototype, "source", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], TreeTransferComponent.prototype, "target", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeTransferComponent.prototype, "showSearch", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TreeTransferComponent.prototype, "footer", void 0);
tslib_1.__decorate([
    ViewChild('tree'),
    tslib_1.__metadata("design:type", Object)
], TreeTransferComponent.prototype, "tree", void 0);
TreeTransferComponent = tslib_1.__decorate([
    Component({
        selector: 'nz-tree-transfer',
        template: "<div class=\"tree-transfer\">\n  <div class=\"tree-transfer-panel tree-transfer-left\">\n    <div class=\"tree-transfer-panel-header\">\n      <label\n        nz-checkbox\n        [ngModel]=\"treeCheckedKeys.length > 0 && treeCheckedKeys.length === leafKeys.length\"\n        [nzIndeterminate]=\"treeCheckedKeys.length > 0 && treeCheckedKeys.length < leafKeys.length\"\n        (ngModelChange)=\"treeOnCheckAll($event)\"\n      ></label>\n      <span class=\"tree-transfer-panel-header-select\">\n        {{treeCheckedKeys.length > 0 ? treeCheckedKeys.length + '/' : ''}}{{leafKeys.length}} \u6761\u6570\u636E\n      </span>\n      <span class=\"tree-transfer-panel-header-title\">\n        <ng-container *stringTemplateOutlet=\"titles[0]\">{{titles[0]}}</ng-container>\n      </span>\n    </div>\n    <div class=\"tree-transfer-panel-body\"\n         [class.tree-transfer-panel-body-has-search]=\"showSearch\"\n         [class.tree-transfer-panel-body-has-footer]=\"footer\"\n    >\n      <div class=\"tree-transfer-panel-body-search\" *ngIf=\"showSearch\">\n        <nz-input-group [nzSuffix]=\"suffixIcon\">\n          <input type=\"text\" nz-input placeholder=\"Search\" (keyup.enter)=\"treeSearch($event)\"/>\n        </nz-input-group>\n      </div>\n      <div class=\"tree-transfer-panel-body-content\">\n        <nz-tree #tree\n          nzCheckable\n          [nzData]=\"source\"\n          [nzExpandAll]=\"treeExpandAll\"\n          [nzCheckedKeys]=\"treeCheckedKeys\"\n          [nzExpandedKeys]=\"treeExpandedKeys\"\n          [nzSearchValue]=\"treeSearchValue\"\n          (nzCheckBoxChange)=\"treeOnCheck($event)\"\n        ></nz-tree>\n      </div>\n    </div>\n    <div *ngIf=\"footer\" class=\"tree-transfer-panel-footer\">\n      <ng-container *stringTemplateOutlet=\"footer\">{{footer}}</ng-container>\n    </div>\n  </div>\n  <div class=\"tree-transfer-operation\">\n    <button\n      nz-button\n      nzType=\"{{!getLeftDisabled ? 'primary' : ''}}\"\n      [nzSize]=\"'small'\"\n      [disabled]=\"getLeftDisabled\"\n      (click)=\"leftToRight()\"\n    >\n      <i nz-icon type=\"right\"></i>\n    </button>\n    <button\n      nz-button\n      nzType=\"{{listCheckedKeys.length !== 0 ? 'primary' : ''}}\"\n      [nzSize]=\"'small'\"\n      [disabled]=\"listCheckedKeys.length === 0\"\n      (click)=\"rightToLeft()\"\n    >\n      <i nz-icon type=\"left\"></i>\n    </button>\n  </div>\n  <div class=\"tree-transfer-panel tree-transfer-right\">\n    <div class=\"tree-transfer-panel-header\">\n      <label\n        nz-checkbox\n        [ngModel]=\"listCheckedKeys.length > 0 && listCheckedKeys.length === listData.length\"\n        [nzIndeterminate]=\"listCheckedKeys.length > 0 && listCheckedKeys.length < listData.length\"\n        (ngModelChange)=\"listOnCheckAll($event)\"\n      ></label>\n      <span class=\"tree-transfer-panel-header-select\">\n        {{listCheckedKeys.length > 0 ? listCheckedKeys.length + '/' : ''}}{{listData.length}} \u6761\u6570\u636E\n      </span>\n      <span class=\"tree-transfer-panel-header-title\">\n        <ng-container *stringTemplateOutlet=\"titles[1]\">{{titles[1]}}</ng-container>\n      </span>\n    </div>\n    <div class=\"tree-transfer-panel-body\"\n         [class.tree-transfer-panel-body-has-search]=\"showSearch\"\n         [class.tree-transfer-panel-body-has-footer]=\"footer\"\n    >\n      <div class=\"tree-transfer-panel-body-search\" *ngIf=\"showSearch\">\n        <nz-input-group [nzSuffix]=\"suffixIcon\">\n          <input type=\"text\" nz-input placeholder=\"Search\" (keyup.enter)=\"listSearch($event)\"/>\n        </nz-input-group>\n      </div>\n      <ul class=\"tree-transfer-panel-body-content\">\n        <li *ngFor=\"let item of listData\">\n          <label\n            nz-checkbox\n            [ngModel]=\"listCheckedKeys.indexOf(item.key) > -1\"\n            (ngModelChange)=\"listOnCheck($event, [item.key])\"\n          >\n            <ng-container *ngIf=\"showListSearchValue(item)\">\n              <span>{{item.title.substr(0, item.title.indexOf(listSearchValue))}}<span style=\"color: #f50;\">{{listSearchValue}}</span>{{item.title.substr(item.title.indexOf(listSearchValue) + listSearchValue.length)}}</span>\n            </ng-container>\n            <ng-container *ngIf=\"!showListSearchValue(item)\">\n              <span>{{item.title}}</span>\n            </ng-container>\n          </label>\n        </li>\n      </ul>\n    </div>\n    <div *ngIf=\"footer\" class=\"tree-transfer-panel-footer\">\n      <ng-container *stringTemplateOutlet=\"footer\">{{footer}}</ng-container>\n    </div>\n  </div>\n</div>\n\n<ng-template #suffixIcon>\n  <i nz-icon type=\"search\"></i>\n</ng-template>\n",
        styles: [".tree-transfer{position:relative;line-height:1.5;font-family:Consolas,Menlo,Courier,monospace;text-align:left;color:rgba(0,0,0,.65)}.tree-transfer .tree-transfer-panel{width:250px;height:300px;font-size:12px;border:1px solid #d9d9d9;display:inline-block;border-radius:4px;vertical-align:middle;position:relative;padding-top:34px}.tree-transfer .tree-transfer-panel-header{padding:8px 12px;height:34px;border-radius:4px 4px 0 0;border-bottom:1px solid #d9d9d9;overflow:hidden;position:absolute;top:0;left:0;width:100%}.tree-transfer .tree-transfer-panel-header .ant-checkbox-wrapper{font-size:12px}.tree-transfer .tree-transfer-panel-header-title{position:absolute;right:12px}.tree-transfer .tree-transfer-panel-body{height:100%;font-size:12px;position:relative}.tree-transfer .tree-transfer-panel-body .ant-alert{font-size:12px}.tree-transfer .tree-transfer-panel-body .ant-alert .ant-alert-icon{top:10.5px}.tree-transfer .tree-transfer-panel-body-search{position:absolute;top:0;width:100%;padding:8px}.tree-transfer .tree-transfer-panel-body-search .ant-input{font-size:12px}.tree-transfer .tree-transfer-panel-body-content{padding:0;overflow:auto;height:100%}.tree-transfer .tree-transfer-panel-body-content .ant-tree{font-size:12px}.tree-transfer .tree-transfer-panel-body-content li{padding:4px 12px;min-height:32px;line-height:23px;transition:.3s;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.tree-transfer .tree-transfer-panel-body-content li:hover{background-color:#d2eafb}.tree-transfer .tree-transfer-panel-body-has-search{padding-top:46px}.tree-transfer .tree-transfer-panel-body-has-footer{padding-bottom:34px}.tree-transfer .tree-transfer-panel-footer{height:34px;border-radius:0 0 4px 4px;border-top:1px solid #d9d9d9;overflow:hidden;position:absolute;bottom:0;left:0;width:100%}.tree-transfer .tree-transfer-operation{display:inline-block;overflow:hidden;margin:0 8px;vertical-align:middle}.tree-transfer .tree-transfer-operation button.ant-btn{display:block;margin:4px 0}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TreeTransferComponent);
export { TreeTransferComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS10cmFuc2Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy10cmVlLXRyYW5zZmVyLyIsInNvdXJjZXMiOlsic3JjL3RyZWUtdHJhbnNmZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBdUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9FLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBTzVCLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBaUJoQztRQWhCUyxXQUFNLEdBQXNDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVELFdBQU0sR0FBZSxFQUFFLENBQUMsQ0FBQyxNQUFNO1FBQy9CLFdBQU0sR0FBMkIsRUFBRSxDQUFDLENBQUMsT0FBTztRQUM1QyxlQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVTtRQUV0QyxvQkFBZSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVE7UUFDOUIsb0JBQWUsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO1FBQy9CLGFBQVEsR0FBZSxFQUFFLENBQUMsQ0FBQyxPQUFPO1FBQ2xDLG9CQUFlLEdBQWUsRUFBRSxDQUFDLENBQUMsWUFBWTtRQUM5QyxvQkFBZSxHQUFlLEVBQUUsQ0FBQyxDQUFDLFdBQVc7UUFDN0MscUJBQWdCLEdBQWUsRUFBRSxDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGFBQVEsR0FBZSxFQUFFLENBQUMsQ0FBQyxXQUFXO1FBQ3RDLFlBQU8sR0FBZSxFQUFFLENBQUMsQ0FBQyxXQUFXO0lBR3JCLENBQUM7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFD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QUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRCxVQUFVLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN4QyxDQUFDO0NBRUYsQ0FBQTtBQXpHVTtJQUFSLEtBQUssRUFBRTtzQ0FBUyxLQUFLO3FEQUErQztBQUM1RDtJQUFSLEtBQUssRUFBRTtzQ0FBUyxLQUFLO3FEQUFXO0FBQ3hCO0lBQVIsS0FBSyxFQUFFO3NDQUFTLEtBQUs7cURBQXVCO0FBQ3BDO0lBQVIsS0FBSyxFQUFFOzt5REFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7O3FEQUFvQztBQVV6QjtJQUFsQixTQUFTLENBQUMsTUFBTSxDQUFDOzttREFBTTtBQWZiLHFCQUFxQjtJQUxqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLHNtSkFBNkM7O0tBRTlDLENBQUM7O0dBQ1cscUJBQXFCLENBMEdqQztTQTFHWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge056Rm9ybWF0RW1pdEV2ZW50fSBmcm9tICduZy16b3Jyby1hbnRkJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS10cmFuc2ZlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cmVlLXRyYW5zZmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHJlZS10cmFuc2Zlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVUcmFuc2ZlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHRpdGxlczogQXJyYXk8c3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4+ID0gWyfmupDmlbDmja4nLCAn55uu55qE5pWw5o2uJ107XG4gIEBJbnB1dCgpIHNvdXJjZTogQXJyYXk8YW55PiA9IFtdOyAvLyDmupDmlbDmja5cbiAgQElucHV0KCkgdGFyZ2V0OiBBcnJheTxzdHJpbmcgfCBudW1iZXI+ID0gW107IC8vIOebruagh+aVsOaNrlxuICBASW5wdXQoKSBzaG93U2VhcmNoID0gdHJ1ZTsgLy8g5piv5ZCm5pi+56S65pCc57Si5qGGXG4gIEBJbnB1dCgpIGZvb3Rlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIHRyZWVTZWFyY2hWYWx1ZSA9ICcnOyAvLyDmoJHnmoTmkJzntKLlgLxcbiAgbGlzdFNlYXJjaFZhbHVlID0gJyc7IC8vIOWIl+ihqOeahOaQnOe0ouWAvFxuICBsaXN0RGF0YTogQXJyYXk8YW55PiA9IFtdOyAvLyDliJfooajmlbDnu4RcbiAgbGlzdENoZWNrZWRLZXlzOiBBcnJheTxhbnk+ID0gW107IC8vIOmAieS4reeahOWIl+ihqGtleXNcbiAgdHJlZUNoZWNrZWRLZXlzOiBBcnJheTxhbnk+ID0gW107IC8vIOmAieS4reeahOagkWtleXNcbiAgdHJlZUV4cGFuZGVkS2V5czogQXJyYXk8YW55PiA9IFtdO1xuICB0cmVlRXhwYW5kQWxsID0gZmFsc2U7XG4gIGxlYWZLZXlzOiBBcnJheTxhbnk+ID0gW107IC8vIOagkeeahOaJgOacieWPtuWtkOiKgueCuVxuICBhbGxLZXlzOiBBcnJheTxhbnk+ID0gW107IC8vIOagkeeahOaJgOaciWtleXNcbiAgQFZpZXdDaGlsZCgndHJlZScpIHRyZWU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXREYXRhKHRoaXMuc291cmNlKTtcbiAgICB0aGlzLnRyZWVDaGVja2VkS2V5cyA9IHRoaXMubGlzdERhdGEubWFwKGl0ZW0gPT4gaXRlbS5rZXkpO1xuICAgIHRoaXMudHJlZUV4cGFuZGVkS2V5cyA9IHRoaXMudHJlZUNoZWNrZWRLZXlzO1xuICB9XG5cbiAgaW5pdERhdGEoc291cmNlKSB7XG4gICAgc291cmNlLm1hcChpdGVtID0+IHtcbiAgICAgIGlmICh0aGlzLnRhcmdldC5pbmRleE9mKGl0ZW0ua2V5KSA+IC0xKSB7XG4gICAgICAgIHRoaXMubGlzdERhdGEucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXRlbS5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLmxlYWZLZXlzLnB1c2goaXRlbS5rZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YShpdGVtLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGxlZnRUb1JpZ2h0KCkge1xuICAgIHRoaXMudGFyZ2V0ID0gdGhpcy50cmVlQ2hlY2tlZEtleXM7XG4gICAgdGhpcy5saXN0RGF0YSA9IFtdO1xuICAgIHRoaXMuaW5pdERhdGEodGhpcy50cmVlLmdldFRyZWVOb2RlcygpKTtcbiAgfVxuXG4gIHJpZ2h0VG9MZWZ0KCkge1xuICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5saXN0RGF0YS5tYXAoaXRlbSA9PiBpdGVtLmtleSkuZmlsdGVyKGtleSA9PiB0aGlzLmxpc3RDaGVja2VkS2V5cy5pbmRleE9mKGtleSkgPCAwKTtcbiAgICB0aGlzLmxpc3REYXRhID0gW107XG4gICAgdGhpcy5pbml0RGF0YSh0aGlzLnRyZWUuZ2V0VHJlZU5vZGVzKCkpO1xuICAgIHRoaXMubGlzdENoZWNrZWRLZXlzID0gW107XG4gICAgdGhpcy50cmVlQ2hlY2tlZEtleXMgPSB0aGlzLmxpc3REYXRhLm1hcChpdGVtID0+IGl0ZW0ua2V5KTtcbiAgfVxuXG4gIHRyZWVPbkNoZWNrKGV2ZW50OiBOekZvcm1hdEVtaXRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuYWxsS2V5cyA9IFtdO1xuICAgIHRoaXMuZ2V0VHJlZUNoZWNrZWRLZXlzKHRoaXMudHJlZS5nZXRDaGVja2VkTm9kZUxpc3QoKSk7XG4gICAgdGhpcy50cmVlQ2hlY2tlZEtleXMgPSB0aGlzLmFsbEtleXMuZmlsdGVyKGtleSA9PiB0aGlzLmxlYWZLZXlzLmluZGV4T2Yoa2V5KSA+IC0xKTtcbiAgfVxuXG4gIHRyZWVPbkNoZWNrQWxsKGU6IGJvb2xlYW4pIHtcbiAgICBpZiAoZSkge1xuICAgICAgdGhpcy50cmVlQ2hlY2tlZEtleXMgPSB0aGlzLmxlYWZLZXlzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyZWVDaGVja2VkS2V5cyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RPbkNoZWNrKGU6IGJvb2xlYW4sIGNoZWNrZWRLZXlzOiBhbnlbXSkge1xuICAgIGlmIChlKSB7XG4gICAgICB0aGlzLmxpc3RDaGVja2VkS2V5cyA9IF8udW5pcShbLi4udGhpcy5saXN0Q2hlY2tlZEtleXMsIC4uLmNoZWNrZWRLZXlzXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdENoZWNrZWRLZXlzID0gdGhpcy5saXN0Q2hlY2tlZEtleXMuZmlsdGVyKGtleSA9PiBjaGVja2VkS2V5cy5pbmRleE9mKGtleSkgPCAwKTtcbiAgICB9XG4gIH1cblxuICBsaXN0T25DaGVja0FsbChlOiBib29sZWFuKSB7XG4gICAgdGhpcy5saXN0T25DaGVjayhlLCB0aGlzLmxpc3REYXRhLm1hcChpdGVtID0+IGl0ZW0ua2V5KSk7XG4gIH1cblxuICBnZXRUcmVlQ2hlY2tlZEtleXMoc291cmNlKSB7XG4gICAgc291cmNlLm1hcChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmlzQ2hlY2tlZCkge1xuICAgICAgICB0aGlzLmFsbEtleXMucHVzaChpdGVtLmtleSk7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZ2V0VHJlZUNoZWNrZWRLZXlzKGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGdldExlZnREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gXy5kaWZmZXJlbmNlKHRoaXMubGlzdERhdGEubWFwKGl0ZW0gPT4gaXRlbS5rZXkpLCB0aGlzLnRyZWVDaGVja2VkS2V5cykubGVuZ3RoID09PSAwICYmXG4gICAgICBfLmRpZmZlcmVuY2UodGhpcy50cmVlQ2hlY2tlZEtleXMsIHRoaXMubGlzdERhdGEubWFwKGl0ZW0gPT4gaXRlbS5rZXkpKS5sZW5ndGggPT09IDA7XG4gIH1cblxuICBzaG93TGlzdFNlYXJjaFZhbHVlKGl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5saXN0U2VhcmNoVmFsdWUubGVuZ3RoID4gMCAmJiBpdGVtLnRpdGxlLmluZGV4T2YodGhpcy5saXN0U2VhcmNoVmFsdWUpID4gLTE7XG4gIH1cblxuICBsaXN0U2VhcmNoKGUpIHtcbiAgICB0aGlzLmxpc3RTZWFyY2hWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgdHJlZVNlYXJjaChlKSB7XG4gICAgdGhpcy50cmVlU2VhcmNoVmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgfVxuXG59XG4iXX0=