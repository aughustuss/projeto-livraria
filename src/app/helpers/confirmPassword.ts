import { FormGroup } from '@angular/forms'
export function ConfirmPasswordValidator(password: string, confirmPassword: string) {
    return (fg: FormGroup) => {
        const passwordControl = fg.controls[password];
        const confirmPasswordControl = fg.controls[confirmPassword];
        if (confirmPasswordControl.errors && confirmPasswordControl.errors['confirmPasswordValidator']) return
        if (passwordControl.value !== confirmPasswordControl.value){
            confirmPasswordControl.setErrors({
                confirmPasswordValidator: true,
            });
        } else {
            confirmPasswordControl.setErrors(null);
        }
    }
}