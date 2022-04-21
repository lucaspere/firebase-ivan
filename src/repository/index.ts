import { Note } from '../models/Note';
import NoteMemoryRepository from './NoteMemoryRepository';
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
            return new NoteMemoryRepository();
        }
    }
}
