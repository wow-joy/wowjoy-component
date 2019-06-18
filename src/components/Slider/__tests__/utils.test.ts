import * as utils from "../utils";

describe("utils", () => {
  describe("getClosestMark", () => {
    it("should return current closest mark", () => {
      const marks = { 0: 0, 30: 30, 50: 50, 60: 60 };
      expect(utils.getClosestMark(marks, 10)).toBe(0);
      expect(utils.getClosestMark(marks, 20)).toBe(30);
      expect(utils.getClosestMark(marks, 10)).toBe(0);
    });
  });
  describe("calculateNextValue", () => {
    it("increase", () => {
      const props = {
        marks: { 0: 0, 35: 35, 66: 66, 88: 88 },
        step: 10,
        min: 0,
        max: 100
      };
      expect(utils.calculateNextValue("increase", 10, props)).toBe(20);
      expect(utils.calculateNextValue("increase", 14, props)).toBe(20);
      expect(utils.calculateNextValue("increase", 33, props)).toBe(40);
      expect(utils.calculateNextValue("increase", 60, props)).toBe(70);
    });
    it("decrease", () => {
      const props = {
        marks: { 0: 0, 35: 35, 66: 66, 88: 88 },
        step: 10,
        min: 0,
        max: 100
      };
      expect(utils.calculateNextValue("decrease", 33, props)).toBe(30);
      expect(utils.calculateNextValue("decrease", 40, props)).toBe(30);
      expect(utils.calculateNextValue("decrease", 68, props)).toBe(60);
      expect(utils.calculateNextValue("decrease", 77, props)).toBe(70);
    });
  });
  describe("getClosestPoint", () => {
    it("only marks", () => {
      const props = {
        marks: { 0: 0, 30: 30, 60: 60 },
        step: null,
        min: 0,
        max: 100
      };
      expect(utils.getClosestPoint(18, props)).toBe(30);
      expect(utils.getClosestPoint(40, props)).toBe(30);
      expect(utils.getClosestPoint(50, props)).toBe(60);
    });

    it("step && marks", () => {
      const props = {
        marks: { 0: 0, 35: 35, 66: 66, 88: 88 },
        step: 10,
        min: 0,
        max: 100
      };
      expect(utils.getClosestPoint(32, props)).toBe(30);
      expect(utils.getClosestPoint(44, props)).toBe(40);
      expect(utils.getClosestPoint(45, props)).toBe(50);
    });

    it("only step", () => {
      const props = {
        marks: {},
        step: 6,
        min: 0,
        max: 100
      };
      expect(utils.getClosestPoint(10, props)).toBe(12);
      expect(utils.getClosestPoint(102, props)).toBe(96);
    });
  });
});
