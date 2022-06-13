import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'dialogComp.component.html',
})
export class DialogCompComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogCompComponent>,
        public router: Router
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
    onYesClick(): void {
        this.dialogRef.close();
        this.router.navigate(['/account/login']);
    }
}