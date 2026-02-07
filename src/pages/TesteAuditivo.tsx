import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

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

  // Produtos recomendados
  const produtos = [
    {
      nome: 'Aparelho Auditivo Fonovital Pro+',
      descricao: 'Aparelho auditivo com excelente qualidade sonora e discreto.',
      preco: 'R$ 3.490,00',
      link: '/tipos-de-aparelhos',
      imagem: '/assets/produto.jpeg'
    },
    {
      nome: 'Aparelho Auditivo Fonovital Mini',
      descricao: 'Modelo compacto e eficiente, ideal para uso diário.',
      preco: 'R$ 2.790,00',
      link: '/tipos-de-aparelhos',
      imagem: '/assets/produto.jpeg'
    }
  ]

  // Novo estado para o alerta/modal do produto
  const [mostrarProdutoModal, setMostrarProdutoModal] = useState(false)

  // Função para mostrar o modal do produto
  const mostrarModalProduto = () => {
    setMostrarProdutoModal(true)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-[#A8E6CF]/30 pb-20">
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
                mostrarModalProduto() // Exibe o modal do produto após o teste
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
              onClick={() => {
                setMostrarResultado(false)
                mostrarModalProduto() // Exibe o modal do produto após o teste
              }}
              className="w-full bg-[#4A90E2] text-white py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Ver Aparelhos com Desconto
            </button>

            <div className="mt-4">
              <Link
                to="/tipos-de-aparelhos"
                className="text-sm bg-[#A8E6CF] text-[#4A90E2] px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
              >
                Escolher Meu Aparelho
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

      {/* Modal Produto */}
      {mostrarProdutoModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setMostrarProdutoModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#213547] mb-4">
              Aproveite a Oferta Especial!
            </h2>
            <img
              src={produtos[0].imagem} // Imagem do produto
              alt={produtos[0].nome}
              className="mx-auto mb-4 w-32 h-32 object-cover"
            />
            <h3 className="text-lg font-semibold text-[#213547]">{produtos[0].nome}</h3>
            <p className="text-gray-600 mb-4">{produtos[0].descricao}</p>
            <p className="text-xl font-bold text-[#4A90E2] mb-4">{produtos[0].preco}</p>

            <button
              onClick={() => {
                setMostrarProdutoModal(false)
                window.location.href = produtos[0].link // Redireciona para o link de compra
              }}
              className="w-full bg-[#4A90E2] text-white py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Compre Agora
            </button>
          </div>
        </div>
      )}
    </section>
  )
}


