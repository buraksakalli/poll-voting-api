const expect = require('chai').expect;
const { createEntry } = require('../src/models');

describe('createEntry', () => {
  it('should return 500', async () => {
    const entry = {
      title: 'test',
      content: 'test',
    };
    const result = await createEntry(entry);
    expect(result).to.have.property('status', 500);
  });
});
