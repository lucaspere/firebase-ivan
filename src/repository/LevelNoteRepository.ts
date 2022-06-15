import LevelDB from '../db/Level';
import { INote } from '../@types/Note';
import { Repository } from '../@types/Repository';

export default class LevelNoteRepository implements Repository<INote> {
    async clear(): Promise<void> {
        await LevelDB.clear();
    }
    async create(newNote: INote): Promise<INote> {
        await LevelDB.put(newNote.id, newNote);

        const note = await LevelDB.get(newNote.id);

        return note;
    }
    async find(id: string): Promise<INote> {
        return await LevelDB.get(id);
    }
    async list(): Promise<INote[]> {
        const notes: INote[] = [];
        for await (const note of LevelDB.values()) {
            notes.push(note);
        }

        return notes;
    }
    async update(
        id: string,
        payload: Partial<INote>,
    ): Promise<INote | undefined> {
        const note = await LevelDB.get(id);
        if (note) {
            const updatedNote = Object.assign(note, payload);

            await LevelDB.put(id, updatedNote);

            return updatedNote;
        }
    }
    async delete(id: string): Promise<INote | undefined> {
        const note = await LevelDB.get(id);

        if (note) {
            await LevelDB.del(id);
            return note;
        }
    }
}
