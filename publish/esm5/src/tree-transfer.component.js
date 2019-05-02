import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import * as _ from 'lodash';
var TreeTransferComponent = /** @class */ (function () {
    function TreeTransferComponent() {
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
    TreeTransferComponent.prototype.ngOnInit = function () {
        this.initData(this.source);
        this.treeCheckedKeys = this.listData.map(function (item) { return item.key; });
        this.treeExpandedKeys = this.treeCheckedKeys;
    };
    TreeTransferComponent.prototype.initData = function (source) {
        var _this = this;
        source.map(function (item) {
            if (_this.target.indexOf(item.key) > -1) {
                _this.listData.push(item);
            }
            if (!item.children) {
                _this.leafKeys.push(item.key);
            }
            else {
                _this.initData(item.children);
            }
        });
    };
    TreeTransferComponent.prototype.leftToRight = function () {
        this.target = this.treeCheckedKeys;
        this.listData = [];
        this.initData(this.tree.getTreeNodes());
    };
    TreeTransferComponent.prototype.rightToLeft = function () {
        var _this = this;
        this.target = this.listData.map(function (item) { return item.key; }).filter(function (key) { return _this.listCheckedKeys.indexOf(key) < 0; });
        this.listData = [];
        this.initData(this.tree.getTreeNodes());
        this.listCheckedKeys = [];
        this.treeCheckedKeys = this.listData.map(function (item) { return item.key; });
    };
    TreeTransferComponent.prototype.treeOnCheck = function (event) {
        var _this = this;
        this.allKeys = [];
        this.getTreeCheckedKeys(this.tree.getCheckedNodeList());
        this.treeCheckedKeys = this.allKeys.filter(function (key) { return _this.leafKeys.indexOf(key) > -1; });
    };
    TreeTransferComponent.prototype.treeOnCheckAll = function (e) {
        if (e) {
            this.treeCheckedKeys = this.leafKeys;
        }
        else {
            this.treeCheckedKeys = [];
        }
    };
    TreeTransferComponent.prototype.listOnCheck = function (e, checkedKeys) {
        if (e) {
            this.listCheckedKeys = _.uniq(tslib_1.__spread(this.listCheckedKeys, checkedKeys));
        }
        else {
            this.listCheckedKeys = this.listCheckedKeys.filter(function (key) { return checkedKeys.indexOf(key) < 0; });
        }
    };
    TreeTransferComponent.prototype.listOnCheckAll = function (e) {
        this.listOnCheck(e, this.listData.map(function (item) { return item.key; }));
    };
    TreeTransferComponent.prototype.getTreeCheckedKeys = function (source) {
        var _this = this;
        source.map(function (item) {
            if (item.isChecked) {
                _this.allKeys.push(item.key);
            }
            if (item.children.length > 0) {
                _this.getTreeCheckedKeys(item.children);
            }
        });
    };
    Object.defineProperty(TreeTransferComponent.prototype, "getLeftDisabled", {
        get: function () {
            return _.difference(this.listData.map(function (item) { return item.key; }), this.treeCheckedKeys).length === 0 &&
                _.difference(this.treeCheckedKeys, this.listData.map(function (item) { return item.key; })).length === 0;
        },
        enumerable: true,
        configurable: true
    });
    TreeTransferComponent.prototype.showListSearchValue = function (item) {
        return this.listSearchValue.length > 0 && item.title.indexOf(this.listSearchValue) > -1;
    };
    TreeTransferComponent.prototype.listSearch = function (e) {
        this.listSearchValue = e.target.value;
    };
    TreeTransferComponent.prototype.treeSearch = function (e) {
        this.treeSearchValue = e.target.value;
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
    return TreeTransferComponent;
}());
export { TreeTransferComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS10cmFuc2Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy10cmVlLXRyYW5zZmVyLyIsInNvdXJjZXMiOlsic3JjL3RyZWUtdHJhbnNmZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBdUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9FLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBTzVCO0lBaUJFO1FBaEJTLFdBQU0sR0FBc0MsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUQsV0FBTSxHQUFlLEVBQUUsQ0FBQyxDQUFDLE1BQU07UUFDL0IsV0FBTSxHQUEyQixFQUFFLENBQUMsQ0FBQyxPQUFPO1FBQzVDLGVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVO1FBRXRDLG9CQUFlLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUTtRQUM5QixvQkFBZSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7UUFDL0IsYUFBUSxHQUFlLEVBQUUsQ0FBQyxDQUFDLE9BQU87UUFDbEMsb0JBQWUsR0FBZSxFQUFFLENBQUMsQ0FBQyxZQUFZO1FBQzlDLG9CQUFlLEdBQWUsRUFBRSxDQUFDLENBQUMsV0FBVztRQUM3QyxxQkFBZ0IsR0FBZSxFQUFFLENBQUM7UUFDbEMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFlLEVBQUUsQ0FBQyxDQUFDLFdBQVc7UUFDdEMsWUFBTyxHQUFlLEVBQUUsQ0FBQyxDQUFDLFdBQVc7SUFHckIsQ0FBQztJQUVqQix3Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFH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LENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDekYsQ0FBQzs7O09BQUE7SUFFRCxtREFBbUIsR0FBbkIsVUFBb0IsSUFBSTtRQUN0QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVELDBDQUFVLEdBQVYsVUFBVyxDQUFDO1FBQ1YsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBRUQsMENBQVUsR0FBVixVQUFXLENBQUM7UUFDVixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ3hDLENBQUM7SUF2R1E7UUFBUixLQUFLLEVBQUU7MENBQVMsS0FBSzt5REFBK0M7SUFDNUQ7UUFBUixLQUFLLEVBQUU7MENBQVMsS0FBSzt5REFBVztJQUN4QjtRQUFSLEtBQUssRUFBRTswQ0FBUyxLQUFLO3lEQUF1QjtJQUNwQztRQUFSLEtBQUssRUFBRTs7NkRBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzt5REFBb0M7SUFVekI7UUFBbEIsU0FBUyxDQUFDLE1BQU0sQ0FBQzs7dURBQU07SUFmYixxQkFBcUI7UUFMakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixzbUpBQTZDOztTQUU5QyxDQUFDOztPQUNXLHFCQUFxQixDQTBHakM7SUFBRCw0QkFBQztDQUFBLEFBMUdELElBMEdDO1NBMUdZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TnpGb3JtYXRFbWl0RXZlbnR9IGZyb20gJ25nLXpvcnJvLWFudGQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10cmVlLXRyYW5zZmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RyZWUtdHJhbnNmZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cmVlLXRyYW5zZmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHJlZVRyYW5zZmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgdGl0bGVzOiBBcnJheTxzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPj4gPSBbJ+a6kOaVsOaNricsICfnm67nmoTmlbDmja4nXTtcbiAgQElucHV0KCkgc291cmNlOiBBcnJheTxhbnk+ID0gW107IC8vIOa6kOaVsOaNrlxuICBASW5wdXQoKSB0YXJnZXQ6IEFycmF5PHN0cmluZyB8IG51bWJlcj4gPSBbXTsgLy8g55uu5qCH5pWw5o2uXG4gIEBJbnB1dCgpIHNob3dTZWFyY2ggPSB0cnVlOyAvLyDmmK/lkKbmmL7npLrmkJzntKLmoYZcbiAgQElucHV0KCkgZm9vdGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgdHJlZVNlYXJjaFZhbHVlID0gJyc7IC8vIOagkeeahOaQnOe0ouWAvFxuICBsaXN0U2VhcmNoVmFsdWUgPSAnJzsgLy8g5YiX6KGo55qE5pCc57Si5YC8XG4gIGxpc3REYXRhOiBBcnJheTxhbnk+ID0gW107IC8vIOWIl+ihqOaVsOe7hFxuICBsaXN0Q2hlY2tlZEtleXM6IEFycmF5PGFueT4gPSBbXTsgLy8g6YCJ5Lit55qE5YiX6KGoa2V5c1xuICB0cmVlQ2hlY2tlZEtleXM6IEFycmF5PGFueT4gPSBbXTsgLy8g6YCJ5Lit55qE5qCRa2V5c1xuICB0cmVlRXhwYW5kZWRLZXlzOiBBcnJheTxhbnk+ID0gW107XG4gIHRyZWVFeHBhbmRBbGwgPSBmYWxzZTtcbiAgbGVhZktleXM6IEFycmF5PGFueT4gPSBbXTsgLy8g5qCR55qE5omA5pyJ5Y+25a2Q6IqC54K5XG4gIGFsbEtleXM6IEFycmF5PGFueT4gPSBbXTsgLy8g5qCR55qE5omA5pyJa2V5c1xuICBAVmlld0NoaWxkKCd0cmVlJykgdHJlZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdERhdGEodGhpcy5zb3VyY2UpO1xuICAgIHRoaXMudHJlZUNoZWNrZWRLZXlzID0gdGhpcy5saXN0RGF0YS5tYXAoaXRlbSA9PiBpdGVtLmtleSk7XG4gICAgdGhpcy50cmVlRXhwYW5kZWRLZXlzID0gdGhpcy50cmVlQ2hlY2tlZEtleXM7XG4gIH1cblxuICBpbml0RGF0YShzb3VyY2UpIHtcbiAgICBzb3VyY2UubWFwKGl0ZW0gPT4ge1xuICAgICAgaWYgKHRoaXMudGFyZ2V0LmluZGV4T2YoaXRlbS5rZXkpID4gLTEpIHtcbiAgICAgICAgdGhpcy5saXN0RGF0YS5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgICAgaWYgKCFpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMubGVhZktleXMucHVzaChpdGVtLmtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluaXREYXRhKGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbGVmdFRvUmlnaHQoKSB7XG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLnRyZWVDaGVja2VkS2V5cztcbiAgICB0aGlzLmxpc3REYXRhID0gW107XG4gICAgdGhpcy5pbml0RGF0YSh0aGlzLnRyZWUuZ2V0VHJlZU5vZGVzKCkpO1xuICB9XG5cbiAgcmlnaHRUb0xlZnQoKSB7XG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLmxpc3REYXRhLm1hcChpdGVtID0+IGl0ZW0ua2V5KS5maWx0ZXIoa2V5ID0+IHRoaXMubGlzdENoZWNrZWRLZXlzLmluZGV4T2Yoa2V5KSA8IDApO1xuICAgIHRoaXMubGlzdERhdGEgPSBbXTtcbiAgICB0aGlzLmluaXREYXRhKHRoaXMudHJlZS5nZXRUcmVlTm9kZXMoKSk7XG4gICAgdGhpcy5saXN0Q2hlY2tlZEtleXMgPSBbXTtcbiAgICB0aGlzLnRyZWVDaGVja2VkS2V5cyA9IHRoaXMubGlzdERhdGEubWFwKGl0ZW0gPT4gaXRlbS5rZXkpO1xuICB9XG5cbiAgdHJlZU9uQ2hlY2soZXZlbnQ6IE56Rm9ybWF0RW1pdEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5hbGxLZXlzID0gW107XG4gICAgdGhpcy5nZXRUcmVlQ2hlY2tlZEtleXModGhpcy50cmVlLmdldENoZWNrZWROb2RlTGlzdCgpKTtcbiAgICB0aGlzLnRyZWVDaGVja2VkS2V5cyA9IHRoaXMuYWxsS2V5cy5maWx0ZXIoa2V5ID0+IHRoaXMubGVhZktleXMuaW5kZXhPZihrZXkpID4gLTEpO1xuICB9XG5cbiAgdHJlZU9uQ2hlY2tBbGwoZTogYm9vbGVhbikge1xuICAgIGlmIChlKSB7XG4gICAgICB0aGlzLnRyZWVDaGVja2VkS2V5cyA9IHRoaXMubGVhZktleXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJlZUNoZWNrZWRLZXlzID0gW107XG4gICAgfVxuICB9XG5cbiAgbGlzdE9uQ2hlY2soZTogYm9vbGVhbiwgY2hlY2tlZEtleXM6IGFueVtdKSB7XG4gICAgaWYgKGUpIHtcbiAgICAgIHRoaXMubGlzdENoZWNrZWRLZXlzID0gXy51bmlxKFsuLi50aGlzLmxpc3RDaGVja2VkS2V5cywgLi4uY2hlY2tlZEtleXNdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0Q2hlY2tlZEtleXMgPSB0aGlzLmxpc3RDaGVja2VkS2V5cy5maWx0ZXIoa2V5ID0+IGNoZWNrZWRLZXlzLmluZGV4T2Yoa2V5KSA8IDApO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RPbkNoZWNrQWxsKGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmxpc3RPbkNoZWNrKGUsIHRoaXMubGlzdERhdGEubWFwKGl0ZW0gPT4gaXRlbS5rZXkpKTtcbiAgfVxuXG4gIGdldFRyZWVDaGVja2VkS2V5cyhzb3VyY2UpIHtcbiAgICBzb3VyY2UubWFwKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0uaXNDaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYWxsS2V5cy5wdXNoKGl0ZW0ua2V5KTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5nZXRUcmVlQ2hlY2tlZEtleXMoaXRlbS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXQgZ2V0TGVmdERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBfLmRpZmZlcmVuY2UodGhpcy5saXN0RGF0YS5tYXAoaXRlbSA9PiBpdGVtLmtleSksIHRoaXMudHJlZUNoZWNrZWRLZXlzKS5sZW5ndGggPT09IDAgJiZcbiAgICAgIF8uZGlmZmVyZW5jZSh0aGlzLnRyZWVDaGVja2VkS2V5cywgdGhpcy5saXN0RGF0YS5tYXAoaXRlbSA9PiBpdGVtLmtleSkpLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIHNob3dMaXN0U2VhcmNoVmFsdWUoaXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxpc3RTZWFyY2hWYWx1ZS5sZW5ndGggPiAwICYmIGl0ZW0udGl0bGUuaW5kZXhPZih0aGlzLmxpc3RTZWFyY2hWYWx1ZSkgPiAtMTtcbiAgfVxuXG4gIGxpc3RTZWFyY2goZSkge1xuICAgIHRoaXMubGlzdFNlYXJjaFZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gIH1cblxuICB0cmVlU2VhcmNoKGUpIHtcbiAgICB0aGlzLnRyZWVTZWFyY2hWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICB9XG5cbn1cbiJdfQ==