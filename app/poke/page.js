import React from 'react';
import PokemonTable from '../../components/PokemonTable';

export default function PokePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center drop-shadow">Pokémon Data Explorer</h1>
        <PokemonTable />
      </div>
    </div>
  );
}
