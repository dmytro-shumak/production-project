import { classNames } from './classNames';

describe('classNames', () => {
  it('should return the correct class names', () => {
    const classes = 'button';
    const mods = { active: true, disabled: false };
    const additionalClasses = ['primary', 'large'];

    const result = classNames(classes, mods, additionalClasses);

    expect(result).toBe('button active primary large');
  });

  it('should return only the base class when no mods or additional classes are provided', () => {
    const classes = 'button';

    const result = classNames(classes);

    expect(result).toBe('button');
  });

  it('should ignore mods with falsy values', () => {
    const classes = 'button';
    const mods = { active: true, disabled: false, hidden: false };
    const additionalClasses = ['primary', 'large'];

    const result = classNames(classes, mods, additionalClasses);

    expect(result).toBe('button active primary large');
  });

  it('should ignore empty additional classes', () => {
    const classes = 'button';
    const additionalClasses = ['', 'primary', null, 'large'];

    const result = classNames(classes, {}, additionalClasses);

    expect(result).toBe('button primary large');
  });
});

// describe('classNames', () => {
//   test('should return the correct class names', () => {
//     console.log(classNames('sdf'));
//     expect(true).toBe(true);
//   });
// });
