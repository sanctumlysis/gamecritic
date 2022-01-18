const { idValidator, reviewValidator } = require('../app/utils');
const db = require('../db/connection');

afterAll(() => db.end());

describe('App Utils', () => {
  describe('#idValidator', () => {
    it('should return a boolean', () => {
      const output = idValidator(1);
      expect(output.constructor).toBe(Boolean);
    });

    it('pass: when passed a number - or a string which can be coerced to a number, return true', () => {
      const withInt = idValidator(1);
      const withString = idValidator('1');
      expect(withInt).toBe(true);
      expect(withString).toBe(true);
    });

    it('fail: when passed not a number, or an uncoercable data type, return false', () => {
      const withArray = idValidator(['1', 2, false]);
      const withObject = idValidator({ shouldReturn: false });
      const withNaN = idValidator(NaN);

      expect(withArray).toBe(false);
      expect(withObject).toBe(false);
      expect(withNaN).toBe(false);
    });
  });

  describe('#reviewValidator', () => {
    it('should return a boolean', async () => {
      const output = await reviewValidator(1);
      expect(output.constructor).toBe(Boolean);
    });

    it('pass: less or equal to the total number of reviews in db, return true', async () => {
      const output = await reviewValidator(2);
      expect(output).toBe(true);
    });

    it('pass: can be coerced into a number and is less than the total number of reviews in db, return true', async () => {
      const withString = await reviewValidator('3');
      expect(withString).toBe(true);
    });

    it('fail: greater than the total number of reviews in db, return false', async () => {
      const output = await reviewValidator(1000);
      expect(output).toBe(false);
    });

    it('fail: can be coerced to a number, but is less than zero, return false', async () => {
      const withInt = await reviewValidator(-1);
      const withString = await reviewValidator('-1');

      expect(withInt).toBe(false);
      expect(withString).toBe(false);
    });

    it('fail: cannot be coerced to a number, return false', async () => {
      const withArray = await reviewValidator([1, '4', false]);
      const withObject = await reviewValidator({ shouldReturn: false });
      const withNaN = await reviewValidator(NaN);

      expect(withArray).toBe(false);
      expect(withObject).toBe(false);
      expect(withNaN).toBe(false);
    });
  });
});
