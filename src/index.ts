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

function pop2Start(input: string): string {
    const split = input.split(' ').reverse();
    split.pop(); split.pop();
    return split.reverse().join(' ');
}

export function getData(identifiant: string, password: string): Promise<any> {
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

export function getEusFromData(data): IEu[] {
    const eus = [];
    try {
        data.definitions[0].eu.forEach((eu) => {
            eus.push({
                name: pop2Start(eu),
                modules: getModulesFromEu(data, eu),
            });
        });
        return eus;
    } catch (err) {
        return [] as unknown as IEu[];
    }
}

export function getModulesFromEu(data: any, eu: string): IModule[] {
    const id = eu.split(' ')[0].replace('UE', '');
    try {
        const modulesFilter = data.definitions[0].mat.filter(x => x.startsWith(id));
        const modules = [];
        modulesFilter.forEach((mod) => {
            modules.push({
                name: pop2Start(mod),
                exams: getExamsFromModule(data, mod),
            });
        });
        return modules;
    } catch (err) {
        return [] as unknown as IModule[];
    }
}

export function getExamsFromModule(data: any, mod: string): IExam[] {
    const id = mod.split(' ')[0];
    try {
        const examsFilter = data.notes.filter(x => x.name.startsWith(id));
        const exams = [];
        examsFilter.forEach((exam) => {
            exams.push({
                name: pop2Start(exam.name),
                note: exam.value,
            });
        });
        return exams;
    } catch (err) {
        return [] as unknown as IExam[];
    }
}

export function getNotes(identifiant: string, password: string): Promise<IData> {
    return new Promise(async (resolve, reject: (error: IError) => void) => {
        if (!identifiant) return reject({ code: 'IdentifiantNotFound' });
        if (!password) return reject({ code: 'PasswordNotFound' });
        try {
            const data = await getData(identifiant, password);
            if (!data.definitions[0].eu) return reject({ code: 'Incorrect credentials' });
            const parse = getEusFromData(data);
            resolve(parse);
        } catch (err) {
            return reject({ code: 'UnknowError' });
        }
    });
}
