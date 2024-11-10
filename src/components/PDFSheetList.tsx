import React from 'react';
import { FileText, Trash2 } from 'lucide-react';
import { usePDFStore } from '../store/pdfStore';

export default function PDFSheetList() {
  const { sheets, currentSheet, setCurrentSheet, deleteSheet } = usePDFStore();

  if (sheets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No PDF sheets uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
            currentSheet?.id === sheet.id
              ? 'bg-indigo-50 border border-indigo-200'
              : 'hover:bg-gray-50'
          }`}
          onClick={() => setCurrentSheet(sheet)}
        >
          <div className="flex items-center gap-3">
            <FileText
              className={`h-5 w-5 ${
                currentSheet?.id === sheet.id
                  ? 'text-indigo-600'
                  : 'text-gray-400'
              }`}
            />
            <div>
              <p className="font-medium text-gray-900">{sheet.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(sheet.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteSheet(sheet.id);
            }}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <Trash2 className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  );
}