"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { customDesignContent } from "@/lib/content";
import { sharedContent } from "@/lib/content";
import { PRODUCT_TYPES, COLOR_COUNT_OPTIONS, UNIT_OPTIONS } from "@/lib/constants/config";
import { useQuoteBasket } from "@/lib/hooks/use-quote-basket";
import { uploadToCloudinary } from "@/lib/api/cloudinary";
import { CustomDesignItem } from "@/lib/types";

interface DesignEntry {
  id: string;
  fileName: string;
  fileUrl: string;
  designName: string;
  productType: string;
  width: string;
  height: string;
  unit: "inch" | "cm";
  colorCount: string;
  quantity: number;
  notes: string;
}

function createEmptyEntry(fileName: string): DesignEntry {
  return {
    id: crypto.randomUUID(),
    fileName,
    fileUrl: "",
    designName: "",
    productType: PRODUCT_TYPES[0].value,
    width: "",
    height: "",
    unit: "inch",
    colorCount: COLOR_COUNT_OPTIONS[0].value,
    quantity: 1,
    notes: "",
  };
}

export default function CustomDesignPage() {
  const [designs, setDesigns] = useState<DesignEntry[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addCustomDesign } = useQuoteBasket();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    for (const file of Array.from(files)) {
      const result = await uploadToCloudinary(file);
      if (result.success && result.url) {
        const entry = createEmptyEntry(result.fileName || file.name);
        entry.fileUrl = result.url;
        setDesigns((prev) => [...prev, entry]);
      } else {
        toast.error(result.error || sharedContent.states.uploadFailed);
      }
    }
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const updateDesign = (id: string, field: keyof DesignEntry, value: string | number) => {
    setDesigns((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const removeDesign = (id: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
  };

  const handleAddToBasket = () => {
    designs.forEach((design) => {
      const item: CustomDesignItem = {
        fileUrl: design.fileUrl || `placeholder-${design.id}`,
        fileName: design.fileName,
        designName: design.designName,
        productType: design.productType,
        width: parseFloat(design.width) || 0,
        height: parseFloat(design.height) || 0,
        unit: design.unit,
        colorCount: design.colorCount,
        quantity: design.quantity,
        notes: design.notes,
      };
      addCustomDesign(item);
    });
    toast.success(`${designs.length} design(s) added to quote basket`);
    setDesigns([]);
  };

  return (
    <main className="pt-12 pb-24 px-margin-mobile">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="font-display text-headline-lg text-primary mb-4">
            {customDesignContent.heading}
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant italic max-w-2xl mx-auto">
            {customDesignContent.subtitle}
          </p>
        </section>

        {/* Upload Zone */}
        <div className="mb-12">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf,.ai,.svg"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low hover:bg-surface-container hover:border-secondary transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <span className="text-4xl text-outline mb-4 group-hover:scale-110 group-hover:text-secondary transition-transform">
                {isUploading ? "⏳" : "☁️"}
              </span>
              <p className="font-display text-headline-sm text-on-surface mb-2">
                {isUploading ? sharedContent.states.uploading : customDesignContent.upload.dropText}
              </p>
              <p className="font-body text-label-md text-on-surface-variant">
                {customDesignContent.upload.formats} ({customDesignContent.upload.maxSize})
              </p>
            </div>
          </label>
        </div>

        {/* Design Cards */}
        {designs.map((design) => (
          <section
            key={design.id}
            className="bg-surface-container-lowest rounded-xl shadow-sm p-8 mb-8 border border-outline-variant/30"
          >
            <div className="flex justify-between items-start mb-6">
              <p className="font-body text-label-md text-on-surface-variant">
                {design.fileName}
              </p>
              <button
                onClick={() => removeDesign(design.id)}
                className="text-error font-body text-label-md hover:underline"
                aria-label={`Remove ${design.fileName}`}
              >
                {customDesignContent.designCard.remove}
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-body text-label-md text-on-surface-variant uppercase mb-2">
                  {customDesignContent.designCard.designName}
                </label>
                <input
                  type="text"
                  value={design.designName}
                  onChange={(e) => updateDesign(design.id, "designName", e.target.value)}
                  className="w-full bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 font-body text-body-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-label-md text-on-surface-variant uppercase mb-2">
                    {customDesignContent.designCard.productType}
                  </label>
                  <select
                    value={design.productType}
                    onChange={(e) => updateDesign(design.id, "productType", e.target.value)}
                    className="w-full bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 font-body text-body-md"
                  >
                    {PRODUCT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-label-md text-on-surface-variant uppercase mb-2">
                    {customDesignContent.designCard.dimensions}
                  </label>
                  <div className="flex gap-2 items-end">
                    <input
                      type="number"
                      placeholder="W"
                      value={design.width}
                      onChange={(e) => updateDesign(design.id, "width", e.target.value)}
                      className="w-1/3 bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 py-2 px-0 font-body text-body-md"
                    />
                    <span className="text-on-surface-variant">×</span>
                    <input
                      type="number"
                      placeholder="H"
                      value={design.height}
                      onChange={(e) => updateDesign(design.id, "height", e.target.value)}
                      className="w-1/3 bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 py-2 px-0 font-body text-body-md"
                    />
                    <select
                      value={design.unit}
                      onChange={(e) => updateDesign(design.id, "unit", e.target.value)}
                      className="bg-surface-container px-2 py-1 rounded font-body text-label-md"
                    >
                      {UNIT_OPTIONS.map((u) => (
                        <option key={u.value} value={u.value}>{u.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-label-md text-on-surface-variant uppercase mb-2">
                    {customDesignContent.designCard.colorCount}
                  </label>
                  <select
                    value={design.colorCount}
                    onChange={(e) => updateDesign(design.id, "colorCount", e.target.value)}
                    className="w-full bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 font-body text-body-md"
                  >
                    {COLOR_COUNT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-label-md text-on-surface-variant uppercase mb-2">
                    {customDesignContent.designCard.quantity}
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateDesign(design.id, "quantity", Math.max(1, design.quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-full hover:bg-secondary hover:text-on-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="font-body text-body-md">{design.quantity}</span>
                    <button
                      onClick={() => updateDesign(design.id, "quantity", design.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded-full hover:bg-secondary hover:text-on-primary transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-body text-label-md text-on-surface-variant uppercase mb-2">
                  {customDesignContent.designCard.notes}
                </label>
                <textarea
                  value={design.notes}
                  onChange={(e) => updateDesign(design.id, "notes", e.target.value)}
                  placeholder={customDesignContent.designCard.notesPlaceholder}
                  rows={3}
                  className="w-full bg-surface-bright border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors py-2 px-0 font-body text-body-md resize-none"
                />
              </div>
            </div>
          </section>
        ))}

        {/* Actions */}
        {designs.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
            <button
              onClick={handleAddToBasket}
              className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary rounded-lg font-body text-label-md uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              {customDesignContent.actions.addToBasket}
            </button>
            <button className="w-full md:w-auto px-10 py-4 border-2 border-secondary text-secondary rounded-lg font-body text-label-md uppercase tracking-widest hover:bg-secondary hover:text-on-primary transition-all">
              {customDesignContent.actions.requestQuotation}
            </button>
          </div>
        )}

        {designs.length > 0 && (
          <p className="text-center mt-6 text-on-surface-variant font-body text-body-md opacity-70">
            {customDesignContent.actions.responseTime}
          </p>
        )}
      </div>
    </main>
  );
}
