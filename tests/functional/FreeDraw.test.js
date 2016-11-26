import Nightmare from 'nightmare';
import { resolve } from 'path';
import { expect } from 'chai';
import { createFirstPolygon, createSecondPolygon, createMergedPolygon, removeFirstPolygon } from './helpers/Polygons';

/**
 * @constant timeout
 * @type {Number}
 */
const timeout = 30000;

// Instantiate Nightmare.
const nightmare = Nightmare({ show: false, frame: false });

// Fetch the absolute path to the index page.
const url = `file://${resolve('example/index.html')}`;

/**
 * @method error
 * @param {Function} done
 * @return {Function}
 */
function error(done) {

    return err => {
        console.log(err);
        done();
    };

}

describe('FreeDraw', () => {

    it('It should be able to create separate polygons;', done => {

        nightmare
            .goto(url)
            .wait('svg.free-draw')
            .evaluate(createMergedPolygon)
            .then(polygons => expect(polygons.length).to.equal(1))
            .then(() => done())
            .catch(error(done));

    }).timeout(timeout);

    it('It should be able to create merged polygons;', done => {

        nightmare
            .goto(url)
            .wait('svg.free-draw')
            .evaluate(createFirstPolygon)
            .evaluate(createSecondPolygon)
            .then(polygons => expect(polygons.length).to.equal(2))
            .then(() => done())
            .catch(error(done));

    }).timeout(timeout);

    it('It should be able to delete polygon;', done => {

        nightmare
            .goto(url)
            .wait('svg.free-draw')
            .evaluate(removeFirstPolygon)
            .then(polygons => expect(polygons.length).to.equal(1))
            .then(() => done())
            .catch(error(done));

    }).timeout(timeout);

});
