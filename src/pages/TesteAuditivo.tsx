import { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { trackGoogleAdsConversion } from '../analytics/googleAds'

type ModalEtapa = 'cadastro' | 'quiz' | 'frequencia' | 'resultado' | null

type RespostaQuiz = string | string[]
type RespostasQuiz = Record<string, RespostaQuiz>
type Nivel = 1 | 2 | 3
type Intensidade = 0 | 1 | 2 | 3

type ProdutoPerfil = {
  id: string
  nome: string
  rota: string
  descricao: string
  formato: 'CIC' | 'TWS' | 'BTE'
  disponibilidade: 'disponivel' | 'esgotado'
  nota: number
  discricao: Nivel
  facilidade: Nivel
  potencia: Nivel
  falaRuido: Nivel
  automatico: Nivel
  custoBeneficio: Nivel
  recarregavel: boolean
  app: Intensidade
  bluetooth: Intensidade
  indicadoSenior: Nivel
}

type RecomendacaoProduto = {
  produto: ProdutoPerfil
  motivo: string
}

type DadosSalvos = {
  nome: string
  idade: string
  respostasQuiz: RespostasQuiz
  respostasFreq: boolean[]
}

const STORAGE_KEY = 'fonovital-teste-auditivo'
const WHATSAPP_NUMBER = '5532999069763'

const frequencias = [125, 250, 500, 1000, 2000, 3000, 4000, 8000]
const audioPorFrequencia: Record<number, string> = {
  125: '/audio/teste-auditivo/125hz.wav',
  250: '/audio/teste-auditivo/250hz.wav',
  500: '/audio/teste-auditivo/500hz.wav',
  1000: '/audio/teste-auditivo/1000hz.wav',
  2000: '/audio/teste-auditivo/2000hz.wav',
  3000: '/audio/teste-auditivo/3000hz.wav',
  4000: '/audio/teste-auditivo/4000hz.wav',
  8000: '/audio/teste-auditivo/8000hz.wav'
}

const perguntasQuiz = [
  {
    id: 'dificuldade',
    pergunta: '1. A dificuldade e em:',
    opcoes: ['Um ouvido', 'Dois ouvidos', 'Nao sei dizer']
  },
  {
    id: 'situacao',
    pergunta: '2. Qual situacao mais incomoda?',
    opcoes: ['Conversas', 'Televisao alta', 'Telefone', 'Locais com barulho', 'Zumbido', 'Todas as opcoes']
  },
  {
    id: 'compreensao',
    pergunta: '3. Voce escuta, mas nao entende bem as palavras?',
    opcoes: ['Sim', 'Nao', 'As vezes']
  },
  {
    id: 'audiometria',
    pergunta: '4. Voce ja fez audiometria?',
    opcoes: ['Sim, tenho o exame', 'Sim, mas nao tenho em maos', 'Nunca fiz']
  },
  {
    id: 'grauPerda',
    pergunta: '5. Sabe o grau da perda?',
    opcoes: ['Leve', 'Moderada', 'Severa', 'Profunda', 'Nao sei']
  },
  {
    id: 'usoAnterior',
    pergunta: '6. Ja usou aparelho auditivo?',
    opcoes: ['Nunca usei', 'Ja usei e gostei', 'Ja usei e nao me adaptei', 'Uso atualmente, mas quero trocar']
  },
  {
    id: 'prioridade',
    pergunta: '7. O que e mais importante para voce?',
    opcoes: ['Ser discreto', 'Ser recarregavel', 'Ter Bluetooth/app', 'Ser facil de usar', 'Ter melhor custo-beneficio'],
    multipla: true
  },
  {
    id: 'preferencia',
    pergunta: '8. Voce prefere:',
    opcoes: ['Modelo automatico, sem mexer em aplicativo', 'Modelo com aplicativo para ajustes', 'Nao sei, quero indicacao']
  },
  {
    id: 'destinatario',
    pergunta: '9. A compra seria para:',
    opcoes: ['Mim', 'Meu pai/mae', 'Avo/avo', 'Outro familiar']
  }
]

const produtosPerfis: ProdutoPerfil[] = [
  {
    id: 'voxton',
    nome: 'Voxton Mini CIC',
    rota: '/produto/voxton',
    descricao: 'CIC discreto, simples de usar e com forte apelo de custo-beneficio.',
    formato: 'CIC',
    disponibilidade: 'disponivel',
    nota: 4.3,
    discricao: 3,
    facilidade: 3,
    potencia: 2,
    falaRuido: 2,
    automatico: 3,
    custoBeneficio: 3,
    recarregavel: false,
    app: 0,
    bluetooth: 0,
    indicadoSenior: 3
  },
  {
    id: 'voxcharge',
    nome: 'Voxcharge Mini CIC Recarregavel',
    rota: '/produto/voxcharge',
    descricao: 'CIC recarregavel com boa potencia, mas atualmente esgotado.',
    formato: 'CIC',
    disponibilidade: 'esgotado',
    nota: 4.4,
    discricao: 3,
    facilidade: 2,
    potencia: 3,
    falaRuido: 2,
    automatico: 2,
    custoBeneficio: 2,
    recarregavel: true,
    app: 0,
    bluetooth: 0,
    indicadoSenior: 2
  },
  {
    id: 'voicepro',
    nome: 'VoicePro Profissional Digital',
    rota: '/produto/voicepro',
    descricao: 'CIC com foco em clareza de fala, ruido e perdas de leve a severa.',
    formato: 'CIC',
    disponibilidade: 'disponivel',
    nota: 4.5,
    discricao: 3,
    facilidade: 2,
    potencia: 3,
    falaRuido: 3,
    automatico: 3,
    custoBeneficio: 2,
    recarregavel: true,
    app: 0,
    bluetooth: 0,
    indicadoSenior: 3
  },
  {
    id: 'softvoice',
    nome: 'SoftVoice Recarregavel 16 Canais',
    rota: '/produto/softvoice',
    descricao: 'CIC ultradiscreto com 16 canais, modos de ambiente e foco em fala cristalina.',
    formato: 'CIC',
    disponibilidade: 'disponivel',
    nota: 4.4,
    discricao: 3,
    facilidade: 2,
    potencia: 3,
    falaRuido: 3,
    automatico: 2,
    custoBeneficio: 1,
    recarregavel: true,
    app: 0,
    bluetooth: 0,
    indicadoSenior: 2
  },
  {
    id: 'iavoice',
    nome: 'IAvoice Inteligencia Auditiva',
    rota: '/produto/iavoice',
    descricao: 'Modelo inteligente com ajustes automaticos, boa potencia e suporte para rotina variada.',
    formato: 'BTE',
    disponibilidade: 'disponivel',
    nota: 4.6,
    discricao: 2,
    facilidade: 2,
    potencia: 3,
    falaRuido: 3,
    automatico: 3,
    custoBeneficio: 2,
    recarregavel: true,
    app: 2,
    bluetooth: 0,
    indicadoSenior: 3
  },
  {
    id: 'smartvoice',
    nome: 'SmartVoice Bluetooth Inteligente',
    rota: '/produto/smartvoice',
    descricao: 'TWS com Bluetooth 5.2, app dedicado e boa experiencia para celular e chamadas.',
    formato: 'TWS',
    disponibilidade: 'disponivel',
    nota: 4.5,
    discricao: 2,
    facilidade: 2,
    potencia: 2,
    falaRuido: 2,
    automatico: 2,
    custoBeneficio: 2,
    recarregavel: true,
    app: 3,
    bluetooth: 3,
    indicadoSenior: 2
  },
  {
    id: 'vitalair',
    nome: 'Vital Air Bluetooth Inteligente',
    rota: '/produto/vitalair',
    descricao: 'TWS com Bluetooth, app completo e 32 canais para quem quer controle via celular.',
    formato: 'TWS',
    disponibilidade: 'disponivel',
    nota: 4.8,
    discricao: 2,
    facilidade: 2,
    potencia: 2,
    falaRuido: 3,
    automatico: 2,
    custoBeneficio: 2,
    recarregavel: true,
    app: 3,
    bluetooth: 3,
    indicadoSenior: 3
  }
]

const isRespostaPreenchida = (resposta?: RespostaQuiz) => {
  if (Array.isArray(resposta)) {
    return resposta.length > 0
  }

  return Boolean(resposta)
}

const getRespostaTexto = (resposta?: RespostaQuiz) => {
  if (Array.isArray(resposta)) {
    return resposta.length > 0 ? resposta.join(', ') : 'Nao respondido'
  }

  return resposta || 'Nao respondido'
}

const getOpcoesSelecionadas = (resposta?: RespostaQuiz) => {
  if (Array.isArray(resposta)) {
    return resposta
  }

  return resposta ? [resposta] : []
}

const getPrimeiraPerguntaPendente = (respostasQuiz: RespostasQuiz) => {
  const index = perguntasQuiz.findIndex(({ id }) => !isRespostaPreenchida(respostasQuiz[id]))
  return index === -1 ? perguntasQuiz.length : index
}

const getWhatsappLink = (mensagem: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`

const getRecomendacaoProduto = ({
  respostasQuiz,
  respostasFreq,
  idade
}: {
  respostasQuiz: RespostasQuiz
  respostasFreq: boolean[]
  idade: string
}): RecomendacaoProduto => {
  const prioridades = getOpcoesSelecionadas(respostasQuiz.prioridade)
  const idadeNumero = Number(idade)
  const situacao = typeof respostasQuiz.situacao === 'string' ? respostasQuiz.situacao : ''
  const compreensao = typeof respostasQuiz.compreensao === 'string' ? respostasQuiz.compreensao : ''
  const audiometria = typeof respostasQuiz.audiometria === 'string' ? respostasQuiz.audiometria : ''
  const grauPerda = typeof respostasQuiz.grauPerda === 'string' ? respostasQuiz.grauPerda : ''
  const usoAnterior = typeof respostasQuiz.usoAnterior === 'string' ? respostasQuiz.usoAnterior : ''
  const preferencia = typeof respostasQuiz.preferencia === 'string' ? respostasQuiz.preferencia : ''
  const destinatario = typeof respostasQuiz.destinatario === 'string' ? respostasQuiz.destinatario : ''

  const falaImportante = [500, 1000, 2000, 3000, 4000]
  const perdasNaFala = falaImportante.reduce((total, frequencia) => {
    const index = frequencias.indexOf(frequencia)
    return total + (respostasFreq[index] === false ? 1 : 0)
  }, 0)

  const totalOuvidas = respostasFreq.filter(Boolean).length

  const melhor = produtosPerfis
    .map((produto) => {
      let score = 0
      const motivos: string[] = []

      if (produto.disponibilidade === 'esgotado') {
        score -= 100
      }

      if (prioridades.includes('Ser discreto')) {
        score += produto.discricao * 3
        if (produto.discricao >= 3) {
          motivos.push('tem perfil mais discreto no ouvido')
        }
      }

      if (prioridades.includes('Ser recarregavel')) {
        score += produto.recarregavel ? 6 : -4
        if (produto.recarregavel) {
          motivos.push('atende sua busca por recarga pratica no dia a dia')
        }
      }

      if (prioridades.includes('Ter Bluetooth/app')) {
        score += produto.app * 3 + produto.bluetooth * 3
        if (produto.app >= 3 || produto.bluetooth >= 3) {
          motivos.push('entrega conectividade e ajustes pelo celular')
        }
      }

      if (prioridades.includes('Ser facil de usar')) {
        score += produto.facilidade * 3 + produto.automatico * 2
        if (produto.facilidade >= 3 || produto.automatico >= 3) {
          motivos.push('e mais simples de adaptar e usar na rotina')
        }
      }

      if (prioridades.includes('Ter melhor custo-beneficio')) {
        score += produto.custoBeneficio * 4
        if (produto.custoBeneficio >= 3) {
          motivos.push('oferece um equilibrio forte entre recurso e custo-beneficio')
        }
      }

      if (preferencia === 'Modelo automatico, sem mexer em aplicativo') {
        score += produto.automatico * 4 - Math.max(produto.app - 1, 0)
        if (produto.automatico >= 3) {
          motivos.push('faz mais sentido para quem prefere ajustes automaticos')
        }
      }

      if (preferencia === 'Modelo com aplicativo para ajustes') {
        score += produto.app * 5 + produto.bluetooth * 3
      }

      if (preferencia === 'Nao sei, quero indicacao') {
        score += produto.facilidade * 2 + produto.automatico * 2
      }

      if (grauPerda === 'Leve') {
        score += produto.potencia >= 2 ? 4 : 2
      }

      if (grauPerda === 'Moderada') {
        score += produto.potencia * 3
      }

      if (grauPerda === 'Severa' || grauPerda === 'Profunda') {
        score += produto.potencia >= 3 ? 10 : -6
        if (produto.potencia >= 3) {
          motivos.push('tem perfil mais aderente para perdas auditivas mais exigentes')
        }
      }

      if (grauPerda === 'Nao sei') {
        score += produto.automatico * 2 + produto.potencia * 2
      }

      if (situacao === 'Conversas') {
        score += produto.falaRuido * 3
      }

      if (situacao === 'Televisao alta') {
        score += produto.falaRuido * 2 + produto.potencia * 2
      }

      if (situacao === 'Telefone') {
        score += produto.bluetooth * 4 + produto.app * 2 + produto.falaRuido
      }

      if (situacao === 'Locais com barulho') {
        score += produto.falaRuido * 4 + produto.automatico * 2
        if (produto.falaRuido >= 3) {
          motivos.push('tem foco maior em clareza de fala e reducao de ruido')
        }
      }

      if (situacao === 'Zumbido') {
        score += produto.falaRuido * 2 + produto.automatico * 2 + produto.app
      }

      if (situacao === 'Todas as opcoes') {
        score += produto.potencia * 2 + produto.falaRuido * 3 + produto.automatico * 2
      }

      if (compreensao === 'Sim') {
        score += produto.falaRuido * 4
      }

      if (compreensao === 'As vezes') {
        score += produto.falaRuido * 2
      }

      if (usoAnterior === 'Nunca usei') {
        score += produto.facilidade * 3 + produto.indicadoSenior
      }

      if (usoAnterior === 'Ja usei e nao me adaptei') {
        score += produto.facilidade * 3 + produto.automatico * 3
      }

      if (usoAnterior === 'Uso atualmente, mas quero trocar') {
        score += produto.potencia * 2 + produto.falaRuido * 2
      }

      if (audiometria === 'Sim, tenho o exame') {
        score += produto.potencia * 2
      }

      if (destinatario === 'Meu pai/mae' || destinatario === 'Avo/avo' || destinatario === 'Outro familiar') {
        score += produto.indicadoSenior * 3 + produto.facilidade * 2 + produto.automatico * 2
      }

      if (Number.isFinite(idadeNumero) && idadeNumero >= 65) {
        score += produto.indicadoSenior * 3 + produto.automatico * 2
      }

      if (Number.isFinite(idadeNumero) && idadeNumero <= 50 && prioridades.includes('Ter Bluetooth/app')) {
        score += produto.app * 2 + produto.bluetooth * 2
      }

      if (respostasFreq.length === frequencias.length) {
        if (perdasNaFala >= 3) {
          score += produto.potencia * 3 + produto.falaRuido * 3
          if (produto.potencia >= 3 || produto.falaRuido >= 3) {
            motivos.push('ajuda mais nas frequencias importantes para entender voz e palavras')
          }
        }

        if (totalOuvidas <= 3) {
          score += produto.potencia * 3
        }

        if (totalOuvidas >= 6 && prioridades.includes('Ter melhor custo-beneficio')) {
          score += produto.custoBeneficio * 2
        }
      }

      return {
        produto,
        score,
        motivos
      }
    })
    .sort((a, b) => b.score - a.score || b.produto.nota - a.produto.nota)[0]

  const motivosUnicos = Array.from(new Set(melhor.motivos)).slice(0, 3)

  return {
    produto: melhor.produto,
    motivo:
      motivosUnicos.join('; ') ||
      'foi o modelo com melhor equilibrio entre perfil auditivo, facilidade de uso e recursos do catalogo.'
  }
}

export default function TesteAuditivo() {
  const [modalEtapa, setModalEtapa] = useState<ModalEtapa>(null)
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [erroCadastro, setErroCadastro] = useState('')
  const [quizIndex, setQuizIndex] = useState(0)
  const [respostasQuiz, setRespostasQuiz] = useState<RespostasQuiz>({})
  const [freqIndex, setFreqIndex] = useState(0)
  const [respostasFreq, setRespostasFreq] = useState<boolean[]>([])
  const [resultadoCountdown, setResultadoCountdown] = useState(5)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const resultadoTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const resultadoIntervalRef = useRef<ReturnType<typeof window.setInterval> | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const dadosSalvos = window.localStorage.getItem(STORAGE_KEY)
    if (!dadosSalvos) {
      return
    }

    try {
      const dados: DadosSalvos = JSON.parse(dadosSalvos)
      setNome(dados.nome || '')
      setIdade(dados.idade || '')
      setRespostasQuiz(dados.respostasQuiz || {})
      setRespostasFreq(Array.isArray(dados.respostasFreq) ? dados.respostasFreq : [])
      setQuizIndex(getPrimeiraPerguntaPendente(dados.respostasQuiz || {}))
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    const dados: DadosSalvos = {
      nome,
      idade,
      respostasQuiz,
      respostasFreq
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dados))
  }, [idade, nome, respostasFreq, respostasQuiz])

  const totalOuvidas = respostasFreq.filter(Boolean).length
  const quizCompleto = getPrimeiraPerguntaPendente(respostasQuiz) === perguntasQuiz.length
  const jornadaCompleta = quizCompleto && respostasFreq.length === frequencias.length
  const perguntaAtual = perguntasQuiz[quizIndex]
  const opcoesSelecionadasAtual = perguntaAtual
    ? getOpcoesSelecionadas(respostasQuiz[perguntaAtual.id])
    : []
  const recomendacaoProduto = getRecomendacaoProduto({
    respostasQuiz,
    respostasFreq,
    idade
  })

  const mensagemAudiometria = [
    'Ola, quero enviar minha audiometria para avaliacao da Fonovital.',
    nome.trim() ? `Nome: ${nome.trim()}` : '',
    idade.trim() ? `Idade: ${idade.trim()}` : ''
  ]
    .filter(Boolean)
    .join('\n')

  const whatsappAudiometriaHref = getWhatsappLink(mensagemAudiometria)

  const mensagemResultado = [
    'Ola, finalizei o teste auditivo online da Fonovital e quero falar com um especialista.',
    '',
    `Nome: ${nome.trim() || 'Nao informado'}`,
    `Idade: ${idade.trim() || 'Nao informada'}`,
    '',
    `Modelo recomendado pelo teste: ${recomendacaoProduto.produto.nome}`,
    `Motivo da indicacao: ${recomendacaoProduto.motivo}`,
    '',
    'Respostas do quiz:',
    ...perguntasQuiz.map(
      ({ id, pergunta }) => `${pergunta.replace(/^\d+\.\s*/, '')} ${getRespostaTexto(respostasQuiz[id])}`
    ),
    '',
    `Teste de frequencia: ouvi ${totalOuvidas} de ${frequencias.length} frequencias.`,
    ...frequencias.map((frequencia, index) =>
      `${frequencia}Hz: ${respostasFreq[index] ? 'Ouvi' : 'Nao ouvi'}`
    )
  ].join('\n')

  const whatsappResultadoHref = getWhatsappLink(mensagemResultado)

  const limparAutoRedirectResultado = () => {
    if (resultadoTimeoutRef.current !== null) {
      window.clearTimeout(resultadoTimeoutRef.current)
      resultadoTimeoutRef.current = null
    }

    if (resultadoIntervalRef.current !== null) {
      window.clearInterval(resultadoIntervalRef.current)
      resultadoIntervalRef.current = null
    }
  }

  useEffect(() => {
    if (modalEtapa !== 'resultado') {
      limparAutoRedirectResultado()
      setResultadoCountdown(5)
      return
    }

    setResultadoCountdown(5)
    limparAutoRedirectResultado()

    resultadoIntervalRef.current = window.setInterval(() => {
      setResultadoCountdown((valorAtual) => {
        if (valorAtual <= 1) {
          return 0
        }

        return valorAtual - 1
      })
    }, 1000)

    resultadoTimeoutRef.current = window.setTimeout(() => {
      limparAutoRedirectResultado()
      window.location.href = whatsappResultadoHref
    }, 5000)

    return limparAutoRedirectResultado
  }, [modalEtapa, whatsappResultadoHref])

  const abrirFluxoTeste = () => {
    trackGoogleAdsConversion('teste_auditivo_inicio')
    if (!nome.trim() || !idade.trim()) {
      setErroCadastro('')
      setModalEtapa('cadastro')
      return
    }

    const proximaPergunta = getPrimeiraPerguntaPendente(respostasQuiz)
    if (proximaPergunta < perguntasQuiz.length) {
      setQuizIndex(proximaPergunta)
      setModalEtapa('quiz')
      return
    }

    if (respostasFreq.length >= frequencias.length) {
      setModalEtapa('resultado')
      return
    }

    setFreqIndex(respostasFreq.length)
    setModalEtapa('frequencia')
  }

  const avancarCadastro = () => {
    const nomeLimpo = nome.trim()
    const idadeLimpa = idade.trim()
    const idadeNumero = Number(idadeLimpa)

    if (!nomeLimpo || !idadeLimpa) {
      setErroCadastro('Preencha nome e idade para continuar.')
      return
    }

    if (!Number.isFinite(idadeNumero) || idadeNumero <= 0 || idadeNumero > 120) {
      setErroCadastro('Informe uma idade valida.')
      return
    }

    setNome(nomeLimpo)
    setIdade(idadeLimpa)
    setErroCadastro('')
    setQuizIndex(getPrimeiraPerguntaPendente(respostasQuiz))
    setModalEtapa('quiz')
  }

  const avancarQuiz = (novasRespostas: RespostasQuiz) => {
    setRespostasQuiz(novasRespostas)

    const proximaPergunta = getPrimeiraPerguntaPendente(novasRespostas)
    if (proximaPergunta < perguntasQuiz.length) {
      setQuizIndex(proximaPergunta)
      return
    }

    setFreqIndex(respostasFreq.length)
    setModalEtapa('frequencia')
  }

  const responderQuiz = (resposta: string) => {
    if (!perguntaAtual) {
      return
    }

    if (perguntaAtual.multipla) {
      const selecionadas = getOpcoesSelecionadas(respostasQuiz[perguntaAtual.id])
      const novasSelecionadas = selecionadas.includes(resposta)
        ? selecionadas.filter((opcao) => opcao !== resposta)
        : [...selecionadas, resposta]

      setRespostasQuiz({
        ...respostasQuiz,
        [perguntaAtual.id]: novasSelecionadas
      })
      return
    }

    const novasRespostas = {
      ...respostasQuiz,
      [perguntaAtual.id]: resposta
    }

    avancarQuiz(novasRespostas)
  }

  const continuarQuizMultiplo = () => {
    if (!perguntaAtual || !perguntaAtual.multipla || opcoesSelecionadasAtual.length === 0) {
      return
    }

    avancarQuiz({
      ...respostasQuiz,
      [perguntaAtual.id]: opcoesSelecionadasAtual
    })
  }

  const voltarQuiz = () => {
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1)
      return
    }

    setModalEtapa('cadastro')
  }

  const tocarSom = async () => {
    const src = audioPorFrequencia[frequencias[freqIndex]]
    if (!src) {
      return
    }

    const audio = audioRef.current ?? new Audio()
    audioRef.current = audio
    audio.src = src
    audio.preload = 'auto'
    audio.loop = false
    audio.volume = 1
    audio.currentTime = 0

    try {
      audio.pause()
      audio.load()
      await audio.play()
    } catch (error) {
      console.error('Falha ao tocar o audio do teste:', error)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current.load()
        audioRef.current = null
      }
    }
  }, [])

  const avancarFrequencia = (ouviu: boolean) => {
    const novasRespostas = [...respostasFreq]
    novasRespostas[freqIndex] = ouviu
    setRespostasFreq(novasRespostas)

    if (freqIndex < frequencias.length - 1) {
      setFreqIndex(freqIndex + 1)
      return
    }

    setModalEtapa('resultado')
    setFreqIndex(0)
  }

  const refazerTeste = () => {
    limparAutoRedirectResultado()
    setRespostasFreq([])
    setFreqIndex(0)
    setModalEtapa('frequencia')
  }

  const limparJornada = () => {
    limparAutoRedirectResultado()
    setModalEtapa(null)
    setNome('')
    setIdade('')
    setErroCadastro('')
    setQuizIndex(0)
    setRespostasQuiz({})
    setFreqIndex(0)
    setRespostasFreq([])
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-[#A8E6CF]/30 pb-20"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-4xl mx-auto pt-32 px-4">
        <h1 className="text-4xl font-bold text-[#213547] mb-4 text-center">
          🎧 Teste Auditivo Online
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Utilize fones de ouvido e esteja em um ambiente silencioso.
        </p>
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left text-[#213547] shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-700">
            Aviso importante
          </p>
          <p className="mt-3 text-sm leading-6 text-[#213547]/85">
            Este teste esta em processo de refino e conta com ate 70% de precisao,
            com base nas perguntas respondidas. Ele{' '}
            <span className="font-extrabold text-red-600">
              nao substitui a avaliacao medica
            </span>{' '}
            nem uma audiometria profissional.
          </p>
          <p className="mt-3 text-sm leading-6 text-[#213547]/85">
            Ele foi criado para quem nao consegue realizar esse tipo de avaliacao por
            questoes de locomoção ou financeiras e precisa de acesso a um teste de
            qualidade e gratuito.
          </p>
          <p className="mt-3 text-sm leading-6 text-[#213547]/85">
            Fonovital LTDA junto a Zotty Software, desenvolvido no Brasil.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div className="border border-[#4A90E2] p-6 rounded-xl bg-white/50">
            <p className="mb-4 font-medium text-[#4A90E2]">Envie sua audiometria</p>
            <a
              href={whatsappAudiometriaHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              <FaWhatsapp className="text-lg" />
              Enviar no WhatsApp
            </a>
          </div>
          <div className="border border-[#4A90E2] p-6 rounded-xl bg-white/50">
            <p className="mb-4 font-medium text-[#4A90E2]">Teste de Frequência por Áudio</p>
            <button
              onClick={abrirFluxoTeste}
              className="bg-[#A8E6CF] text-[#4A90E2] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              {jornadaCompleta ? 'Ver resultado e enviar' : 'Faça seu teste agora'}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={limparJornada}
            className="text-sm text-[#213547]/70 underline hover:text-[#213547] transition"
          >
            Limpar dados salvos deste teste
          </button>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-[#4A90E2] underline hover:text-[#213547] transition"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>

      {modalEtapa === 'cadastro' && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModalEtapa(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#213547] mb-2 text-center">
              Antes de iniciar
            </h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Preencha nome e idade para iniciar o questionario.
            </p>
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
              <p className="text-sm leading-6 text-[#213547]/85">
                Este teste esta em processo de refino, possui ate 70% de precisao com
                base nas perguntas e{' '}
                <span className="font-extrabold text-red-600">
                  nao substitui uma avaliacao medica.
                </span>
              </p>
              <p className="mt-2 text-sm leading-6 text-[#213547]/85">
                Ele existe para ampliar o acesso gratuito a uma triagem auditiva de
                qualidade para pessoas com dificuldade de locomoção ou limitações
                financeiras.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-1">
                  Idade
                </label>
                <input
                  id="idade"
                  type="number"
                  min="1"
                  max="120"
                  value={idade}
                  onChange={(event) => setIdade(event.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Digite sua idade"
                />
              </div>
            </div>

            {erroCadastro && (
              <p className="mt-4 text-sm text-red-600 text-center">{erroCadastro}</p>
            )}

            <button
              onClick={avancarCadastro}
              className="mt-6 w-full bg-[#4A90E2] text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {modalEtapa === 'quiz' && perguntaAtual && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModalEtapa(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-medium text-[#4A90E2]">
                  Pergunta {quizIndex + 1} de {perguntasQuiz.length}
                </p>
                <h2 className="text-xl font-bold text-[#213547] mt-1">
                  {perguntaAtual.pergunta}
                </h2>
                {perguntaAtual.multipla && (
                  <p className="text-sm text-gray-600 mt-2">
                    Voce pode marcar mais de uma opcao.
                  </p>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {nome}, {idade} anos
              </span>
            </div>

            <div className="grid gap-3">
              {perguntaAtual.opcoes.map((opcao) => {
                const selecionada = perguntaAtual.multipla
                  ? opcoesSelecionadasAtual.includes(opcao)
                  : respostasQuiz[perguntaAtual.id] === opcao
                return (
                  <button
                    key={opcao}
                    onClick={() => responderQuiz(opcao)}
                    className={`rounded-xl border px-4 py-3 text-left font-medium transition ${
                      selecionada
                        ? 'border-[#4A90E2] bg-[#4A90E2] text-white'
                        : 'border-[#4A90E2]/30 bg-white text-[#213547] hover:border-[#4A90E2]'
                    }`}
                  >
                    {opcao}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex justify-between gap-3">
              <button
                onClick={voltarQuiz}
                className="px-4 py-2 rounded-full border border-[#4A90E2] text-[#4A90E2] font-semibold hover:bg-[#4A90E2]/10 transition"
              >
                Voltar
              </button>
              <button
                onClick={() => setModalEtapa(null)}
                className="px-4 py-2 rounded-full text-[#213547]/70 font-semibold hover:text-[#213547] transition"
              >
                Fechar
              </button>
            </div>

            {perguntaAtual.multipla && (
              <button
                onClick={continuarQuizMultiplo}
                disabled={opcoesSelecionadasAtual.length === 0}
                className="mt-4 w-full bg-[#4A90E2] text-white py-3 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            )}
          </div>
        </div>
      )}

      {modalEtapa === 'frequencia' && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModalEtapa(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-sm font-medium text-[#4A90E2] mb-2">
              Frequencia {freqIndex + 1} de {frequencias.length}
            </p>
            <h2 className="text-xl font-bold text-[#4A90E2] mb-4">
              {frequencias[freqIndex]}Hz
            </h2>
            <p className="text-gray-600 mb-4">
              Clique abaixo para ouvir tons graves, medios e agudos e marque se ouviu ou nao.
            </p>
            <button
              onClick={tocarSom}
              className="bg-[#4A90E2] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition mb-4"
            >
              Ouvir som
            </button>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => avancarFrequencia(true)}
                className="bg-[#A8E6CF] text-[#4A90E2] px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
              >
                Ouvi
              </button>
              <button
                onClick={() => avancarFrequencia(false)}
                className="bg-red-100 text-red-600 px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
              >
                Nao ouvi
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEtapa === 'resultado' && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModalEtapa(null)}
        >
          <div
            className="max-h-[90vh] overflow-y-auto bg-white rounded-xl p-6 max-w-2xl w-full mx-4 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#213547] mb-4">
              Resultado da jornada
            </h2>
            <p className="text-lg text-[#4A90E2] mb-2">
              {nome}, voce ouviu {totalOuvidas} de {frequencias.length} frequencias.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Suas respostas do quiz e do teste por audio ja estao prontas para envio ao especialista.
            </p>
            <p className="mb-6 rounded-full bg-[#25D366]/10 px-4 py-2 text-sm font-semibold text-[#128C7E]">
              Em {resultadoCountdown}s vamos abrir o WhatsApp automaticamente se voce nao escolher uma acao.
            </p>

            <div className="mb-6 text-left rounded-xl border border-[#4A90E2]/20 bg-[#EAF4FF] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#4A90E2] mb-2">
                Modelo mais indicado
              </p>
              <h3 className="text-xl font-bold text-[#213547] mb-2">
                {recomendacaoProduto.produto.nome}
              </h3>
              <p className="text-sm text-[#213547] mb-2">{recomendacaoProduto.produto.descricao}</p>
              <p className="text-sm text-gray-700 mb-4">
                Motivo: {recomendacaoProduto.motivo}.
              </p>
              <Link
                to={recomendacaoProduto.produto.rota}
                onClick={limparAutoRedirectResultado}
                className="inline-flex rounded-full bg-[#4A90E2] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Ver modelo indicado
              </Link>
            </div>

            <div className="mb-6 text-left bg-[#F7F9F9] rounded-xl p-4">
              <h3 className="text-base font-bold text-[#213547] mb-3">
                Respostas do questionario
              </h3>
              <div className="space-y-2 text-sm text-[#213547]">
                {perguntasQuiz.map(({ id, pergunta }) => (
                  <p key={id}>
                    <span className="font-semibold">{pergunta.replace(/^\d+\.\s*/, '')}</span>{' '}
                    {getRespostaTexto(respostasQuiz[id])}
                  </p>
                ))}
              </div>
            </div>

            <div className="mb-6 text-left bg-[#F7F9F9] rounded-xl p-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-base font-bold text-[#213547]">
                    Teste de Frequencia por Audio
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Resultado atual: ouviu {totalOuvidas} de {frequencias.length} frequencias.
                  </p>
                </div>
                <button
                  onClick={refazerTeste}
                  className="shrink-0 rounded-full border border-[#4A90E2] px-4 py-2 text-sm font-semibold text-[#4A90E2] hover:bg-[#4A90E2]/10 transition"
                >
                  Refazer teste
                </button>
              </div>

              <div className="space-y-2 text-sm text-[#213547]">
                {frequencias.map((frequencia, index) => (
                  <p key={frequencia}>
                    {frequencia}Hz: {respostasFreq[index] ? 'Ouvi' : 'Nao ouvi'}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappResultadoHref}
                target="_blank"
                rel="noreferrer"
                onClick={limparAutoRedirectResultado}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                <FaWhatsapp className="text-lg" />
                Enviar tudo para o especialista
              </a>
              <button onClick={limparJornada} className="text-[#213547]/70 font-semibold hover:text-[#213547] transition">
                Limpar dados e recomecar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
