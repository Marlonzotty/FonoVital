// src/components/CadastroModal.tsx
import { useState } from 'react';

const CadastroModal = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mostrarModal, setMostrarModal] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode armazenar os dados ou enviar para o backend.
    console.log('Nome:', nome);
    console.log('Telefone:', telefone);
    
    // Após o envio, fechar o modal
    setMostrarModal(false);
  };

  return (
    <>
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-xl shadow-xl w-full sm:w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-3 right-3 text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-center mb-4 text-[#4A90E2]">
              Cadastro
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="nome">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="telefone">
                  Telefone
                </label>
                <input
                  type="text"
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#4A90E2] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#3A7BB8] transition"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CadastroModal;
