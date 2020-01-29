import * as Browser from 'zombie';

export type IData = IEu[];

export interface IEu {
    name: string;
    modules: IModule[];
}

export interface IModule {
    name: string;
    exams: IExam[];
}

export interface IExam {
    name: string;
    note: number | string;
}

export function getNotesData(identifiant: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const browser = new Browser();
        browser.visit(
            'https://notes.info.iut-tlse3.fr/php/visuNotes.php',
        ).then(async () => {
            browser.fill('input[name=identifiant]', identifiant);
            browser.fill('input[name=pass]', password);
            browser.window.$('button').click();
            browser.wait().then(() => {
                resolve(browser.html());
            });
        }).catch((err) => {
            reject(err);
        });
    });
}
