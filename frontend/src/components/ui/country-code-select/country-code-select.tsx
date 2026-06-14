"use client";

import { useState, useRef, useEffect } from "react";
import { COUNTRY_CODES, CountryCode } from "@/lib/constants/country-codes";

interface CountryCodeSelectProps {
  value: string;
  onChange: (dial: string) => void;
  disabled?: boolean;
}

export default function CountryCodeSelect({ value, onChange, disabled }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRY_CODES.find((c) => c.dial === value);

  const filtered = search
    ? COUNTRY_CODES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search) ||
          c.code.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRY_CODES;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (country: CountryCode) => {
    onChange(country.dial);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div ref={containerRef} className="relative w-[120px] shrink-0">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full flex items-center gap-1 bg-transparent border-b border-outline-variant py-2 focus:border-secondary transition-colors font-body text-body-md outline-none disabled:opacity-50 text-left"
        aria-label="Select country code"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-bold text-on-surface-variant">{selected?.code}</span>
        <span className="text-sm">{selected?.dial}</span>
        <span className="ml-auto text-xs text-on-surface-variant">▾</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-[calc(100vw-3rem)] sm:w-[260px] max-h-[280px] bg-surface border border-outline-variant rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-outline-variant/30">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-surface-container-low rounded px-3 py-1.5 font-body text-body-sm outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
          <ul className="overflow-y-auto max-h-[220px]" role="listbox">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-on-surface-variant font-body text-body-sm">
                No results found
              </li>
            )}
            {filtered.map((country) => (
              <li
                key={`${country.code}-${country.dial}`}
                role="option"
                aria-selected={country.dial === value}
                onClick={() => handleSelect(country)}
                className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-surface-container-low transition-colors font-body text-body-sm ${
                  country.dial === value ? "bg-surface-container" : ""
                }`}
              >
                <span className="text-xs font-bold text-on-surface-variant w-6">{country.code}</span>
                <span className="flex-1 truncate">{country.name}</span>
                <span className="text-on-surface-variant text-xs">{country.dial}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
