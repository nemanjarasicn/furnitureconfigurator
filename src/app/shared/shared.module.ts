import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'ng2-tooltip-directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    TooltipModule
  ],
  exports: [TranslateModule, TooltipModule]
})
export class SharedModule { }
