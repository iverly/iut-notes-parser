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
