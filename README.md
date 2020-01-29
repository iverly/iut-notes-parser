# iut-notes-parser

![build logo](https://travis-ci.com/iverly/iut-notes-parser.svg?branch=master)
![size logo](https://img.shields.io/github/languages/code-size/iverly/iut-notes-parser)
![last logo](https://img.shields.io/github/last-commit/iverly/iut-notes-parser)
![license logo](https://img.shields.io/github/license/iverly/iut-notes-parser)

Parser for notes of IUT "A" Toulouse IT department

## Installation

```bash
yarn add https://github.com/iverly/iut-notes-parser
# or npm install iverly/iut-notes-parser
```

## Usage

```js
const noteParser = require('iut-notes-parser');

noteParser.getNotes('username', 'password')
    .then((data) => console.log(data))
    .catch((err) => console.error(error.code));

/* Return a structure like this
[
   {
      "name":"Eu1",
      "modules":[
         {
            "name":"Module1",
            "exams":[
               {
                  "name":"Exam 1",
                  "note":"20.000"
               }
            ]
         }
      ]
   }
]
*/
```

## Methods

#### getNotes(username: string, password: string): Promise\<IData\>

Return an Array containing all EU and for each EU, return modules with their exams.

#### getData(username: string, password: string): Promise\<any\>

Return brut data from IUT's website.

#### getEusFromData(data: any): IEu[]

Same as getNotes but data need to be fetched.

#### getModulesFromEu(data: any, eu: string): IModule[]

Return an Array containing all modules with their exams for a specific EU.

#### getExamsFromModule(data: any, module: string): IExam[]

Return an Array containing all exams for a specific module.

## Typings

#### IEu / IData

```ts
interface IEu {
    name: string;
    modules: IModule[];
}
```

```ts
declare type IData = IEu[];
```

#### IModule

```ts
interface IModule {
    name: string;
    exams: IExam[];
}
```

#### IExam

```ts
interface IExam {
    name: string;
    note: number | string;
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate and follow Angular instruction for commit name ([here](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)).

## License
[MIT License](https://choosealicense.com/licenses/mit/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
