"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "handiwoodz-recently-viewed";
const MAX_ITEMS = 8;

interface RecentProduct {
  id: number;
  name: string;
  slug: string;
  image: string;
  subcategorySlug: string;
  categorySlug: string;
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setItems(stored ? JSON.parse(stored) : []);
    } catch {
      setItems([]);
    }
    setIsLoaded(true);
  }, []);

  const addProduct = useCallback((product: RecentProduct) => {
    setItems((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { items, isLoaded, addProduct };
}
