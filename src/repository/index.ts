import { Repository } from '../@types/Repository';
import { Note } from '../models/Note';

export class NoteRepositoryFactory {
    constructor(private repositoryType: string) {}

    async create(): Promise<Repository<Note>> {
        try {
            const repository = await import(`./${this.repositoryType}.ts`);
            const Note = repository.default;
            return new Note();
        } catch (error) {
            throw new Error();
        }
    }
}
