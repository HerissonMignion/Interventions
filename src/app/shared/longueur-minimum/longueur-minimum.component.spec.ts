import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe("zone validator", () => {
    it('#7 | Une chaîne avec 10 espaces est invalide', () => {
      let control = { value: ' '.repeat(10) };
      let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
      let result= validatorFn(control as AbstractControl);
      expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it("une chaine avec des espace mais la bonne quantité de caractères est valide", () => {
        let control = { value: " " + "a".repeat(10) + "   " };
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeFalsy();
    });

    it("#8 | une phrase avec des mots est valide", () => {
        let control = { value: "vive angular" };
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeFalsy();
    });

    it("#9 | une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide", () => {
        let control = { value: "   je le veux   " };
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeFalsy();
    });

    it("#10 | une phrase avec 1 espace et 2 caractères est invalide", () => {
        let control = { value: " xx" };
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it("#11 | une phrase avec 2 espaces et 1 caractères est invalide", () => {
        let control = { value: "  x" };
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it("#12 | une phrase avec 3 espaces et 3 caractères est valide", () => {
        let control = { value: "   xxx" };
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeFalsy();
    });

    it("#13 | une phrase avec 5 espaces, 5 caractères et 5 espaces est valide", () => {
        let control = { value: "     xxxxx     " };
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result).toBeFalsy();
    });

    it("#14 | une chaine nulle est invalide", () => {
        let control = { value: "" };
        let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
    })
});