import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Plus, X } from 'lucide-react';
import { useIssueStore, Issue } from '../store/issueStore';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.5);
  const [isAddingIssue, setIsAddingIssue] = useState(false);
  const { issues, addIssue, selectedIssue, selectIssue } = useIssueStore();

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingIssue) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    addIssue({
      x,
      y,
      title: 'New Issue',
      description: '',
      status: 'open',
      images: [],
    });
    setIsAddingIssue(false);
  };

  return (
    <div className="relative bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button
            onClick={() => setScale(scale + 0.2)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Zoom In
          </button>
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.2))}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Zoom Out
          </button>
        </div>
        <button
          onClick={() => setIsAddingIssue(!isAddingIssue)}
          className={`px-3 py-1 rounded flex items-center gap-2 ${
            isAddingIssue ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {isAddingIssue ? (
            <>
              <X size={16} /> Cancel
            </>
          ) : (
            <>
              <Plus size={16} /> Add Issue
            </>
          )}
        </button>
      </div>

      <div className="relative" onClick={handleClick}>
        <Document file={url} onLoadSuccess={handleDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>

        {issues.map((issue) => (
          <button
            key={issue.id}
            onClick={(e) => {
              e.stopPropagation();
              selectIssue(issue);
            }}
            className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 flex items-center justify-center ${
              issue.status === 'open'
                ? 'bg-red-500 border-red-700'
                : issue.status === 'in-progress'
                ? 'bg-yellow-500 border-yellow-700'
                : 'bg-green-500 border-green-700'
            }`}
            style={{
              left: `${issue.x}%`,
              top: `${issue.y}%`,
            }}
          >
            <span className="text-white text-xs font-bold">
              {issues.indexOf(issue) + 1}
            </span>
          </button>
        ))}
      </div>

      {numPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {pageNumber} of {numPages}
          </span>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}