import {NgModule} from '@angular/core';
import {NgxMatSelectComponent} from './ngx-mat-select.component';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule, MatFormFieldModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, NgSelectModule, MatCheckboxModule, OverlayModule, PortalModule],
  declarations: [NgxMatSelectComponent],
  exports: [NgxMatSelectComponent, NgSelectModule]
})
export class NgxMatSelectModule {
}
