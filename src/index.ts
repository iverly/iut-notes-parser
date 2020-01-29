import * as Browser from 'zombie';
import * as HtmlParser from 'html-to-json-data';
import { group, text } from 'html-to-json-data/definitions';

type IData = IEu[];

interface IEu {
    name: string;
    modules: IModule[];
}

interface IModule {
    name: string;
    exams: IExam[];
}

interface IExam {
    name: string;
    note: number | string;
}

interface IError {
    code: string;
}

function getData(identifiant: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const browser = new Browser();
        browser.visit(
            'https://notes.info.iut-tlse3.fr/php/visuNotes.php',
        ).then(async () => {
            browser.fill('input[name=identifiant]', identifiant);
            browser.fill('input[name=pass]', password);
            browser.window.$('button').click();
            browser.wait().then(() => {
                resolve(HtmlParser(browser.html(), {
                    definitions: group('html', {
                        eu: text('body > ul > b'),
                        mat: text('body > ul > ul > b'),
                    }),
                    notes: group('table tr', {
                        name: text('td[style="width:60%"]'),
                        value: text('td[style="width:40%"]'),
                    }),
                }));
            });
        }).catch(reject);
    });
}

export default function (identifiant: string, password: string): Promise<IData> {
    return new Promise(async (resolve, reject: (reason?: IError) => void) => {
        if (!identifiant) return reject({ code: 'IdentifiantNotFound' });
        if (!password) return reject({ code: 'PasswordNotFound' });
        try {
            const data = await getData(identifiant, password);
            if (!data.notes || data.notes.lenght === 0) return reject({ code: 'Incorrect credentials' });
            resolve(data);
        } catch (err) {
            return reject({ code: 'UnknowError' });
        }
    });
}
