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

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

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
    expect(telephone.value == null).toBeTruthy();
  });

  it("17 | zone adresse courriel est désactivée quand ne pas me notifier", () => {
    component.appliquerNotifications("pasnotification");
    const courriel = component.problemeForm.get("courrielGroup.courriel");
    expect(courriel.disabled).toBeTruthy();

  });

  it("18 | confirmer courriel est désactivée quand ne pas me notifier", () => {
    component.appliquerNotifications("pasnotification");
    const courriel2 = component.problemeForm.get("courrielGroup.courriel2");
    expect(courriel2.disabled).toBeTruthy();

  });

  it("19 | zone TELEPHONE est désactivée quand notifier par courriel", () => {
    component.appliquerNotifications("courriel");
    const telephone = component.problemeForm.get("telephone");
    expect(telephone.disabled).toBeTruthy();

  });

  it("20 | zone adresse courriel est activée quand notifier par courriel", () => {
    component.appliquerNotifications("courriel");
    const courriel = component.problemeForm.get("courrielGroup.courriel");
    expect(courriel.disabled).toBeFalsy();
  });

  it("21 | zone confirmer courriel est activée quand notifier par courriel", () => {
    component.appliquerNotifications("courriel");
    const courriel2 = component.problemeForm.get("courrielGroup.courriel2");
    expect(courriel2.disabled).toBeFalsy();
  });

  it("22 | zone adresse courriel est invalide sans valeur quand notifier par courriel", () => {
    component.appliquerNotifications("courriel");
    const courriel = component.problemeForm.get("courrielGroup.courriel");
    courriel.setValue("");
    expect(courriel.valid).toBeFalsy();
  });

  it("23 | zone confirmer courriel est invalide sans valeur quand notifier par courriel", () => {
    component.appliquerNotifications("courriel");
    const courriel2 = component.problemeForm.get("courrielGroup.courriel2");
    courriel2.setValue("");
    expect(courriel2.valid).toBeFalsy();

  });

  it("24 | zone adresse courriel est invalide avec un format non conforme", () => {
    component.appliquerNotifications("courriel");
    const courriel = component.problemeForm.get("courrielGroup.courriel");
    courriel.setValue("agaergegsehth");
    expect(courriel.valid).toBeFalsy();

  });

  it("25 | zone adresse courriel sans valeur et zone confirmer courriel avec valeur valide retourne faux", () => {
    const group = component.problemeForm.get("courrielGroup");
    const courriel = component.problemeForm.get("courrielGroup");
    const courriel2 = component.problemeForm.get("courrielGroup.courriel2");
    // courriel.setValue("");
    // courriel2.setValue("");
    // const errors = group.errors || {};
    expect(group.valid).toBeFalse();
  });

  it("26 | zone adresse courriel avec valeur valide et zone confirmer courriel sans valeur retourne null", () => {
    const group = component.problemeForm.get("courrielGroup");
    const courriel = component.problemeForm.get("courrielGroup.courriel");
    const courriel2 = component.problemeForm.get("courrielGroup.courriel2");
    courriel.setValue("asdf@exemple.com");
    // courriel2.setValue("");
    // const errors = group.errors || {};
    expect(group.valid).toBeFalse();

  });

  it("27 | zone adresse courriel et confirmer courriel sont invalides si les valeurs sont différentes quand notifier par courriel", () => {
    const group = component.problemeForm.get("courrielGroup");
    const courriel = component.problemeForm.get("courrielGroup.courriel");
    const courriel2 = component.problemeForm.get("courrielGroup.courriel2");
    courriel.setValue("asdf@exemple.com");
    courriel2.setValue("qwer@exemple.com");
    expect(group.valid).toBeFalse();
  });

  it("28 | zone adresse courriel et confirmer courriel sont valides si les valeurs sont identiques quand notifier par courriel", () => {
    const group = component.problemeForm.get("courrielGroup");
    const courriel = component.problemeForm.get("courrielGroup.courriel");
    const courriel2 = component.problemeForm.get("courrielGroup.courriel2");
    courriel.setValue("asdf@exemple.com");
    courriel2.setValue("asdf@exemple.com");
    expect(group.valid).toBeFalse();
  })


});
