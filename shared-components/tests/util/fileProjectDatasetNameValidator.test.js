import { fileProjectDatasetNameValidator } from '../../src/components/util/fileProjectDatasetNameValidator';

describe('with files', () => {
  it('rejects symbols other than underscores, hyphens, and periods', () => {
    expect(fileProjectDatasetNameValidator('foo$bar.R', 'file')).toEqual(false);
    expect(fileProjectDatasetNameValidator('foo*bar.R', 'file')).toEqual(false);
    expect(fileProjectDatasetNameValidator('foo+bar.R', 'file')).toEqual(false);
  });

  it('can start with a period', () => {
    expect(fileProjectDatasetNameValidator('.foobar', 'file')).toEqual(true);
  });

  it('can start with a letter', () => {
    expect(fileProjectDatasetNameValidator('foobar', 'file')).toEqual(true);
  });

  it('can start with a number', () => {
    expect(fileProjectDatasetNameValidator('1foobar', 'file')).toEqual(true);
  });

  it('can start with an underscore', () => {
    expect(fileProjectDatasetNameValidator('__init__.py', 'file')).toEqual(true);
  });
});
