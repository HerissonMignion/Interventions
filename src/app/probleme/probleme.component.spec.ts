import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("zone prenom valide avec au moins 3 caractères", () => {
    const zone = component.problemeForm.controls["prenom"];
    zone.setValue("a".repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it("zone prenom invalide avec 2 caractères ou moins", () => {
    const zone = component.problemeForm.controls["prenom"];
    zone.setValue("a".repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it("zone prenom valide avec 200 caractères", () => {
    const zone = component.problemeForm.controls["prenom"];
    zone.setValue("a".repeat(200));
    expect(zone.valid).toBeTruthy();
  });


  it("zone prenom invalide avec aucune valeur", () => {
    const zone = component.problemeForm.controls["prenom"];
    zone.setValue("");
    const errors = zone.errors || {};
    expect(errors["required"]).toBeTruthy();
  });

  it("zone prenom valide avec 10 espace", () => {
    const zone = component.problemeForm.controls["prenom"];
    zone.setValue(" ".repeat(10));
    expect(zone.valid).toBeTruthy();
  });

  it("zone valide avec 2 espaces et 1 caractère", () => {
    const zone = component.problemeForm.controls["prenom"];
    zone.setValue("  f");
    expect(zone.valid).toBeTruthy();
  });



});
