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
  // Estado para Autoavaliação
  const [respostas, setRespostas] = useState<number[]>(Array(perguntas.length).fill(0))
  const [mostrarTeste, setMostrarTeste] = useState(false)
  const [mostrarResultado, setMostrarResultado] = useState(false)

  // Estado para Frequência
  const [iniciarFrequencia, setIniciarFrequencia] = useState(false)
  const [freqIndex, setFreqIndex] = useState(0)
  const [respostasFreq, setRespostasFreq] = useState<boolean[]>([])
  const [mostrarResultadoFreq, setMostrarResultadoFreq] = useState(false)

  // Resultado Autoavaliação
  const total = respostas.reduce((acc, curr) => acc + curr, 0)
  const resultado =
    total <= 2
      ? 'Audição dentro da normalidade'
      : total <= 5
      ? 'Atenção! Pode haver perda leve'
      : 'Recomendado buscar avaliação mais aprofundada'

  // Som Frequência
  const tocarSom = () => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.value = frequencias[freqIndex]
    gainNode.gain.value = 0.1

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    oscillator.start()
    oscillator.stop(context.currentTime + 1)
  }

  const avancarFreq = (ouviu: boolean) => {
    const novas = [...respostasFreq, ouviu]
    setRespostasFreq(novas)
    if (freqIndex < frequencias.length - 1) {
      setFreqIndex(freqIndex + 1)
    } else {
      setIniciarFrequencia(false)
      setMostrarResultadoFreq(true)
      setFreqIndex(0)
    }
  }

  const reiniciarFreq = () => {
    setRespostasFreq([])
    setFreqIndex(0)
    setMostrarResultadoFreq(false)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-[#A8E6CF]/30 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-32 px-4">
        <h1 className="text-4xl font-bold text-[#213547] mb-4 text-center">
          🎧 Teste Auditivo Online
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Utilize fones de ouvido e esteja em um ambiente silencioso.
        </p>

        {/* Botões dos dois testes */}
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div className="border border-[#4A90E2] p-6 rounded-xl bg-white/50">
            <p className="mb-4 font-medium text-[#4A90E2]">Teste de Autoavaliação</p>
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
                setIniciarFrequencia(true)
                setRespostasFreq([])
                setFreqIndex(0)
              }}
              className="bg-[#A8E6CF] text-[#4A90E2] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Iniciar Audiometria
            </button>
          </div>
        </div>

        {/* Link voltar */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-[#4A90E2] underline hover:text-[#213547] transition"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>

      {/* Modal Perguntas */}
      {mostrarTeste && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
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
                Ver quais aparelhos podem te ajudar
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Frequência */}
      {iniciarFrequencia && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIniciarFrequencia(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#4A90E2] mb-4">
              Frequência {frequencias[freqIndex]}Hz
            </h2>
            <p className="text-gray-600 mb-4">
              Clique abaixo para ouvir e marque se ouviu ou não.
            </p>
            <button
              onClick={tocarSom}
              className="bg-[#4A90E2] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition mb-4"
            >
              ▶️ Ouvir Som
            </button>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => avancarFreq(true)}
                className="bg-[#A8E6CF] text-[#4A90E2] px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
              >
                Ouvi
              </button>
              <button
                onClick={() => avancarFreq(false)}
                className="bg-red-100 text-red-600 px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
              >
                Não Ouvi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Resultado Frequência */}
      {mostrarResultadoFreq && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setMostrarResultadoFreq(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#213547] mb-4">
              Resultado do Teste de Frequência
            </h2>
            <p className="text-lg text-[#4A90E2] mb-4">
              Você ouviu {respostasFreq.filter(Boolean).length} de {frequencias.length} frequências.
            </p>

            <div className="mb-6">
              {frequencias.map((freq, i) => (
                <p key={i}>
                  {freq}Hz –{' '}
                  {respostasFreq[i] ? (
                    <span className="text-green-600 font-semibold">Ouvi</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Não ouvi</span>
                  )}
                </p>
              ))}
            </div>

            <button
              onClick={reiniciarFreq}
              className="bg-[#4A90E2] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Refazer Teste
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
