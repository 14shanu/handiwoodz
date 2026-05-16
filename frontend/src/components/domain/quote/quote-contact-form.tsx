"use client";

import { useState } from "react";
import { quoteFormSchema, QuoteFormData } from "@/lib/schemas";
import { quoteBasketContent } from "@/lib/content";

interface QuoteContactFormProps {
  onValidChange: (data: QuoteFormData | null) => void;
  disabled?: boolean;
}

type FormErrors = Partial<Record<keyof QuoteFormData, string>>;

export default function QuoteContactForm({ onValidChange, disabled }: QuoteContactFormProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    customerName: "",
    email: "",
    whatsapp: "",
    country: "",
    companyName: "",
    generalNotes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteFormData, boolean>>>({});

  const validateField = (field: keyof QuoteFormData, value: string) => {
    const partial = { ...formData, [field]: value };
    const result = quoteFormSchema.safeParse(partial);
    if (!result.success) {
      const fieldError = result.error.issues.find((i) => i.path[0] === field);
      return fieldError?.message || "";
    }
    return "";
  };

  const handleChange = (field: keyof QuoteFormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
    const result = quoteFormSchema.safeParse(updated);
    onValidChange(result.success ? result.data : null);
  };

  const handleBlur = (field: keyof QuoteFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field] || "");
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = quoteFormSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof QuoteFormData;
        if (!newErrors[field]) {
          newErrors[field] = issue.message;
        }
      });
      setErrors(newErrors);
      setTouched({
        customerName: true,
        email: true,
        whatsapp: true,
        country: true,
        companyName: true,
        generalNotes: true,
      });
      onValidChange(null);
      return;
    }
    onValidChange(result.data);
  };

  const content = quoteBasketContent.form;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" noValidate>
      <FormField
        label={`${content.fullName}${content.required}`}
        value={formData.customerName}
        error={errors.customerName}
        onChange={(v) => handleChange("customerName", v)}
        onBlur={() => handleBlur("customerName")}
        type="text"
        required
        disabled={disabled}
      />
      <FormField
        label={`${content.email}${content.required}`}
        value={formData.email}
        error={errors.email}
        onChange={(v) => handleChange("email", v)}
        onBlur={() => handleBlur("email")}
        type="email"
        required
        disabled={disabled}
      />
      <FormField
        label={`${content.whatsapp}${content.required}`}
        value={formData.whatsapp}
        error={errors.whatsapp}
        onChange={(v) => handleChange("whatsapp", v)}
        onBlur={() => handleBlur("whatsapp")}
        type="tel"
        required
        disabled={disabled}
      />
      <FormField
        label={content.country}
        value={formData.country || ""}
        error={errors.country}
        onChange={(v) => handleChange("country", v)}
        onBlur={() => handleBlur("country")}
        type="text"
        disabled={disabled}
      />
      <div className="md:col-span-2">
        <FormField
          label={content.companyName}
          value={formData.companyName || ""}
          error={errors.companyName}
          onChange={(v) => handleChange("companyName", v)}
          onBlur={() => handleBlur("companyName")}
          type="text"
          placeholder={content.companyPlaceholder}
          disabled={disabled}
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="additional-notes" className="block font-body text-label-md text-on-surface-variant mb-2">
          {content.notes}
        </label>
        <textarea
          id="additional-notes"
          value={formData.generalNotes || ""}
          onChange={(e) => handleChange("generalNotes", e.target.value)}
          onBlur={() => handleBlur("generalNotes")}
          rows={4}
          placeholder={content.notesPlaceholder}
          disabled={disabled}
          className="w-full bg-transparent border-b border-outline-variant py-2 focus:border-secondary focus:ring-0 transition-colors font-body text-body-md outline-none resize-none disabled:opacity-50"
        />
        {errors.generalNotes && (
          <p className="text-error font-body text-xs mt-1">{errors.generalNotes}</p>
        )}
      </div>
      <button type="submit" className="hidden" aria-hidden="true" />
    </form>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

function FormField({ label, value, error, onChange, onBlur, type, required, placeholder, disabled }: FormFieldProps) {
  const id = label.toLowerCase().replace(/[^a-z]/g, "-");
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-body text-label-md text-on-surface-variant">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-transparent border-b py-2 focus:ring-0 transition-colors font-body text-body-md outline-none disabled:opacity-50 ${
          error ? "border-error" : "border-outline-variant focus:border-secondary"
        }`}
      />
      {error && <p className="text-error font-body text-xs mt-1">{error}</p>}
    </div>
  );
}
