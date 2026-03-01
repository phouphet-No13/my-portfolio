import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  // Log env vars (mask secret for safety)
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log("Cloudinary config check:", {
    cloud_name: cloudName || "MISSING",
    api_key: apiKey ? `${apiKey.slice(0, 4)}...` : "MISSING",
    api_secret: apiSecret ? "SET" : "MISSING",
  });

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary environment variables are not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "my-portfolio",
              resource_type: "image",
            },
            (error, result) => {
              if (error || !result) {
                console.error("Cloudinary upload error:", error);
                return reject(error);
              }
              resolve(result as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json({ url: result.secure_url, success: true });
  } catch (error) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to upload file: ${message}` },
      { status: 500 }
    );
  }
}
