import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe("zone validator", () => {
    it('#7 | Une chaîne avec 10 espaces est invalide', () => {
      let control = { value: ' '.repeat(10) }
      let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
      let result= validatorFn(control as AbstractControl);
      expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it("une chaine avec des espace mais la bonne quantité de caractères est valide", () => {
        let control = { value: " " + "a".repeat(10) + "   " }
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeFalsy();
    });
});