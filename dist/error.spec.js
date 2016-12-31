"use strict";
const errors_1 = require('./errors');
const chai_1 = require('chai');
describe('Errors', () => {
    it('Error404 should have status 404', () => {
        var error404 = new errors_1.Error404();
        chai_1.expect(error404.stack).to.exist;
        chai_1.expect(error404.status).to.equal(404);
    });
    it('Error400 should have status 400', () => {
        var error400 = new errors_1.Error400();
        chai_1.expect(error400.stack).to.exist;
        chai_1.expect(error400.status).to.equal(400);
    });
    it('Error500 should have status 500', () => {
        var error500 = new errors_1.Error500();
        chai_1.expect(error500.stack).to.exist;
        chai_1.expect(error500.status).to.equal(500);
    });
});
//# sourceMappingURL=error.spec.js.map