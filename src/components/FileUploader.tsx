import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  isDragging,
  setIsDragging,
}) => {
  const gererGlisserAuDessus = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const gererSortieGlisser = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const gererDepot = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const fichiers = e.dataTransfer.files;
    if (fichiers.length > 0 && fichiers[0].type.includes('sheet')) {
      onFileUpload(fichiers[0]);
    }
  };

  const gererSelectionFichier = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fichiers = e.target.files;
    if (fichiers && fichiers.length > 0) {
      onFileUpload(fichiers[0]);
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto rounded-xl ${
        isDragging
          ? 'bg-indigo-50 border-indigo-300'
          : 'bg-white border-gray-200'
      } border-2 border-dashed transition-colors duration-200`}
      onDragOver={gererGlisserAuDessus}
      onDragLeave={gererSortieGlisser}
      onDrop={gererDepot}
    >
      <div className="p-8 text-center">
        <Upload className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
        <h3 className="mb-2 text-xl font-medium text-gray-900">
          Téléverser un fichier Excel
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          Glissez-déposez votre fichier Excel ici, ou cliquez pour sélectionner
        </p>
        <label className="relative">
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls"
            onChange={gererSelectionFichier}
          />
          <span className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors duration-200">
            Sélectionner un fichier
          </span>
        </label>
      </div>
    </div>
  );
};
