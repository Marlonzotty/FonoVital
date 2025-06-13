import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const perguntas = [
  'Você sente dificuldade para entender conversas em locais com ruído?',
  'Com que frequência você pede para repetirem o que disseram?',
  'Sente que as pessoas “murmuram” ou falam baixo?',
  'Tem dificuldade para ouvir ao telefone?',
  'Já aumentou o volume da TV e outras pessoas reclamaram?',
  'Sente zumbidos nos ouvidos?',
  'Sente que está evitando conversas por dificuldade auditiva?'
]

const frequencias = [250, 500, 1000, 2000, 4000, 8000]

export default function TesteAuditivo() {
  const [respostas, setRespostas] = useState<number[]>(Array(perguntas.length).fill(0))
  const [mostrarTeste, setMostrarTeste] = useState(false)
  const [mostrarResultado, setMostrarResultado] = useState(false)

  const [mostrarFrequencia, setMostrarFrequencia] = useState(false)
  const [freqIndex, setFreqIndex] = useState(0)
  const [respostasFreq, setRespostasFreq] = useState<boolean[]>([])

  const total = respostas.reduce((acc, curr) => acc + curr, 0)
  const resultado =
    total <= 2
      ? 'Audição dentro da normalidade'
      : total <= 5
      ? 'Atenção! Pode haver perda leve'
      : 'Recomendado buscar avaliação mais aprofundada'

  const tocarSom = () => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const o = context.createOscillator()
    o.type = 'sine'
    o.frequency.value = frequencias[freqIndex]
    o.connect(context.destination)
    o.start()
    o.stop(context.currentTime + 1)
  }

  const avancarFreq = (ouviu: boolean) => {
    setRespostasFreq([...respostasFreq, ouviu])
    if (freqIndex < frequencias.length - 1) {
      setFreqIndex(freqIndex + 1)
    } else {
      setMostrarFrequencia(false)
      alert(`Você ouviu ${respostasFreq.filter(Boolean).length + (ouviu ? 1 : 0)} de ${frequencias.length} sons.`)
      setFreqIndex(0)
      setRespostasFreq([])
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-[#A8E6CF]/30 relative pb-20">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-32 px-4">
        <h1 className="text-4xl font-bold text-[#213547] mb-4 text-center">
          🎧 Teste Auditivo Rápido
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Descubra se está na hora de procurar um especialista com um teste simples e interativo.
        </p>

        {/* Botões para os dois testes */}
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div className="border border-[#4A90E2] p-6 rounded-xl bg-white/50">
            <p className="mb-4 font-medium text-[#4A90E2]">Autoavaliação com Perguntas</p>
            <button
              onClick={() => setMostrarTeste(true)}
              className="bg-[#4A90E2] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Iniciar Teste
            </button>
          </div>
          <div className="border border-[#4A90E2] p-6 rounded-xl bg-white/50">
            <p className="mb-4 font-medium text-[#4A90E2]">Teste de Frequência com Áudio</p>
            <button
              onClick={() => {
                setMostrarFrequencia(true)
                setFreqIndex(0)
                setRespostasFreq([])
              }}
              className="bg-[#A8E6CF] text-[#4A90E2] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Iniciar Audiometria
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-[#4A90E2] underline hover:text-[#213547] transition"
          >
            Voltar ao início
          </Link>
        </div>
      </div>

      {/* Modal Autoavaliação */}
      {mostrarTeste && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setMostrarTeste(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#4A90E2] mb-4 text-center">
              Responda às perguntas
            </h2>
            <form className="space-y-4">
              {perguntas.map((pergunta, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-gray-700">{pergunta}</p>
                  <select
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    value={respostas[i]}
                    onChange={(e) => {
                      const novas = [...respostas]
                      novas[i] = parseInt(e.target.value)
                      setRespostas(novas)
                    }}
                  >
                    <option value={0}>Nunca</option>
                    <option value={1}>Às vezes</option>
                    <option value={2}>Frequentemente</option>
                    <option value={3}>Sempre</option>
                  </select>
                </div>
              ))}
            </form>
            <button
              onClick={() => {
                setMostrarTeste(false)
                setMostrarResultado(true)
              }}
              className="mt-6 w-full bg-[#A8E6CF] text-[#4A90E2] py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Ver Resultado
            </button>
          </div>
        </div>
      )}

      {/* Modal Resultado Autoavaliação */}
      {mostrarResultado && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setMostrarResultado(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#213547] mb-4">
              Resultado do Teste
            </h2>
            <p className="text-[#4A90E2] text-lg mb-6">{resultado}</p>
            <button
              className="w-full bg-[#4A90E2] text-white py-2 rounded-full font-semibold hover:opacity-90 transition"
              onClick={() => setMostrarResultado(false)}
            >
              Fechar
            </button>
            <div className="mt-4">
              <Link
                to="/tipos-de-aparelhos"
                className="text-sm text-[#4A90E2] underline hover:text-[#213547]"
              >
                Deseja saber quais aparelhos podem ajudar no seu caso?
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Teste de Frequência */}
      {mostrarFrequencia && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setMostrarFrequencia(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#4A90E2] mb-4">
              Teste de Frequência
            </h2>
            <p className="text-gray-600 mb-4">
              Frequência atual: <strong>{frequencias[freqIndex]}Hz</strong>
            </p>
            <button
              onClick={tocarSom}
              className="bg-[#4A90E2] text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition mb-4"
            >
              ▶ Tocar Som
            </button>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => avancarFreq(true)}
                className="bg-[#A8E6CF] text-[#4A90E2] px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
              >
                Ouvi
              </button>
              <button
                onClick={() => avancarFreq(false)}
                className="bg-red-100 text-red-500 px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
              >
                Não ouvi
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
