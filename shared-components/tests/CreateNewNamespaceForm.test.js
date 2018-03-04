import { fileProjectDatasetNameValidator } from '../src/components/util/fileProjectDatasetNameValidator';


test(`
  passes only strings starting with letters or numbers and then only letters,
  numbers, underscores, and dashes for anything that isn\'t a file`, () => {
  const shouldPass = [
    'a',
    'A',
    '1',
    '123',
    'aK',
    'ak',
    'Ak',
    'AK',
    'a1',
    'A8',
    'a-',
    'A_',
    '1o',
    '1W',
    '1-',
    '1_',
    'aKSDFjkjfj9889---___',
    'akik__-_llsfSFDl1239',
    'Akk_-sS33',
    'a18k_-fjlL',
    'A899-99999',
    'a--i',
    'A___iii',
    '1o_l0',
    '1W-9ij',
    '1-i',
    '1_0',
  ];

  const didntPass = shouldPass.filter(s => !fileProjectDatasetNameValidator(s, "directory"));
  expect(didntPass).toEqual([]);
});

test('fails strings not starting with letters or numbers and/or not followed by letters, numbers, underscores, and dashes', () => {
  const shouldntPass = [
    '-',
    '_',
    '*',
    '1|3',
    'a{',
    'a}',
    'A=',
    'A+K',
    'a*1',
    'A^8',
    'a%-',
    'A$_',
    '1#o',
    '1@W',
    '1!-',
    '1,_',
    'aKS,DFjkjfj9889---___',
    'a kik__-_llsfSFDl1239',
    'Akk_-sS)*)33',
    'a1 8k_-fjlL',
    'A89&9-99999',
    'a--,,i',
    'A_((__iii',
    '1o_ l0',
    '1)W-9ij',
    '1- i',
    '1,_0',
  ];

  const passed = shouldntPass.filter(s => fileProjectDatasetNameValidator(s, "directory"));
  expect(passed).toEqual([]);
});

test('fails strings with / for file names', () => {
  const shouldntPass = [
    'n/',
    'sdf/',
    '/sdf/kjk98',
    '/',
    'sdflksj/sdff343/',
    '/ssddd',
  ];

  const passed = shouldntPass.filter(s => fileProjectDatasetNameValidator(s, "file"));
  expect(passed).toEqual([]);
});

test('allows strings with . for file names not at start', () => {
  const shouldntPass = [
    'n.',
    'sdf.',
    'sdf.kjk98',
    'sdflksj.sdff343.',
    'ssdd.d',
  ];

  const passed = shouldntPass.filter(s => !fileProjectDatasetNameValidator(s, "file"));
  expect(passed).toEqual([]);
});
