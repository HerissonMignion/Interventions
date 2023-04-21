import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypesProblemeService } from './types-probleme.service';
import { ITypeProbleme } from './probleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent {
  problemeForm: FormGroup;
  public typesProbleme: ITypeProbleme[];
  private errorMessage: any;

  constructor(private fb: FormBuilder, private typeProblemeService: TypesProblemeService) {

  }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ["",
        [
          VerifierCaracteresValidator.longueurMinimum(3),
          Validators.required
        ]],
      nom: [
        "",
        []
      ],
      noTypeProbleme: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courriel2: [{ value: '', disabled: true }],
        // courrielConfirmation: [{ value: '', disabled: true }],
      }),
      notification: [ "pasnotification" ],
      telephone: [{ value: '', disabled: true }],

      descriptionProbleme: ["", [Validators.required, Validators.minLength(5)]],
      noUnite: "",
      dateProbleme: [{ value: Date(), disabled: true }]
    });

    this.typeProblemeService.obtenirTypesProbleme()
      .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
        error => this.errorMessage = <any>error);

    this.problemeForm.get("notification").valueChanges.subscribe(
      (value) => {
        this.appliquerNotifications(value);
      }
    );



  }


  //est appelé quand un la méthode de notification est changé par l'user (ou appelé par le code)
  appliquerNotifications(valueNotification: string) {
    const controls = {
      telephone: this.problemeForm.get("telephone"),
      courriel: this.problemeForm.get("courrielGroup.courriel"),
      courriel2: this.problemeForm.get("courrielGroup.courriel2")
    };

    const controlCourrielGroup = this.problemeForm.get("courrielGroup");

    for (let prop in controls) {
      const control = controls[prop as keyof typeof controls];
      control.clearValidators();
      control.reset();
      control.disable();
    }

    if (valueNotification == "messageTexte") {
      const control = controls.telephone;
      control.enable();
      control.addValidators([Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(10), Validators.maxLength(10)]);
    }
    else if (valueNotification == "courriel") {
      const control = controls.courriel;
      const control2 = controls.courriel2;
      control.enable();
      control.addValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      control2.enable();
      control2.addValidators([Validators.required]);
      controlCourrielGroup.setValidators(Validators.compose([emailMatcherValidator.courrielDifferents()]))
    }



    for (let prop in controls) {
      const control = controls[prop as keyof typeof controls];
      control.updateValueAndValidity();
    }

  }

  save(): void {

  }

}
