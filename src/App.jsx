import { useState } from 'react';
import { FileSpreadsheet, Table as TableIcon, X } from 'lucide-react';
import * as XLSX from 'xlsx';
import { FileUploader } from './components/FileUploader';
import { Table } from './components/Table';

interface DonneesExcel {
  enTetes: string[];
  lignes: any[][];
}

function App() {
  const [donneesExcel, setDonneesExcel] = useState<DonneesExcel | null>(null);
  const [estEnCoursDeGlisser, setEstEnCoursDeGlisser] = useState(false);

  const gererTeleversementFichier = (fichier: File) => {
    const lecteur = new FileReader();
    lecteur.onload = (e) => {
      const donnees = new Uint8Array(e.target?.result as ArrayBuffer);
      const classeur = XLSX.read(donnees, { type: 'array' });
      const premiereFeuille = classeur.Sheets[classeur.SheetNames[0]];
      const donneesJson = XLSX.utils.sheet_to_json(premiereFeuille, { header: 1 });

      setDonneesExcel({
        enTetes: donneesJson[0] as string[],
        lignes: donneesJson.slice(1) as any[][]
      });
    };
    lecteur.readAsArrayBuffer(fichier);
  };

  const effacerDonnees = () => {
    setDonneesExcel(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileSpreadsheet className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Visualiseur Excel</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Téléversez votre fichier Excel pour l'afficher dans un tableau élégant
          </p>
        </div>

        {!donneesExcel ? (
          <FileUploader
            onFileUpload={gererTeleversementFichier}
            isDragging={estEnCoursDeGlisser}
            setIsDragging={setEstEnCoursDeGlisser}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <TableIcon className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Aperçu des données Excel
                </h2>
              </div>
              <button
                onClick={effacerDonnees}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Effacer les données"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <Table headers={donneesExcel.enTetes} rows={donneesExcel.lignes} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
