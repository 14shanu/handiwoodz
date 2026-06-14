"use client";

import { useState, useEffect, useCallback } from "react";
import { QuoteBasket, QuoteBasketItem, CustomDesignItem } from "@/lib/types";

const STORAGE_KEY = "handiwoodz-quote-basket";
const BASKET_CHANGE_EVENT = "handiwoodz-basket-change";

const EMPTY_BASKET: QuoteBasket = {
  catalogItems: [],
  customDesigns: [],
};

function loadBasket(): QuoteBasket {
  if (typeof window === "undefined") return EMPTY_BASKET;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : EMPTY_BASKET;
  } catch {
    return EMPTY_BASKET;
  }
}

function saveBasket(basket: QuoteBasket): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(basket));
  window.dispatchEvent(new CustomEvent(BASKET_CHANGE_EVENT));
}

export function useQuoteBasket() {
  const [basket, setBasket] = useState<QuoteBasket>(EMPTY_BASKET);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setBasket(loadBasket());
    setIsLoaded(true);

    const handleBasketChange = () => {
      setBasket(loadBasket());
    };

    window.addEventListener(BASKET_CHANGE_EVENT, handleBasketChange);
    window.addEventListener("storage", handleBasketChange);

    return () => {
      window.removeEventListener(BASKET_CHANGE_EVENT, handleBasketChange);
      window.removeEventListener("storage", handleBasketChange);
    };
  }, []);

  const persist = useCallback((updated: QuoteBasket) => {
    setBasket(updated);
    saveBasket(updated);
  }, []);

  const addCatalogItem = useCallback((item: QuoteBasketItem) => {
    setBasket((prev) => {
      const existing = prev.catalogItems.find(
        (i) => i.productId === item.productId && i.selectedSize === item.selectedSize
      );
      let updated: QuoteBasket;
      if (existing) {
        updated = {
          ...prev,
          catalogItems: prev.catalogItems.map((i) =>
            i.productId === item.productId && i.selectedSize === item.selectedSize
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      } else {
        updated = { ...prev, catalogItems: [...prev.catalogItems, item] };
      }
      saveBasket(updated);
      return updated;
    });
  }, []);

  const removeCatalogItem = useCallback((productId: number, selectedSize: string) => {
    setBasket((prev) => {
      const updated = {
        ...prev,
        catalogItems: prev.catalogItems.filter(
          (i) => !(i.productId === productId && i.selectedSize === selectedSize)
        ),
      };
      saveBasket(updated);
      return updated;
    });
  }, []);

  const removeCatalogItemById = useCallback((productId: number) => {
    setBasket((prev) => {
      const updated = {
        ...prev,
        catalogItems: prev.catalogItems.filter((i) => i.productId !== productId),
      };
      saveBasket(updated);
      return updated;
    });
  }, []);

  const updateCatalogItemQuantity = useCallback(
    (productId: number, selectedSize: string, quantity: number) => {
      setBasket((prev) => {
        const updated = {
          ...prev,
          catalogItems: prev.catalogItems.map((i) =>
            i.productId === productId && i.selectedSize === selectedSize
              ? { ...i, quantity }
              : i
          ),
        };
        saveBasket(updated);
        return updated;
      });
    },
    []
  );

  const addCustomDesign = useCallback((item: CustomDesignItem) => {
    setBasket((prev) => {
      const updated = { ...prev, customDesigns: [...prev.customDesigns, item] };
      saveBasket(updated);
      return updated;
    });
  }, []);

  const removeCustomDesign = useCallback((fileUrl: string) => {
    setBasket((prev) => {
      const updated = {
        ...prev,
        customDesigns: prev.customDesigns.filter((i) => i.fileUrl !== fileUrl),
      };
      saveBasket(updated);
      return updated;
    });
  }, []);

  const clearBasket = useCallback(() => {
    persist(EMPTY_BASKET);
  }, [persist]);

  const totalItems = basket.catalogItems.length + basket.customDesigns.length;

  return {
    basket,
    isLoaded,
    totalItems,
    addCatalogItem,
    removeCatalogItem,
    removeCatalogItemById,
    updateCatalogItemQuantity,
    addCustomDesign,
    removeCustomDesign,
    clearBasket,
  };
}
