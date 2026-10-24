import React, { useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, X, Plus } from 'lucide-react';

export default function FileDropzone({
  initialFiles = [
    { id: 1, name: "Quotation.pdf", type: "pdf", size: "2.4 MB" },
    { id: 2, name: "Price List.jpg", type: "image", size: "1.8 MB", thumb: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?w=80&auto=format&fit=crop&q=80" },
    { id: 3, name: "Terms.pdf", type: "pdf", size: "0.8 MB" }
  ],
  onFilesChange = null
}) {
  const [files, setFiles] = useState(initialFiles);

  const handleRemove = (id, e) => {
    e.stopPropagation();
    const updated = files.filter(f => f.id !== id);
    setFiles(updated);
    if (onFilesChange) onFilesChange(updated);
  };

  const handleAddMock = () => {
    const newFile = {
      id: Date.now(),
      name: `Document_${files.length + 1}.pdf`,
      type: "pdf",
      size: "1.2 MB"
    };
    const updated = [...files, newFile];
    setFiles(updated);
    if (onFilesChange) onFilesChange(updated);
  };

  return (
    <div className="space-y-3">
      {/* Dashed dropzone */}
      <div 
        onClick={handleAddMock}
        className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/20 rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5"
      >
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <UploadCloud size={20} />
        </div>
        <p className="text-xs font-semibold text-slate-800">
          Drag & drop files here <span className="text-slate-400 font-normal">or</span> <span className="text-blue-600">click to upload</span>
        </p>
        <p className="text-[10px] text-slate-400">
          Supported formats: PDF, JPG, PNG (Max 10 MB each)
        </p>
      </div>

      {/* Uploaded files chips grid */}
      {files.length > 0 && (
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {files.map((file) => (
            <div
              key={file.id}
              className="relative group bg-white border border-slate-200 rounded-lg p-2 flex items-center gap-2 shadow-2xs text-xs pr-7"
            >
              {file.thumb ? (
                <img src={file.thumb} alt={file.name} className="w-8 h-8 rounded object-cover" />
              ) : (
                <div className="w-8 h-8 rounded bg-red-50 text-red-600 flex items-center justify-center font-bold text-[9px]">
                  PDF
                </div>
              )}
              <div className="overflow-hidden">
                <p className="font-semibold text-slate-800 text-[11px] truncate max-w-[90px]">{file.name}</p>
                <p className="text-[10px] text-slate-400">{file.size}</p>
              </div>
              <button
                onClick={(e) => handleRemove(file.id, e)}
                className="absolute top-1 right-1 p-0.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 transition-colors"
                title="Remove file"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          <button
            onClick={handleAddMock}
            className="h-12 px-3 border border-dashed border-slate-300 hover:border-blue-400 rounded-lg text-slate-600 hover:text-blue-600 text-xs font-semibold flex items-center gap-1.5 transition-colors bg-white/60"
          >
            <Plus size={14} />
            <span>Add More</span>
          </button>
        </div>
      )}
    </div>
  );
}
