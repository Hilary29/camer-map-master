import { ChevronDown } from 'lucide-react'
import type { VotingCenterResult } from '../types/voting'

export function VotingResults() {
  return (
    <div className="min-h-screen bg-[url('/font.png')] bg-cover bg-center py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white/80 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-medium text-center mb-8">
            Resultats du centre de vote
          </h2>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-xl font-medium">Nom du Centre de Vote</label>
              <div className="bg-[#D3D3D3] rounded-md p-3 flex items-center">
                <input 
                  type="text" 
                  className="bg-transparent w-full outline-none"
                  placeholder="Sélectionner le centre"
                />
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xl font-medium">Identifiant du bureau</label>
              <div className="bg-[#D3D3D3] rounded-md p-3">
                <input 
                  type="text" 
                  className="bg-transparent w-full outline-none"
                  placeholder="Entrer l'identifiant"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xl font-medium">Type d&apos;Elections</label>
              <div className="bg-[#D3D3D3] rounded-md p-3 flex items-center">
                <input 
                  type="text" 
                  className="bg-transparent w-full outline-none"
                  placeholder="Sélectionner le type"
                />
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-16">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${
                  num === 1 ? 'bg-[#FF938E]' : 'bg-[#E1271D]/90'
                } shadow`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

