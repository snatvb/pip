import * as fs from 'fs';
import * as path from 'path';

type State = {
    name: string;
};

function save(filePath: string, data: string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf8', (err: any) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

function load(filePath: string): Object {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err: any, data: string | Buffer) => {
            if (err) return reject(err);
            const dataStr = data.toString();
            let result;
            try {
                result = JSON.parse(dataStr);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    });
}

const createSave = (state: State) => ({
    save: (data: any) => save(path.resolve(__dirname, `${state.name}.json`), JSON.stringify(data))
});
const createLoad = (state: State) => ({
    load: () => load(path.resolve(__dirname, `${state.name}.json`))
});

export default function createSaver(name: string) {
    const state: State = { name };
    return Object.assign({}, createLoad(state), createSave(state));
}
