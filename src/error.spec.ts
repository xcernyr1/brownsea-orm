import { Error400, Error404, Error500 } from './errors';
import { expect } from 'chai';
describe('Errors', () => {
    it('Error404 should have status 404', () => {
        var error404 = new Error404();
        expect(error404.stack).to.exist;
        expect(error404.status).to.equal(404);
    })
    it('Error400 should have status 400', () => {
        var error400 = new Error400();
        expect(error400.stack).to.exist;
        expect(error400.status).to.equal(400);
    })
    it('Error500 should have status 500', () => {
        var error500 = new Error500();
        expect(error500.stack).to.exist;
        expect(error500.status).to.equal(500);
    })
})