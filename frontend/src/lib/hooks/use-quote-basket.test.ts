import { renderHook, act } from "@testing-library/react";
import { useQuoteBasket } from "./use-quote-basket";
import { QuoteBasketItem, CustomDesignItem } from "@/lib/types";

const mockCatalogItem: QuoteBasketItem = {
  productId: 1,
  productName: "Mandala Block",
  productImage: "/img.jpg",
  selectedSize: "4x4 inch",
  quantity: 10,
  notes: "",
};

const mockCustomDesign: CustomDesignItem = {
  fileUrl: "https://cloudinary.com/file.png",
  fileName: "logo.png",
  designName: "My Logo",
  productType: "printing_block",
  width: 4,
  height: 4,
  unit: "inch",
  colorCount: "single",
  quantity: 5,
  notes: "",
};

beforeEach(() => {
  localStorage.clear();
});

describe("useQuoteBasket", () => {
  it("starts with empty basket", () => {
    const { result } = renderHook(() => useQuoteBasket());
    expect(result.current.basket.catalogItems).toHaveLength(0);
    expect(result.current.basket.customDesigns).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("adds a catalog item", () => {
    const { result } = renderHook(() => useQuoteBasket());
    act(() => {
      result.current.addCatalogItem(mockCatalogItem);
    });
    expect(result.current.basket.catalogItems).toHaveLength(1);
    expect(result.current.basket.catalogItems[0].productName).toBe("Mandala Block");
    expect(result.current.totalItems).toBe(1);
  });

  it("merges quantity when adding same product+size", () => {
    const { result } = renderHook(() => useQuoteBasket());
    act(() => {
      result.current.addCatalogItem(mockCatalogItem);
      result.current.addCatalogItem(mockCatalogItem);
    });
    expect(result.current.basket.catalogItems).toHaveLength(1);
    expect(result.current.basket.catalogItems[0].quantity).toBe(20);
  });

  it("adds separate items for different sizes", () => {
    const { result } = renderHook(() => useQuoteBasket());
    act(() => {
      result.current.addCatalogItem(mockCatalogItem);
      result.current.addCatalogItem({ ...mockCatalogItem, selectedSize: "6x6 inch" });
    });
    expect(result.current.basket.catalogItems).toHaveLength(2);
  });

  it("removes a catalog item", () => {
    const { result } = renderHook(() => useQuoteBasket());
    act(() => {
      result.current.addCatalogItem(mockCatalogItem);
    });
    act(() => {
      result.current.removeCatalogItem(1, "4x4 inch");
    });
    expect(result.current.basket.catalogItems).toHaveLength(0);
  });

  it("updates catalog item quantity", () => {
    const { result } = renderHook(() => useQuoteBasket());
    act(() => {
      result.current.addCatalogItem(mockCatalogItem);
    });
    act(() => {
      result.current.updateCatalogItemQuantity(1, "4x4 inch", 25);
    });
    expect(result.current.basket.catalogItems[0].quantity).toBe(25);
  });

  it("adds a custom design", () => {
    const { result } = renderHook(() => useQuoteBasket());
    act(() => {
      result.current.addCustomDesign(mockCustomDesign);
    });
    expect(result.current.basket.customDesigns).toHaveLength(1);
    expect(result.current.basket.customDesigns[0].designName).toBe("My Logo");
    expect(result.current.totalItems).toBe(1);
  });

  it("removes a custom design", () => {
    const { result } = renderHook(() => useQuoteBasket());
    act(() => {
      result.current.addCustomDesign(mockCustomDesign);
    });
    act(() => {
      result.current.removeCustomDesign("https://cloudinary.com/file.png");
    });
    expect(result.current.basket.customDesigns).toHaveLength(0);
  });

  it("clears the entire basket", () => {
    const { result } = renderHook(() => useQuoteBasket());
    act(() => {
      result.current.addCatalogItem(mockCatalogItem);
      result.current.addCustomDesign(mockCustomDesign);
    });
    act(() => {
      result.current.clearBasket();
    });
    expect(result.current.totalItems).toBe(0);
  });

  it("persists to localStorage", () => {
    const { result } = renderHook(() => useQuoteBasket());
    act(() => {
      result.current.addCatalogItem(mockCatalogItem);
    });
    const stored = JSON.parse(localStorage.getItem("handiwoodz-quote-basket") || "{}");
    expect(stored.catalogItems).toHaveLength(1);
  });

  it("loads from localStorage on mount", () => {
    localStorage.setItem(
      "handiwoodz-quote-basket",
      JSON.stringify({ catalogItems: [mockCatalogItem], customDesigns: [] })
    );
    const { result } = renderHook(() => useQuoteBasket());
    expect(result.current.basket.catalogItems).toHaveLength(1);
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("handiwoodz-quote-basket", "invalid-json{{{");
    const { result } = renderHook(() => useQuoteBasket());
    expect(result.current.basket.catalogItems).toHaveLength(0);
    expect(result.current.basket.customDesigns).toHaveLength(0);
  });
});
