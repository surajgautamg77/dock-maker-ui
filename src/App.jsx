// import { useState } from "react";
// import {
//   Upload,
//   FileText,
//   Download,
//   Loader2,
//   CheckCircle,
//   AlertCircle,
//   Plus,
//   Minus,
// } from "lucide-react";

// function App() {
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [docUrl, setDocUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const [error, setError] = useState("");
//   const [pdfZoom, setPdfZoom] = useState(100);
//   const [docxZoom, setDocxZoom] = useState(100);

//   // Handle PDF upload
//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setError("");
//     setFileName(file.name);

//     // Show PDF in preview
//     setPdfUrl(URL.createObjectURL(file));

//     // Send to API
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:8001/convert/", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Upload failed");
//       const data = await res.json();

//       // Backend returns docx blob url
//       setDocUrl(data.blob_url);
//     } catch (err) {
//       console.error("API failed, using default response:", err);
//       setError("API connection failed, using demo file");

//       // Default fallback response
//       setDocUrl(
//         "https://transcribedblobstorage.blob.core.windows.net/ai-rep-platform/tmpnx6f3btw.docx"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       const event = { target: { files } };
//       handleUpload(event);
//     }
//   };

//   const handlePdfZoom = (type) => {
//     if (type === "in" && pdfZoom < 200) {
//       setPdfZoom(pdfZoom + 25);
//     } else if (type === "out" && pdfZoom > 50) {
//       setPdfZoom(pdfZoom - 25);
//     }
//   };

//   const handleDocxZoom = (type) => {
//     if (type === "in" && docxZoom < 200) {
//       setDocxZoom(docxZoom + 25);
//     } else if (type === "out" && docxZoom > 50) {
//       setDocxZoom(docxZoom - 25);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {/* Header */}
//       <div className="bg-white/70 backdrop-blur-sm border-b border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="text-center">
//             <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//               PDF to DOCX Converter
//             </h1>
//             <p className="text-slate-600 text-lg">
//               Convert and compare your documents seamlessly
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Upload Section */}
//         <div className="mb-8">
//           <div
//             className="relative border-2 border-dashed border-blue-300 rounded p-8 sm:p-12 text-center bg-white/50 backdrop-blur-sm hover:border-blue-400 hover:bg-white/60 transition-all duration-300"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//           >
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleUpload}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />

//             <div className="flex flex-col items-center space-y-4">
//               <div className="p-4 rounded-full bg-blue-100 text-blue-600">
//                 <Upload size={32} />
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-slate-800 mb-2">
//                   Drop your PDF here or click to browse
//                 </h3>
//                 <p className="text-slate-500">
//                   Support for PDF files up to 10MB
//                 </p>
//               </div>

//               {fileName && (
//                 <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded">
//                   <FileText size={16} className="text-blue-600" />
//                   <span className="text-blue-800 font-medium">{fileName}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Status Messages */}
//           {loading && (
//             <div className="mt-4 flex items-center justify-center space-x-3 text-blue-600">
//               <Loader2 className="animate-spin" size={20} />
//               <span className="font-medium">Converting your PDF...</span>
//             </div>
//           )}

//           {error && (
//             <div className="mt-4 flex items-center justify-center space-x-3 text-amber-600 bg-amber-50 rounded p-3">
//               <AlertCircle size={20} />
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {docUrl && !loading && (
//             <div className="mt-4 flex items-center justify-center space-x-3 text-green-600 bg-green-50 rounded p-3">
//               <CheckCircle size={20} />
//               <span className="font-medium">
//                 Conversion completed successfully!
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Preview Section */}
//         {(pdfUrl || docUrl) && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[85vh]">
//             {/* PDF Preview */}
//             {pdfUrl && (
//               <div className="bg-white/70 backdrop-blur-sm rounded shadow-xl border border-white/20 overflow-hidden flex flex-col h-full">
//                 <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 flex-shrink-0">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <FileText size={24} />
//                       <h2 className="text-lg font-semibold">Original PDF</h2>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       {/* Zoom Controls */}
//                       <div className="flex items-center space-x-1 bg-white/20 rounded px-2 py-1">
//                         <button
//                           onClick={() => handlePdfZoom("out")}
//                           className="p-1 hover:bg-white/20 rounded transition-colors"
//                           disabled={pdfZoom <= 50}
//                         >
//                           <Minus size={14} />
//                         </button>
//                         <span className="text-xs px-2">{pdfZoom}%</span>
//                         <button
//                           onClick={() => handlePdfZoom("in")}
//                           className="p-1 hover:bg-white/20 rounded transition-colors"
//                           disabled={pdfZoom >= 200}
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>
//                       <a
//                         href={pdfUrl}
//                         download="uploaded.pdf"
//                         className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition-colors"
//                       >
//                         <Download size={16} />
//                         <span className="hidden sm:inline">Download</span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex-grow bg-gray-50 relative">
//                   <iframe
//                     src={pdfUrl}
//                     title="PDF Preview"
//                     className="absolute inset-0 w-full h-full border-0"
//                     style={{
//                       transform: `scale(${pdfZoom / 100})`,
//                       transformOrigin: "top left",
//                     }}
//                   ></iframe>
//                 </div>
//               </div>
//             )}

//             {/* DOCX Preview */}
//             {docUrl && (
//               <div className="bg-white/70 backdrop-blur-sm rounded shadow-xl border border-white/20 overflow-hidden flex flex-col h-full">
//                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex-shrink-0">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <FileText size={24} />
//                       <h2 className="text-lg font-semibold">Converted DOCX</h2>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       {/* Zoom Controls */}
//                       <div className="flex items-center space-x-1 bg-white/20 rounded px-2 py-1">
//                         <button
//                           onClick={() => handleDocxZoom("out")}
//                           className="p-1 hover:bg-white/20 rounded transition-colors"
//                           disabled={docxZoom <= 50}
//                         >
//                           <Minus size={14} />
//                         </button>
//                         <span className="text-xs px-2">{docxZoom}%</span>
//                         <button
//                           onClick={() => handleDocxZoom("in")}
//                           className="p-1 hover:bg-white/20 rounded transition-colors"
//                           disabled={docxZoom >= 200}
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>
//                       <a
//                         href={docUrl}
//                         download="converted.docx"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition-colors"
//                       >
//                         <Download size={16} />
//                         <span className="hidden sm:inline">Download</span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex-grow bg-gray-50 relative">
//                   <iframe
//                     src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
//                       docUrl
//                     )}`}
//                     title="DOCX Preview"
//                     className="absolute inset-0 w-full h-full border-0"
//                     style={{
//                       transform: `scale(${docxZoom / 100})`,
//                       transformOrigin: "top left",
//                     }}
//                   ></iframe>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Features Section */}
//         {!pdfUrl && !docUrl && (
//           <div className="mt-16">
//             <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">
//               Why Choose Our Converter?
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FileText className="text-blue-600" size={24} />
//                 </div>
//                 <h3 className="font-semibold text-slate-800 mb-2">
//                   High Quality
//                 </h3>
//                 <p className="text-slate-600 text-sm">
//                   Preserve formatting and layout during conversion
//                 </p>
//               </div>
//               <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <CheckCircle className="text-green-600" size={24} />
//                 </div>
//                 <h3 className="font-semibold text-slate-800 mb-2">
//                   Fast Processing
//                 </h3>
//                 <p className="text-slate-600 text-sm">
//                   Quick conversion with real-time preview
//                 </p>
//               </div>
//               <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
//                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Upload className="text-purple-600" size={24} />
//                 </div>
//                 <h3 className="font-semibold text-slate-800 mb-2">
//                   Easy to Use
//                 </h3>
//                 <p className="text-slate-600 text-sm">
//                   Simple drag & drop interface
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <footer className="mt-16 py-8 text-center text-slate-500 text-sm border-t border-white/20">
//         <p>
//           © 2025 PDF to DOCX Converter. Made with ❤️ for seamless document
//           conversion.
//         </p>
//       </footer>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import {
  Upload,
  FileText,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [docUrl, setDocUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [pdfZoom, setPdfZoom] = useState(100);
  const [docxZoom, setDocxZoom] = useState(100);

  // Handle PDF upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setFileName(file.name);

    // Show PDF in preview
    setPdfUrl(URL.createObjectURL(file));

    // Send to API
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("https://dock-maker-api.onrender.com/convert/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      // Backend returns docx blob url
      setDocUrl(data.blob_url);
    } catch (err) {
      console.error("API failed, using default response:", err);
      setError("API connection failed, using demo file");

      // Default fallback response
      // setDocUrl(
      //   "https://transcribedblobstorage.blob.core.windows.net/ai-rep-platform/tmpnx6f3btw.docx"
      // );
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const event = { target: { files } };
      handleUpload(event);
    }
  };

  const handlePdfZoom = (type) => {
    if (type === "in" && pdfZoom < 200) {
      setPdfZoom(pdfZoom + 25);
    } else if (type === "out" && pdfZoom > 50) {
      setPdfZoom(pdfZoom - 25);
    }
  };

  const handleDocxZoom = (type) => {
    if (type === "in" && docxZoom < 200) {
      setDocxZoom(docxZoom + 25);
    } else if (type === "out" && docxZoom > 50) {
      setDocxZoom(docxZoom - 25);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-800">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex items-center justify-evenly">
              <img
                src="https://image2url.com/images/1758429820215-640de727-bcdc-44fd-ab31-26f170c21e3e.png"
                alt="Logo"
                className="w-20 h-20 object-contain mr-4" // logo size + spacing
              />
              <div className="text-left">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                  PDF to DOCX Converter
                </h1>
                <p className="text-slate-600 text-lg">
                  Convert and compare your documents seamlessly
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Upload Section */}
          <div className="mb-8">
            <div
              className="relative border-2 border-dashed border-blue-100 rounded p-8 sm:p-12 text-center bg-white backdrop-blur-sm hover:border-blue-400 hover:bg-blue-400 transition-all duration-300"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={handleUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-blue-50 text-blue-600">
                  <Upload size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Click here to browse and upload PDF
                  </h3>
                  <p className="text-slate-500">
                    Support for PDF files up to 10MB
                  </p>
                </div>

                {fileName && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded">
                    <FileText size={16} className="text-blue-600" />
                    <span className="text-blue-800 font-medium">
                      {fileName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Status Messages */}
            {loading && (
              <div className="mt-4 flex items-center justify-center space-x-3 text-blue-600">
                <Loader2 className="animate-spin" size={20} />
                <span className="font-medium">Converting your PDF...</span>
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-center justify-center space-x-3 text-amber-600 bg-amber-50 rounded p-3">
                <AlertCircle size={20} />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {docUrl && !loading && (
              <div className="mt-4 flex items-center justify-center space-x-3 text-green-600 bg-green-50 rounded p-3">
                <CheckCircle size={20} />
                <span className="font-medium">
                  Conversion completed successfully!
                </span>
              </div>
            )}
          </div>

          {/* Preview Section */}
          {(pdfUrl || docUrl) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[85vh]">
              {/* PDF Preview */}
              {pdfUrl && (
                <div className="bg-white/70 backdrop-blur-sm rounded shadow-xl border border-white/20 overflow-hidden flex flex-col h-full">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} />
                        <h2 className="text-base sm:text-lg font-semibold">
                          Original PDF
                        </h2>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Zoom Controls for PDF */}
                        <div className="flex items-center bg-white/15 rounded overflow-hidden">
                          <button
                            onClick={() => handlePdfZoom("out")}
                            className="p-2 hover:bg-white/20 transition-colors flex items-center justify-center"
                            disabled={pdfZoom <= 50}
                            title="Zoom Out"
                          >
                            <Minus
                              size={16}
                              className={pdfZoom <= 50 ? "opacity-50" : ""}
                            />
                          </button>
                          <div className="px-3 py-2 bg-white/10 text-xs font-medium min-w-[50px] text-center">
                            {pdfZoom}%
                          </div>
                          <button
                            onClick={() => handlePdfZoom("in")}
                            className="p-2 hover:bg-white/20 transition-colors flex items-center justify-center"
                            disabled={pdfZoom >= 200}
                            title="Zoom In"
                          >
                            <Plus
                              size={16}
                              className={pdfZoom >= 200 ? "opacity-50" : ""}
                            />
                          </button>
                        </div>
                        <a
                          href={pdfUrl}
                          download="uploaded.pdf"
                          className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded transition-colors"
                          title="Download PDF"
                        >
                          <Download size={16} />
                          <span className="hidden sm:inline text-sm">
                            Download
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow bg-gray-50 relative overflow-hidden">
                    <div
                      className="absolute inset-0 origin-top-left transition-transform duration-200"
                      style={{
                        transform: `scale(${pdfZoom / 100})`,
                        width: `${100 / (pdfZoom / 100)}%`,
                        height: `${100 / (pdfZoom / 100)}%`,
                      }}
                    >
                      <iframe
                        src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                        title="PDF Preview"
                        className="w-full h-full border-0"
                      ></iframe>
                    </div>
                  </div>
                </div>
              )}

              {/* DOCX Preview */}
              {docUrl && (
                <div className="bg-white/70 backdrop-blur-sm rounded shadow-xl border border-white/20 overflow-hidden flex flex-col h-full">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} />
                        <h2 className="text-base sm:text-lg font-semibold">
                          Converted DOCX
                        </h2>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={docUrl}
                          download="converted.docx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded transition-colors"
                          title="Download DOCX"
                        >
                          <Download size={16} />
                          <span className="hidden sm:inline text-sm">
                            Download
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow bg-gray-50 relative">
                    <iframe
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                        docUrl
                      )}`}
                      title="DOCX Preview"
                      className="absolute inset-0 w-full h-full border-0"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features Section */}
          {!pdfUrl && !docUrl && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">
                Why Choose Our Converter?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    High Quality
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Preserve formatting and layout during conversion
                  </p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Fast Processing
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Quick conversion with real-time preview
                  </p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="text-purple-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Easy to Use
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Simple drag & drop interface
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 text-slate-500 flex items-center justify-center text-center text-sm border-t border-white/20">
          <p>Powered by -</p>

          <img
            src="https://image2url.com/images/1758430544964-7346c455-06f7-45d1-be91-f79d53cb09dd.png"
            alt="Logo"
            className="w-20 h-20 object-contain mr-4" // logo size + spacing
          />
        </footer>
      </div>
    </>
  );
}

export default App;
