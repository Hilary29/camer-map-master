'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, X } from 'lucide-react';
import Image from "next/image";

interface Step3Props {
  onDataComplete: (imageData: string) => void;
  initialData?: string;
}

export default function Step3({ onDataComplete, initialData }: Step3Props) {
  const [preview, setPreview] = useState<string | null>(initialData || null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image/')) {
      setError('Veuillez sélectionner une image valide');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onDataComplete(base64String);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
            Photo du procès-verbal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!preview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="pv-upload"
              />
              <label
                htmlFor="pv-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="h-12 w-12 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Cliquez ou déposez la photo du PV ici
                </span>
                <span className="text-xs text-gray-500">
                  Format: JPG, PNG (max 5MB)
                </span>
              </label>
            </div>
          ) : (
            <div className="relative">
              <Image
                src={preview || "/placeholder.svg"}
                alt="Aperçu du PV"
                width={600}
                height={800}
                className="rounded-lg"
              />
              <button
                onClick={() => {
                  setPreview(null);
                  onDataComplete('');
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}