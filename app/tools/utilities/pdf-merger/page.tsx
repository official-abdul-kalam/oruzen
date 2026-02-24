"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FileDown, FileUp, GripVertical, Plus, Trash2, ShieldCheck, Layers } from "lucide-react";

// --- Sortable Item Component --- //
function SortablePdfItem({ id, file, onRemove }: { id: string, file: File, onRemove: (id: string) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:shadow-md transition-shadow">
            {/* Drag Handle */}
            <div {...attributes} {...listeners} className="cursor-grab text-slate-400 hover:text-blue-500 p-2">
                <GripVertical size={20} />
            </div>

            <div className="w-10 h-10 bg-red-100/50 rounded-lg flex items-center justify-center text-red-500 flex-shrink-0">
                <Layers size={20} />
            </div>

            <div className="flex-grow min-w-0">
                <h4 className="text-sm font-bold text-slate-700 truncate">{file.name}</h4>
                <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            <button
                onClick={() => onRemove(id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                title="Remove PDF"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}


export default function PdfMergerTool() {
    // State
    const [pdfFiles, setPdfFiles] = useState<{ id: string, file: File }[]>([]);
    const [isMerging, setIsMerging] = useState(false);

    // DND Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Dropzone logic
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newPdfs = acceptedFiles.map(file => ({
            id: `pdf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file
        }));
        setPdfFiles(prev => [...prev, ...newPdfs]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] }
    });

    const removePdf = (id: string) => {
        setPdfFiles(prev => prev.filter(pdf => pdf.id !== id));
    };

    // Handle Drag Reordering
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setPdfFiles((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    // Client-side PDF Merging Logic using pdf-lib
    const mergePdfs = async () => {
        if (pdfFiles.length < 2) {
            alert("Please add at least 2 PDFs to merge.");
            return;
        }

        setIsMerging(true);
        try {
            const mergedPdf = await PDFDocument.create();

            for (const item of pdfFiles) {
                const arrayBuffer = await item.file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            // Trigger download
            const link = document.createElement("a");
            link.href = url;
            link.download = `Oruzen_Merged_${new Date().getTime()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error merging PDFs:", error);
            alert("An error occurred while merging the PDFs. Ensure they are valid, non-password protected files.");
        } finally {
            setIsMerging(false);
        }
    };


    return (
        <main className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden text-slate-800">
            <Navbar />

            {/* Ambient Red/Blue Gradient Background */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-400/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

            <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto flex-grow w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-red-500 font-bold tracking-wider text-sm uppercase bg-red-50 px-4 py-1.5 rounded-full border border-red-100 mb-4 inline-flex items-center gap-2">
                        <Layers size={16} /> Utility Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                        Merge PDFs Securely
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Combine multiple PDFs into a single file in seconds. Processing happens entirely in your browser—<span className="font-bold text-slate-700">100% private and secure</span>.
                    </p>
                </div>

                {/* Main Workspace Card */}
                <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl p-8 lg:p-10 mb-8">

                    {/* The Dropzone */}
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-500 bg-blue-50/50" : "border-slate-300 bg-slate-50 hover:bg-slate-100/50 hover:border-blue-400"
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 dropdown-shadow">
                            <FileUp size={30} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                            {isDragActive ? "Drop the PDFs here!" : "Drag & Drop PDFs"}
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">or click to browse from your computer</p>
                        <div className="flex gap-2 text-xs font-semibold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                            <ShieldCheck size={14} className="text-green-500" /> Secure Browser Processing
                        </div>
                    </div>

                    {/* Draggable PDF List */}
                    {pdfFiles.length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                                <span>Selected Files ({pdfFiles.length})</span>
                                <span className="text-xs font-normal text-slate-400 normal-case bg-slate-100 px-2 py-1 rounded-md">Drag to reorder</span>
                            </h3>

                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={pdfFiles.map(p => p.id)} strategy={rectSortingStrategy}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {pdfFiles.map((pdf) => (
                                            <SortablePdfItem key={pdf.id} id={pdf.id} file={pdf.file} onRemove={removePdf} />
                                        ))}

                                        {/* Add More Button inside grid */}
                                        <div
                                            {...getRootProps()}
                                            className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer cursor-copy min-h-[88px]"
                                        >
                                            <Plus size={24} />
                                            <span className="text-xs font-bold mt-1">Add More</span>
                                        </div>
                                    </div>
                                </SortableContext>
                            </DndContext>
                        </div>
                    )}

                </div>

                {/* Merge Action Button */}
                {pdfFiles.length > 1 && (
                    <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button
                            onClick={mergePdfs}
                            disabled={isMerging}
                            className={`px-10 py-4 lg:w-96 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-lg font-bold rounded-full shadow-xl shadow-red-500/25 flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none`}
                        >
                            {isMerging ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Merging PDFs...
                                </>
                            ) : (
                                <>
                                    <FileDown size={22} /> Merge {pdfFiles.length} Files
                                </>
                            )}
                        </button>
                    </div>
                )}

            </section>

            <Footer />
        </main>
    );
}
