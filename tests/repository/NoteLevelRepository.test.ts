/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from 'chai';
import { Note } from '../../src/models/Note';

import LevelNoteRepository from '../../src/repository/LevelNoteRepository';
import levelDB from '../../src/db/Level';

describe('Testing levelDB Repository', function () {
    const noteRepository = new LevelNoteRepository();

    this.afterAll(async function closeDB() {
        await levelDB.close();
    });

    this.afterEach(async function () {
        await levelDB.clear();
    });

    it('Should clear database', async () => {
        const note1 = new Note('Note Test', 'Testing Level DB Repository');
        const note2 = new Note('Note Test 2', 'Testing Level DB Repository 2');
        await levelDB.batch([
            {
                type: 'put',
                key: note1.id,
                value: note1,
            },
            {
                type: 'put',
                key: note2.id,
                value: note2,
            },
        ]);
        await noteRepository.clear();

        const notes = await levelDB.values().all();

        expect(!!notes.length).be.false;
    });

    it('Should save a note', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        const note = await noteRepository.create(newNote);

        expect(newNote.equals(note)).be.true;
    });

    it('Should get a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await levelDB.put(newNote.id, newNote);

        const note = await noteRepository.find(newNote.id);

        expect(newNote.equals(note)).be.true;
    });

    it('Should list notes', async () => {
        const note1 = new Note('Note Test', 'Testing Level DB Repository');
        const note2 = new Note('Note Test 2', 'Testing Level DB Repository 2');
        await levelDB.batch([
            {
                type: 'put',
                key: note1.id,
                value: note1,
            },
            {
                type: 'put',
                key: note2.id,
                value: note2,
            },
        ]);

        const notes = await noteRepository.list();

        expect(notes.length).to.be.eq(2);
    });

    it('Should update a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await levelDB.put(newNote.id, newNote);

        newNote.description = 'Note Test Updated!';

        const note = await noteRepository.update(newNote.id, newNote);

        expect(newNote.equals(note!)).be.true;
    });

    it('Should delete a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await levelDB.put(newNote.id, newNote);

        const note = await noteRepository.delete(newNote.id);

        expect(newNote.equals(note!)).be.true;
    });
});