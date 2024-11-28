import { Category } from "../category.entity";

describe("Category Unit Test", () => {
  describe("constructor", () => {
    test("should create a category with deafult values", () => {
      const category = new Category({
        name: "Romance",
      });
      expect(category.category_id).toBeUndefined();
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
      expect(category.category_id).toBeUndefined();
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
      expect(category.category_id).toBeUndefined();
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
      expect(category.category_id).toBeUndefined();
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
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe("Serie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should creat a category with command", () => {
      const category = Category.create({
        name: "Serie",
      });
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe("Serie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test("should change name", () => {
      const category = Category.create({
        name: "Serie",
      });
      category.changeName("Terror");
      expect(category.name).toBe("Terror");
    });

    test("shoudl change description", () => {
      const category = Category.create({
        name: "Serie",
        description: "Terror Description",
      });
      category.changeDescription("Serie description");
      expect(category.description).toBe("Serie description");
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
});
