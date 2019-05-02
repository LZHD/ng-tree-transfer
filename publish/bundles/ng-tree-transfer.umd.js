(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('lodash'), require('@angular/common'), require('ng-zorro-antd'), require('@angular/forms'), require('ng-tree-transfer/src/string-template-outlet.directive')) :
    typeof define === 'function' && define.amd ? define('ng-tree-transfer', ['exports', '@angular/core', 'lodash', '@angular/common', 'ng-zorro-antd', '@angular/forms', 'ng-tree-transfer/src/string-template-outlet.directive'], factory) :
    (global = global || self, factory(global['ng-tree-transfer'] = {}, global.ng.core, global.lodash, global.ng.common, global.ngZorroAntd, global.ng.forms, global.stringTemplateOutlet_directive));
}(this, function (exports, core, lodash, common, ngZorroAntd, forms, stringTemplateOutlet_directive) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
                this.listCheckedKeys = lodash.uniq(__spread(this.listCheckedKeys, checkedKeys));
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
                return lodash.difference(this.listData.map(function (item) { return item.key; }), this.treeCheckedKeys).length === 0 &&
                    lodash.difference(this.treeCheckedKeys, this.listData.map(function (item) { return item.key; })).length === 0;
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
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TreeTransferComponent.prototype, "titles", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TreeTransferComponent.prototype, "source", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TreeTransferComponent.prototype, "target", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TreeTransferComponent.prototype, "showSearch", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TreeTransferComponent.prototype, "footer", void 0);
        __decorate([
            core.ViewChild('tree'),
            __metadata("design:type", Object)
        ], TreeTransferComponent.prototype, "tree", void 0);
        TreeTransferComponent = __decorate([
            core.Component({
                selector: 'nz-tree-transfer',
                template: "<div class=\"tree-transfer\">\n  <div class=\"tree-transfer-panel tree-transfer-left\">\n    <div class=\"tree-transfer-panel-header\">\n      <label\n        nz-checkbox\n        [ngModel]=\"treeCheckedKeys.length > 0 && treeCheckedKeys.length === leafKeys.length\"\n        [nzIndeterminate]=\"treeCheckedKeys.length > 0 && treeCheckedKeys.length < leafKeys.length\"\n        (ngModelChange)=\"treeOnCheckAll($event)\"\n      ></label>\n      <span class=\"tree-transfer-panel-header-select\">\n        {{treeCheckedKeys.length > 0 ? treeCheckedKeys.length + '/' : ''}}{{leafKeys.length}} \u6761\u6570\u636E\n      </span>\n      <span class=\"tree-transfer-panel-header-title\">\n        <ng-container *stringTemplateOutlet=\"titles[0]\">{{titles[0]}}</ng-container>\n      </span>\n    </div>\n    <div class=\"tree-transfer-panel-body\"\n         [class.tree-transfer-panel-body-has-search]=\"showSearch\"\n         [class.tree-transfer-panel-body-has-footer]=\"footer\"\n    >\n      <div class=\"tree-transfer-panel-body-search\" *ngIf=\"showSearch\">\n        <nz-input-group [nzSuffix]=\"suffixIcon\">\n          <input type=\"text\" nz-input placeholder=\"Search\" (keyup.enter)=\"treeSearch($event)\"/>\n        </nz-input-group>\n      </div>\n      <div class=\"tree-transfer-panel-body-content\">\n        <nz-tree #tree\n          nzCheckable\n          [nzData]=\"source\"\n          [nzExpandAll]=\"treeExpandAll\"\n          [nzCheckedKeys]=\"treeCheckedKeys\"\n          [nzExpandedKeys]=\"treeExpandedKeys\"\n          [nzSearchValue]=\"treeSearchValue\"\n          (nzCheckBoxChange)=\"treeOnCheck($event)\"\n        ></nz-tree>\n      </div>\n    </div>\n    <div *ngIf=\"footer\" class=\"tree-transfer-panel-footer\">\n      <ng-container *stringTemplateOutlet=\"footer\">{{footer}}</ng-container>\n    </div>\n  </div>\n  <div class=\"tree-transfer-operation\">\n    <button\n      nz-button\n      nzType=\"{{!getLeftDisabled ? 'primary' : ''}}\"\n      [nzSize]=\"'small'\"\n      [disabled]=\"getLeftDisabled\"\n      (click)=\"leftToRight()\"\n    >\n      <i nz-icon type=\"right\"></i>\n    </button>\n    <button\n      nz-button\n      nzType=\"{{listCheckedKeys.length !== 0 ? 'primary' : ''}}\"\n      [nzSize]=\"'small'\"\n      [disabled]=\"listCheckedKeys.length === 0\"\n      (click)=\"rightToLeft()\"\n    >\n      <i nz-icon type=\"left\"></i>\n    </button>\n  </div>\n  <div class=\"tree-transfer-panel tree-transfer-right\">\n    <div class=\"tree-transfer-panel-header\">\n      <label\n        nz-checkbox\n        [ngModel]=\"listCheckedKeys.length > 0 && listCheckedKeys.length === listData.length\"\n        [nzIndeterminate]=\"listCheckedKeys.length > 0 && listCheckedKeys.length < listData.length\"\n        (ngModelChange)=\"listOnCheckAll($event)\"\n      ></label>\n      <span class=\"tree-transfer-panel-header-select\">\n        {{listCheckedKeys.length > 0 ? listCheckedKeys.length + '/' : ''}}{{listData.length}} \u6761\u6570\u636E\n      </span>\n      <span class=\"tree-transfer-panel-header-title\">\n        <ng-container *stringTemplateOutlet=\"titles[1]\">{{titles[1]}}</ng-container>\n      </span>\n    </div>\n    <div class=\"tree-transfer-panel-body\"\n         [class.tree-transfer-panel-body-has-search]=\"showSearch\"\n         [class.tree-transfer-panel-body-has-footer]=\"footer\"\n    >\n      <div class=\"tree-transfer-panel-body-search\" *ngIf=\"showSearch\">\n        <nz-input-group [nzSuffix]=\"suffixIcon\">\n          <input type=\"text\" nz-input placeholder=\"Search\" (keyup.enter)=\"listSearch($event)\"/>\n        </nz-input-group>\n      </div>\n      <ul class=\"tree-transfer-panel-body-content\">\n        <li *ngFor=\"let item of listData\">\n          <label\n            nz-checkbox\n            [ngModel]=\"listCheckedKeys.indexOf(item.key) > -1\"\n            (ngModelChange)=\"listOnCheck($event, [item.key])\"\n          >\n            <ng-container *ngIf=\"showListSearchValue(item)\">\n              <span>{{item.title.substr(0, item.title.indexOf(listSearchValue))}}<span style=\"color: #f50;\">{{listSearchValue}}</span>{{item.title.substr(item.title.indexOf(listSearchValue) + listSearchValue.length)}}</span>\n            </ng-container>\n            <ng-container *ngIf=\"!showListSearchValue(item)\">\n              <span>{{item.title}}</span>\n            </ng-container>\n          </label>\n        </li>\n      </ul>\n    </div>\n    <div *ngIf=\"footer\" class=\"tree-transfer-panel-footer\">\n      <ng-container *stringTemplateOutlet=\"footer\">{{footer}}</ng-container>\n    </div>\n  </div>\n</div>\n\n<ng-template #suffixIcon>\n  <i nz-icon type=\"search\"></i>\n</ng-template>\n",
                styles: [".tree-transfer{position:relative;line-height:1.5;font-family:Consolas,Menlo,Courier,monospace;text-align:left;color:rgba(0,0,0,.65)}.tree-transfer .tree-transfer-panel{width:250px;height:300px;font-size:12px;border:1px solid #d9d9d9;display:inline-block;border-radius:4px;vertical-align:middle;position:relative;padding-top:34px}.tree-transfer .tree-transfer-panel-header{padding:8px 12px;height:34px;border-radius:4px 4px 0 0;border-bottom:1px solid #d9d9d9;overflow:hidden;position:absolute;top:0;left:0;width:100%}.tree-transfer .tree-transfer-panel-header .ant-checkbox-wrapper{font-size:12px}.tree-transfer .tree-transfer-panel-header-title{position:absolute;right:12px}.tree-transfer .tree-transfer-panel-body{height:100%;font-size:12px;position:relative}.tree-transfer .tree-transfer-panel-body .ant-alert{font-size:12px}.tree-transfer .tree-transfer-panel-body .ant-alert .ant-alert-icon{top:10.5px}.tree-transfer .tree-transfer-panel-body-search{position:absolute;top:0;width:100%;padding:8px}.tree-transfer .tree-transfer-panel-body-search .ant-input{font-size:12px}.tree-transfer .tree-transfer-panel-body-content{padding:0;overflow:auto;height:100%}.tree-transfer .tree-transfer-panel-body-content .ant-tree{font-size:12px}.tree-transfer .tree-transfer-panel-body-content li{padding:4px 12px;min-height:32px;line-height:23px;transition:.3s;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.tree-transfer .tree-transfer-panel-body-content li:hover{background-color:#d2eafb}.tree-transfer .tree-transfer-panel-body-has-search{padding-top:46px}.tree-transfer .tree-transfer-panel-body-has-footer{padding-bottom:34px}.tree-transfer .tree-transfer-panel-footer{height:34px;border-radius:0 0 4px 4px;border-top:1px solid #d9d9d9;overflow:hidden;position:absolute;bottom:0;left:0;width:100%}.tree-transfer .tree-transfer-operation{display:inline-block;overflow:hidden;margin:0 8px;vertical-align:middle}.tree-transfer .tree-transfer-operation button.ant-btn{display:block;margin:4px 0}"]
            }),
            __metadata("design:paramtypes", [])
        ], TreeTransferComponent);
        return TreeTransferComponent;
    }());

    var TreeTransferModule = /** @class */ (function () {
        function TreeTransferModule() {
        }
        TreeTransferModule = __decorate([
            core.NgModule({
                declarations: [
                    TreeTransferComponent,
                    stringTemplateOutlet_directive.StringTemplateOutletDirective
                ],
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    ngZorroAntd.NgZorroAntdModule
                ],
                exports: [
                    TreeTransferComponent
                ]
            })
        ], TreeTransferModule);
        return TreeTransferModule;
    }());

    exports.TreeTransferComponent = TreeTransferComponent;
    exports.TreeTransferModule = TreeTransferModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng-tree-transfer.umd.js.map
