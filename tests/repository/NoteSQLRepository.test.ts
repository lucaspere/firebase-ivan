/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from 'chai';
import { Note } from '../../src/models/Note';

import NoteSQLRepository from '../../src/repository/NoteSQLRepository';
import { PrismaClient } from '@prisma/client';

const sqlDB = new PrismaClient();

describe('Testing SQL Repository', function () {
    const noteRepository = new NoteSQLRepository();

    this.afterAll(async function closeDB() {
        await sqlDB.$disconnect();
    });

    this.afterEach(async function () {
        await sqlDB.note.deleteMany();
    });

    it('Should clear database', async () => {
        const note1 = new Note('Note Test', 'Testing Level DB Repository');
        const note2 = new Note('Note Test 2', 'Testing Level DB Repository 2');
        await sqlDB.note.create({ data: note1 });
        await sqlDB.note.create({ data: note2 });

        await noteRepository.clear();

        const note = await sqlDB.note.findFirst();

        expect(!!note).be.false;
    });

    it('Should save a note', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        const note = await noteRepository.create(newNote);

        expect(newNote.equals(note)).be.true;
    });

    it('Should get a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await sqlDB.note.create({ data: newNote });

        const note = await noteRepository.find(newNote.id);

        expect(newNote.equals(note!)).be.true;
    });

    it('Should list notes', async () => {
        const note1 = new Note('Note Test', 'Testing Level DB Repository');
        const note2 = new Note('Note Test 2', 'Testing Level DB Repository 2');
        await sqlDB.note.create({ data: note1 });
        await sqlDB.note.create({ data: note2 });

        const notes = await noteRepository.list();

        expect(notes.length).to.be.eq(2);
    });

    it('Should update a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await sqlDB.note.create({ data: newNote });

        newNote.description = 'Note Test Updated!';

        const note = await noteRepository.update(newNote.id, newNote);

        expect(newNote.equals(note!)).be.true;
    });

    it('Should delete a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await sqlDB.note.create({ data: newNote });

        const note = await noteRepository.delete(newNote.id);

        expect(newNote.equals(note!)).be.true;
    });
});
