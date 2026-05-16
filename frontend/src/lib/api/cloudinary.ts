import { CLOUDINARY } from "@/lib/constants/api";
import { LIMITS } from "@/lib/constants";

interface CloudinaryUploadResult {
  success: boolean;
  url?: string;
  fileName?: string;
  error?: string;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  if (!CLOUDINARY.CLOUD_NAME || !CLOUDINARY.UPLOAD_PRESET) {
    return { success: false, error: "Cloudinary not configured" };
  }

  if (file.size > LIMITS.MAX_FILE_SIZE_MB * 1024 * 1024) {
    return { success: false, error: `File exceeds ${LIMITS.MAX_FILE_SIZE_MB}MB limit` };
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  if (!(LIMITS.ALLOWED_FILE_FORMATS as readonly string[]).includes(extension)) {
    return { success: false, error: `Format not allowed. Use: ${LIMITS.ALLOWED_FILE_FORMATS.join(", ")}` };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY.UPLOAD_PRESET);
  formData.append("folder", CLOUDINARY.FOLDER);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/auto/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) {
      return { success: false, error: "Upload failed. Please try again." };
    }

    const data = await res.json();
    return { success: true, url: data.secure_url, fileName: file.name };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
