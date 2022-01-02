import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  selector: "[appValidatorPassword]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidatorPasswordDirective,
      multi: true,
    },
  ],
})
export class ValidatorPasswordDirective implements Validator {
  constructor() {}
  @Input() appValidatorPassword: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
    const compare = control.parent.get(this.appValidatorPassword);
    if (compare && compare.value !== control.value) {
      return { notEqual: true };
    }
    return null;
  }
}
