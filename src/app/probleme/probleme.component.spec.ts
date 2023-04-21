import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TypesProblemeService } from './types-probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [ ProblemeComponent ],
      providers: [
        TypesProblemeService
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
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

  it("zone prenom invalide avec 10 espace", () => {
    const zone = component.problemeForm.controls["prenom"];
    zone.setValue(" ".repeat(10));
    expect(zone.valid).toBeFalsy();
  });

  it("zone invalide avec 2 espaces et 1 caractère", () => {
    const zone = component.problemeForm.controls["prenom"];
    zone.setValue("  f");
    expect(zone.valid).toBeFalsy();
  });

  // it('Zone TELEPHONE est activee quand notifier par messageTexte', () => {
  //   // component.appliquerNotifications("messageTexte");
  //   // //  component.setNotification('messageTexte');
  //   // let zone = component.problemeForm.get('telephone');
  //   // expect(zone.enabled).toBeTrue();


  // });

  it("15 | Zone telephone est désactivée quand ne pas me notifier", () => {
    component.appliquerNotifications("pasnotification");
    const telephone = component.problemeForm.get("telephone");
    expect(telephone.disabled).toBeTruthy();

  });

  it("16 | zone telephone est vide quand ne pas me notifier", () => {
    component.appliquerNotifications("pasnotification");
    const telephone = component.problemeForm.get("telephone");
    console.log(telephone.value);
    expect(telephone.value == null).toBeTruthy();
  });

  it("17 | zone adresse courriel est désactivée quand ne pas me notifier", () => {
    component.appliquerNotifications("pasnotification");
    const courriel = component.problemeForm.get("courriel");
    expect(courriel.disabled).toBeTruthy();

  });

  it("18 | confirmer courriel est désactivée quand ne pas me notifier", () => {
    component.appliquerNotifications("pasnotification");
    const courriel2 = component.problemeForm.get("courriel2");
    expect(courriel2.disabled).toBeTruthy();

  });



});
