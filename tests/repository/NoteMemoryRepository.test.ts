/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { assert, expect } from 'chai';
import { Note } from '../../src/models/Note';

import NoteMemoryRepository from '../../src/repository/NoteMemoryRepository';

describe('Testing MemoryDB Repository', function () {
    const noteRepository = new NoteMemoryRepository();

    this.afterEach(async () => {
        await noteRepository.clear();
    });

    it('Should clear database', async () => {
        const note = new Note('Note Test', 'Testing Level DB Repository');

        await noteRepository.create(note);
        await noteRepository.clear();

        const notes = await noteRepository.list();

        expect(!!notes.length).be.false;
    });

    it('Should save a note', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        const note = await noteRepository.create(newNote);

        assert.isTrue(newNote.equals(note));
    });

    it('Should get a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await noteRepository.create(newNote);

        const note = await noteRepository.find(newNote.id);

        expect(newNote.equals(note!)).be.true;
    });

    it('Should get undefind with invalid id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        const note = await noteRepository.find(newNote.id);

        expect(note).be.undefined;
    });

    it('Should list notes', async () => {
        const note1 = new Note('Note Test', 'Testing Level DB Repository');
        const note2 = new Note('Note Test 2', 'Testing Level DB Repository 2');
        await noteRepository.create(note1);
        await noteRepository.create(note2);

        const notes = await noteRepository.list();

        assert.equal(notes.length, 2);
    });

    it('Should update a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await noteRepository.create(newNote);

        newNote.description = 'Note Test Updated!';

        const note = await noteRepository.update(newNote.id, newNote);

        expect(newNote.equals(note!)).be.true;
    });

    it('Should update undefined with invalid id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');

        newNote.description = 'Note Test Updated!';

        const note = await noteRepository.update(newNote.id, newNote);

        assert.isUndefined(note);
    });

    it('Should delete a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await noteRepository.create(newNote);

        const note = await noteRepository.delete(newNote.id);

        expect(newNote.equals(note!)).be.true;
    });

    it('Should delete undefind with invalid id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        const note = await noteRepository.delete(newNote.id);

        expect(note).be.undefined;
    });
});
