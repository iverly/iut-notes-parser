const parser = require('../dist/index');

const dataNotParsed = {
    definitions: [
        {
            eu: ['4RUE11 - Eu1'],
            mat: ['4R1101 - Module1'],
        }
    ],
    notes: [
        {
            name: "4R1101E5 - Exam 1",
            value: "20.000",
        }
    ]
}

describe('testing eu', () => {
    const euParsed = parser.getEusFromData(dataNotParsed);
    
    it('should return eu', () => {
        expect(euParsed).toHaveLength(1);
    });

    it('should return name', () => {
        expect(euParsed[0].name).toBe('Eu1');
    });

    it('should return a module', () => {
        expect(euParsed[0].modules).not.toHaveLength(0);
    });

});

describe('testing module', () => {
    const moduleParsed = parser.getModulesFromEu(dataNotParsed, '4RUE11 - Eu1');

    it('should return module', () => {
        expect(moduleParsed).toHaveLength(1);
    });

    it('should return name', () => {
        expect(moduleParsed[0].name).toBe('Module1');
    });

    it('should return a exam', () => {
        expect(moduleParsed[0].exams).not.toHaveLength(0);
    });

});

describe('testing exam', () => {
    const examParsed = parser.getExamsFromModule(dataNotParsed, '4R1101 - Module1');

    it('should return exam', () => {
        expect(examParsed).toHaveLength(1);
    });

    it('should return name', () => {
        expect(examParsed[0].name).toBe('Exam 1');
    });

    it('should return note', () => {
        expect(examParsed[0].note).toBe('20.000');
    });

});