import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-option-input',
  templateUrl: './option-input.component.html',
  styleUrls: ['./option-input.component.scss']
})
export class OptionInputComponent implements OnInit {

  @Input() option!: IConfigurationItemOption

  inputGroup: FormGroup = new FormGroup({
    value: new FormControl('', [Validators.min(0), Validators.max(1000)])
  });

  constructor() { }

  ngOnInit(): void {

    this.inputGroup.valueChanges
    .pipe(debounceTime(500))
    .subscribe((value) => console.log(value));

  }

}
