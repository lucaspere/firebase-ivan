import { Level } from 'level';
import { INote } from '../models/Note';
import { BaseError } from '../utils/errors/BaseError';
import {
    LevelErrorResponse,
    LEVEL_DB_ERRORS_TYPES,
} from '../utils/errors/LevelDB';
import { HTTPErrors } from '../utils/errors/HTTPErros';

const levelDB = new Level<string, INote>(
    process.env.LEVELDB_LOCATION || 'notes.level',
    {
        createIfMissing: true,
        valueEncoding: 'json',
    },
);

type levelKeys = keyof typeof levelDB;

class LevelFactory {
    constructor(private level: Level<string, INote>) {}

    create(method: levelKeys) {
        switch (method) {
            case 'get':
                return this.get;
            default:
                return this.level[method];
        }
    }
    get = async (id: string) => {
        try {
            return await this.level.get(id);
        } catch (error) {
            const { code } = error as LevelErrorResponse;
            if (code === LEVEL_DB_ERRORS_TYPES.LEVEL_NOT_FOUND) {
                const { name, code, type } = HTTPErrors.RESOURCE_NOT_FOUND;

                throw new BaseError(
                    name,
                    code,
                    `Note with id {${id}} not Found`,
                );
            }
        }
    };
}

const levelFactory: ProxyHandler<Level<string, INote>> = {
    get(levelInstance, propKey: levelKeys) {
        return new LevelFactory(levelInstance).create(propKey);
    },
};

export default new Proxy(levelDB, levelFactory);
