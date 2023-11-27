import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent, SimpleDialogData } from './simple-dialog/simple-dialog.component';
import { lastValueFrom } from 'rxjs';


export class dlg {

    static injector: Injector;

    /**
     * Вопрос с вариантами Да или Нет.
     * @param message Текст вопроса
     * @param title Заголовок вопроса
     */
    static async askAsync(message: string, title?: string): Promise<boolean> {
        const matDialog: MatDialog = dlg.injector.get(MatDialog);

        let dialog = matDialog.open(SimpleDialogComponent, {
            data: <SimpleDialogData>{
                message,
                title
            }
        });
        return !!(await lastValueFrom(dialog.afterClosed()));
    }
}
