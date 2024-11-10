import React from 'react';
import PDFViewer from './PDFViewer';
import IssuePanel from './IssuePanel';
import PDFUploader from './PDFUploader';
import PDFSheetList from './PDFSheetList';
import { usePDFStore } from '../store/pdfStore';

export default function MainContent() {
  const { currentSheet } = usePDFStore();

  return (
    <div className="ml-64 mt-16 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Site Plans</h1>
            <PDFUploader />
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 border-r pr-6">
              <h2 className="text-lg font-semibold mb-4">PDF Sheets</h2>
              <PDFSheetList />
            </div>
            
            <div className="col-span-3">
              {currentSheet ? (
                <PDFViewer url={currentSheet.url} />
              ) : (
                <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">
                    Select a PDF sheet or upload a new one
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <IssuePanel />
    </div>
  );
}