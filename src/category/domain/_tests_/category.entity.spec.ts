import { create } from "lodash";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Test", () => {
  let validatorSpy: any;
  beforeEach(() => {
    validatorSpy = jest.spyOn(Category, "validate");
  });
  describe("constructor", () => {
    test("should create a category with deafult values", () => {
      const category = new Category({
        name: "Romance",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Romance");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with values", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Terror",
        description: "Terror Description",
        is_active: false,
        created_at,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Terror");
      expect(category.description).toBe("Terror Description");
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with description value", () => {
      const category = new Category({
        name: "Fantasy",
        description: "Fantasy description",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Fantasy");
      expect(category.description).toBe("Fantasy description");
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with is_active value", () => {
      const category = new Category({
        name: "Movie",
        is_active: true,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should create a category with created_at value", () => {
      const created_at = new Date();
      const category = new Category({
        name: "Serie",
        created_at,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Serie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("create a command", () => {
    test("should creat a category with command", () => {
      const category = Category.create({
        name: "Serie",
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Serie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validatorSpy).toHaveBeenCalledTimes(1);
    });

    test("should change name", () => {
      const category = Category.create({
        name: "Serie",
      });
      category.changeName("Terror");
      expect(category.name).toBe("Terror");
      expect(validatorSpy).toHaveBeenCalledTimes(2);
    });

    test("shoudl change description", () => {
      const category = Category.create({
        name: "Serie",
        description: "Terror Description",
      });
      category.changeDescription("Serie description");
      expect(category.description).toBe("Serie description");
      expect(validatorSpy).toHaveBeenCalledTimes(2);
    });

    test("should active", () => {
      const category = new Category({
        name: "Movie",
        is_active: false,
      });
      category.active();
      expect(category.is_active).toBe(true);
    });

    test("should desactive", () => {
      const category = new Category({
        name: "Movie",
        is_active: true,
      });
      category.desactive();
      expect(category.is_active).toBe(false);
    });
  });

  describe("category_field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];

    test.each(arrange)("id = %j", ({ category_id }) => {
      const category = new Category({
        name: "Serie",
        category_id: category_id as any,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });
});

describe("Category Validation", () => {
  describe("create command", () => {
    test("should an invalid category with name property", () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => Category.create({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        Category.create({ name: "t".repeat(256) })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a invalid category using  description property", () => {
      expect(() =>
        Category.create({ name: "Serie", description: 5 } as any)
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a invalid category using is_active property", () => {
      expect(() =>
        Category.create({ name: "Serie", is_active: 5 } as any)
      ).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });

    it("should a invalid category using name preporty", () => {
      let category = Category.create({ name: "Movie" });
      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => category.changeName("")).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => category.changeName(5 as any)).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    });
  });

  describe("changeDescription method", () => {
    it("should a invalid category using property", () => {
      const category = Category.create({ name: "Serie" });
      expect(() => category.changeDescription(5 as any)).containsErrorMessages({
        description: ["description must be a string"],
      });
    });
  });
});
