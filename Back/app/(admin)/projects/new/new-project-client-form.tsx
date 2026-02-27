"use client";

import { createProject } from "@/app/actions/project";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";

export default function NewProjectClientForm({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMsg("");
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCover(file);
      setCoverPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClearCover = () => {
    setSelectedCover(null);
    setCoverPreviewUrl(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    const formElement = e.currentTarget;
    const projectFormData = new FormData(formElement);

    if (!selectedFile) {
      setErrorMsg("Please upload a thumbnail image first.");
      return;
    }

    // Default to the first category if somehow not set
    if (!projectFormData.get("category") && categories.length > 0) {
      projectFormData.set("category", categories[0].name);
    }

    setIsUploading(true);

    try {
      // 1. Upload the thumbnail image directly to local /public/uploads
      const uploadFormData = new FormData();
      uploadFormData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload thumbnail image");
      }

      const uploadData = await uploadResponse.json();
      projectFormData.set("image", uploadData.url);

      // 2. Upload cover image if selected
      if (selectedCover) {
        const coverUploadFormData = new FormData();
        coverUploadFormData.append("file", selectedCover);

        const coverUploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: coverUploadFormData,
        });

        if (!coverUploadResponse.ok) {
          throw new Error("Failed to upload cover image");
        }

        const coverUploadData = await coverUploadResponse.json();
        projectFormData.set("coverImage", coverUploadData.url);
      }

      // 3. Trigger Server Action to save project to DB
      await createProject(projectFormData);

      // 4. Redirect Back Home
      router.push("/projects");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Something went wrong.");
      }
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full font-sans">
      <div className="flex items-center gap-3">
        <Link
          href="/projects"
          className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors shadow-sm"
        >
          <span className="sr-only">Back</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-[28px] font-bold text-zinc-900 dark:text-white tracking-tight">
          Create new project
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-6 items-start"
      >
        {/* Left Column: Form Fields (Takes ~65% width) */}
        <div className="flex-1 w-full flex flex-col gap-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 relative">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100 absolute top-4 left-6 right-6">
              {errorMsg}
            </div>
          )}

          <div className={`flex flex-col gap-5 ${errorMsg ? "mt-12" : ""}`}>
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Project Title
                </label>
                <input
                  name="title"
                  required
                  disabled={isUploading}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] transition shadow-sm disabled:opacity-50"
                  placeholder="e.g. Acme Dashboard Redesign"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Category
                </label>
                <select
                  name="category"
                  required
                  disabled={isUploading || categories.length === 0}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] transition shadow-sm appearance-none disabled:opacity-50"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  {categories.length === 0 && (
                    <option value="" disabled>
                      Go to Categories to add one first
                    </option>
                  )}
                </select>
              </div>
            </div>

            {/* Link & Tags Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Project Link{" "}
                  <span className="text-zinc-400 font-normal">(Optional)</span>
                </label>
                <input
                  name="link"
                  disabled={isUploading}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] transition shadow-sm disabled:opacity-50"
                  placeholder="https://example.com (Optional)"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Tags
                </label>
                <input
                  name="tags"
                  required
                  disabled={isUploading}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] transition shadow-sm disabled:opacity-50"
                  placeholder="React, Next.js, Stripe (comma separated)"
                />
              </div>
            </div>

            {/* Description Area */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Project Description
              </label>
              <textarea
                name="description"
                rows={6}
                required
                disabled={isUploading}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] transition shadow-sm resize-y disabled:opacity-50"
                placeholder="Write a comprehensive description of the project goals, tech stack, and results..."
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isUploading || categories.length === 0}
                className="bg-[#06b6d4] hover:bg-[#0891b2] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#06b6d4] disabled:opacity-70 flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Project...
                  </>
                ) : (
                  "Create Project"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Image Upload Area (Takes ~35% width) */}
        <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6">
          {/* Thumbnail Image */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Project Thumbnail
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                This image will act as the card cover in the primary projects
                grid.
              </p>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all duration-200
                ${
                  previewUrl
                    ? "border-transparent bg-zinc-50 dark:bg-zinc-950 p-2"
                    : "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer min-h-[160px]"
                }
              `}
              onClick={() => !previewUrl && fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
              />

              {previewUrl ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-black">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 pt-12 flex justify-between items-end">
                    <span className="text-xs text-white font-medium truncate max-w-[200px] shadow-sm">
                      {selectedFile?.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearImage();
                      }}
                      disabled={isUploading}
                      className="bg-white/20 hover:bg-white/40 backdrop-blur border border-white/30 text-white rounded p-1.5 transition disabled:opacity-50"
                      title="Clear image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-white dark:bg-zinc-700 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-600 flex items-center justify-center mb-3">
                    <UploadCloud className="text-[#06b6d4]" size={20} />
                  </div>
                  <span className="text-sm font-medium text-[#06b6d4]">
                    Upload Thumbnail
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                Project Cover Image{" "}
                <span className="text-xs font-normal text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                A massive hero image shown at the top of the project detail
                page.
              </p>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all duration-200
                ${
                  coverPreviewUrl
                    ? "border-transparent bg-zinc-50 dark:bg-zinc-950 p-2"
                    : "border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer min-h-[160px]"
                }
              `}
              onClick={() => !coverPreviewUrl && coverInputRef.current?.click()}
            >
              <input
                type="file"
                ref={coverInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleCoverSelect}
                disabled={isUploading}
              />

              {coverPreviewUrl ? (
                <div className="relative w-full aspect-21/9 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-black">
                  <Image
                    src={coverPreviewUrl}
                    alt="Cover Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 pt-12 flex justify-between items-end">
                    <span className="text-xs text-white font-medium truncate max-w-[200px] shadow-sm">
                      {selectedCover?.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearCover();
                      }}
                      disabled={isUploading}
                      className="bg-white/20 hover:bg-white/40 backdrop-blur border border-white/30 text-white rounded p-1.5 transition disabled:opacity-50"
                      title="Clear cover image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-white dark:bg-zinc-700 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-600 flex items-center justify-center mb-3">
                    <UploadCloud className="text-[#06b6d4]" size={20} />
                  </div>
                  <span className="text-sm font-medium text-[#06b6d4]">
                    Upload Hero Cover
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
