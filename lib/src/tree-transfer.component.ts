import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NzFormatEmitEvent} from 'ng-zorro-antd';
import * as _ from 'lodash';

@Component({
  selector: 'nz-tree-transfer',
  templateUrl: './tree-transfer.component.html',
  styleUrls: ['./tree-transfer.component.scss']
})
export class TreeTransferComponent implements OnInit {
  @Input() titles: Array<string | TemplateRef<void>> = ['源数据', '目的数据'];
  @Input() source: Array<any> = []; // 源数据
  @Input() target: Array<string | number> = []; // 目标数据
  @Input() showSearch = true; // 是否显示搜索框
  @Input() footer: string | TemplateRef<void>;
  treeSearchValue = ''; // 树的搜索值
  listSearchValue = ''; // 列表的搜索值
  listData: Array<any> = []; // 列表数组
  listCheckedKeys: Array<any> = []; // 选中的列表keys
  treeCheckedKeys: Array<any> = []; // 选中的树keys
  treeExpandedKeys: Array<any> = [];
  treeExpandAll = false;
  leafKeys: Array<any> = []; // 树的所有叶子节点
  allKeys: Array<any> = []; // 树的所有keys
  @ViewChild('tree') tree;

  constructor() { }

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
      } else {
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

  treeOnCheck(event: NzFormatEmitEvent): void {
    this.allKeys = [];
    this.getTreeCheckedKeys(this.tree.getCheckedNodeList());
    this.treeCheckedKeys = this.allKeys.filter(key => this.leafKeys.indexOf(key) > -1);
  }

  treeOnCheckAll(e: boolean) {
    if (e) {
      this.treeCheckedKeys = this.leafKeys;
    } else {
      this.treeCheckedKeys = [];
    }
  }

  listOnCheck(e: boolean, checkedKeys: any[]) {
    if (e) {
      this.listCheckedKeys = _.uniq([...this.listCheckedKeys, ...checkedKeys]);
    } else {
      this.listCheckedKeys = this.listCheckedKeys.filter(key => checkedKeys.indexOf(key) < 0);
    }
  }

  listOnCheckAll(e: boolean) {
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

  get getLeftDisabled(): boolean {
    return _.difference(this.listData.map(item => item.key), this.treeCheckedKeys).length === 0 &&
      _.difference(this.treeCheckedKeys, this.listData.map(item => item.key)).length === 0;
  }

  showListSearchValue(item): boolean {
    return this.listSearchValue.length > 0 && item.title.indexOf(this.listSearchValue) > -1;
  }

  listSearch(e) {
    this.listSearchValue = e.target.value;
  }

  treeSearch(e) {
    this.treeSearchValue = e.target.value;
  }

}
