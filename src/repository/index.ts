import { Note } from '../models/Note';
import { Repository } from './Repository';

export class NoteRepositoryFactory {
    constructor(private repositoryType: string) {}

    async create(): Promise<Repository<Note>> {
        try {
            const repository = await import(`./${this.repositoryType}.ts`);
            const Note = repository.default;
            return new Note();
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    }
}
