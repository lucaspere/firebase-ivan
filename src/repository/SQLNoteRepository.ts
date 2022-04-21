import { Note } from '../models/Note';
import { Repository } from './Repository';
import { PrismaClient } from '@prisma/client';

const sqlDB = new PrismaClient().note;

export default class SQLNoteRepository implements Repository<Note> {
    async clear(): Promise<void> {
        await sqlDB.deleteMany();
    }
    async create(newNote: Note): Promise<Note> {
        const note = await sqlDB.create({ data: newNote });

        return note as Note;
    }
    async find(id: string): Promise<Note | undefined> {
        const note = await sqlDB.findUnique({ where: { id } });

        if (note) return note as Note;
    }
    async list(): Promise<Note[]> {
        const notes = await sqlDB.findMany();

        return notes as Note[];
    }
    async update(
        id: string,
        payload: Partial<Note>,
    ): Promise<Note | undefined> {
        const note = await sqlDB.findUnique({ where: { id } });
        if (note) {
            const noteUpdated = await sqlDB.update({
                where: { id },
                data: payload,
            });
            return noteUpdated as Note;
        }
    }
    async delete(id: string): Promise<Note | undefined> {
        const note = await sqlDB.findUnique({ where: { id } });
        if (note) {
            const noteDeleted = await sqlDB.delete({ where: { id } });
            return noteDeleted as Note;
        }
    }
}
