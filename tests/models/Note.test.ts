import { assert, expect } from 'chai';
import { v4, validate as validateUUID } from 'uuid';
import { Note } from '../../src/models/Note';

describe('Testing Note Model', function () {
    it('Should instanciar corretily', () => {
        const note = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
        );

        assert.propertyVal(note, 'title', 'Note Model test');
        assert.propertyVal(
            note,
            'description',
            'Testing the constructor inicitialize',
        );

        expect(validateUUID(note.id)).be.true;
    });

    it('Should serialize correctily', () => {
        const note = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
        );

        expect(note.to_JSON()).to.be.equals(JSON.stringify(note));
    });

    it('Should build a note from JSOn correctily', () => {
        const note = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
            v4(),
        );
        const noteJSON = JSON.stringify(note);
        const { id, title, description } = Note.from_JSON(noteJSON);

        expect(id).to.be.equals(note.id);
        expect(title).to.be.equals(note.title);
        expect(description).to.be.equals(note.description);
    });

    it('Should handle notes equalies', () => {
        const id = v4();
        const note = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
            id,
        );
        const copyNote = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
            id,
        );

        expect(note.equals(copyNote)).be.true;
    });
});
