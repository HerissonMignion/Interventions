import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypesProblemeService } from './types-probleme.service';
import { ITypeProbleme } from './probleme';

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
      noTypeProbleme: [
        "",
        []
      ]
    });

    this.typeProblemeService.obtenirTypesProbleme()
      .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
        error => this.errorMessage = <any>error);

  }

  save(): void {

  }

}
