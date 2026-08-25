import { FileText, LockKeyhole, RefreshCcw, ShieldCheck } from 'lucide-react';

const sections = [
  {
    title: '1. Identificação da empresa',
    paragraphs: [
      'Nome fantasia: Fonovital. CNPJ: 61.894.698/0001-20. E-mail: fonovitaloficial@gmail.com. WhatsApp: (32) 99906-9763. Atendimento presencial: São João del Rei, MG.',
      'Os canais acima podem ser utilizados para atendimento, suporte, trocas, devoluções, garantia e demais solicitações relacionadas à compra.',
    ],
  },
  {
    title: '2. Produtos e adaptação',
    paragraphs: [
      'A Fonovital comercializa dispositivos destinados à amplificação e melhoria da percepção sonora, conforme as características e especificações apresentadas na página de cada produto.',
      'Antes de concluir a compra, confira o modelo, quantidade, funcionalidades, alimentação ou recarga, conectividade, acessórios, modo de utilização, preço, pagamento e prazo estimado de entrega. Recursos como Bluetooth, aplicativo, redução de ruído, canais e case carregador só estarão incluídos quando informados na descrição do modelo.',
      'A experiência com um aparelho auditivo varia de pessoa para pessoa. Nos primeiros dias, alguns sons podem parecer diferentes ou mais intensos; isso pode fazer parte da adaptação e não caracteriza, isoladamente, defeito. Nossa equipe oferece suporte para uso, regulagem e adaptação.',
    ],
  },
  {
    title: '3. Suporte ao cliente',
    paragraphs: [
      'O suporte pós-venda pode incluir orientações de uso, regulagem, carregamento, limpeza, posicionamento, aplicativo, conexão Bluetooth, funcionalidades, mensagens e chamada de vídeo quando necessária e disponível.',
      'O suporte técnico não substitui avaliação médica, fonoaudiológica ou atendimento de profissional de saúde quando estes forem necessários.',
    ],
  },
  {
    title: '4. Direito de arrependimento e devolução',
    paragraphs: [
      'Em compras realizadas fora de estabelecimento comercial físico, o consumidor pode exercer o direito de arrependimento em até 7 (sete) dias corridos contados do recebimento, conforme o artigo 49 do Código de Defesa do Consumidor.',
      'Para solicitar a devolução, comunique a Fonovital por um canal oficial dentro do prazo legal. A solicitação não depende da existência de defeito. O produto deve ser devolvido com os acessórios, cabos, manuais, itens adicionais e, quando disponível, a embalagem original. A ausência isolada da embalagem não elimina automaticamente o direito legal.',
      'O consumidor pode testar razoavelmente o produto para conhecer suas características e funcionamento. Danos físicos, alterações intencionais, violações indevidas ou uso incompatível serão analisados individualmente.',
    ],
  },
  {
    title: '5. Reembolso',
    paragraphs: [
      'Quando o arrependimento for exercido dentro do prazo legal, os valores pagos serão restituídos conforme a legislação. No cartão, será solicitado o estorno à instituição financeira ou intermediadora; o crédito pode depender da administradora e do fechamento da fatura. No Pix, o reembolso seguirá procedimento compatível com a forma de pagamento utilizada.',
      'Caso seja anunciado período de teste superior a 7 dias, valerão também as condições específicas divulgadas na oferta. Esse período comercial não reduz nem substitui o direito legal de arrependimento.',
    ],
  },
  {
    title: '6. Garantia e produto com defeito',
    paragraphs: [
      'Todos os produtos possuem os direitos decorrentes da garantia legal brasileira. Quando houver garantia contratual adicional, ela será complementar à garantia legal, e seu prazo e condições serão informados na página do produto, certificado ou material entregue ao consumidor.',
      'Se o aparelho apresentar defeito ou funcionamento diferente do anunciado, entre em contato com o suporte. Poderemos solicitar testes básicos de configuração, carregamento, posicionamento, regulagem, conexão, limpeza e acessórios para identificar a causa e solucionar o problema. Esses procedimentos não excluem os direitos previstos no Código de Defesa do Consumidor.',
    ],
  },
  {
    title: '7. Situações de mau uso e conservação',
    paragraphs: [
      'A garantia pode não abranger danos comprovadamente causados por queda ou impacto, líquidos sem proteção correspondente, abertura ou alteração indevida, reparo por terceiros não autorizados, carregadores ou acessórios incompatíveis, armazenamento inadequado ou danos físicos posteriores ao recebimento. Cada caso será analisado individualmente; a simples alegação de mau uso não elimina automaticamente os direitos do consumidor.',
      'Por ser utilizado próximo ou no ouvido, o aparelho deve ser higienizado e conservado conforme as orientações da Fonovital ou do manual. Não utilize líquidos, produtos químicos ou métodos não recomendados pelo fabricante.',
    ],
  },
  {
    title: '8. Expectativa de resultado',
    paragraphs: [
      'Os aparelhos são destinados à amplificação sonora, e os resultados percebidos variam conforme fatores individuais. A Fonovital não garante resultado clínico específico, recuperação da audição natural ou cura para perda auditiva.',
      'Em caso de dor, secreção, perda auditiva súbita, desconforto persistente ou outra condição médica, procure um profissional habilitado.',
    ],
  },
  {
    title: '9. Entrega, atrasos e divergências',
    paragraphs: [
      'O prazo estimado de entrega é apresentado antes da conclusão da compra e, após o envio, podem ser disponibilizadas informações de rastreamento. Informe endereço completo e correto. Em caso de erro de endereço, atraso, extravio ou irregularidade da transportadora, entre em contato para que a Fonovital tome as providências cabíveis.',
      'Se você receber modelo, quantidade ou produto diferente do pedido, comunique imediatamente a empresa para regularização sem custos indevidos.',
    ],
  },
  {
    title: '10. Preços, pagamento e atendimento',
    paragraphs: [
      'O preço válido é o apresentado no momento da conclusão da compra. Antes da finalização, serão informados produto, descontos, frete quando houver, forma de pagamento, parcelamento e valor total. Promoções podem ter prazo, estoque e condições específicas.',
      'Para localizar um atendimento, poderemos solicitar nome, CPF, número do pedido, telefone, e-mail e fotos ou vídeos relacionados à análise técnica. Essas informações serão solicitadas apenas quando tiverem relação com a solução do atendimento.',
    ],
  },
  {
    title: '11. Privacidade, aceite e legislação',
    paragraphs: [
      'A Fonovital poderá tratar os dados necessários à compra, pagamento, emissão fiscal, entrega, atendimento, prevenção a fraudes e cumprimento de obrigações legais, de acordo com a Lei Geral de Proteção de Dados (LGPD). Informações adicionais podem ser consultadas na Política de Privacidade.',
      'A conclusão do pedido representa ciência das condições comerciais apresentadas, sem renúncia a direitos garantidos pela legislação brasileira. Aplicam-se principalmente o Código de Defesa do Consumidor (Lei nº 8.078/1990), o Decreto nº 7.962/2013, a LGPD (Lei nº 13.709/2018) e demais normas aplicáveis.',
    ],
  },
];

export default function TermosPoliticas() {
  return (
    <main className="min-h-screen bg-[#f3f8fc] px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-3xl bg-gradient-to-r from-[#008B91] via-[#0b7f86] to-[#006d73] px-6 py-10 text-white shadow-lg md:px-10 md:py-14">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
            <FileText size={20} />
            Informações legais
          </div>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">Termos, garantia e políticas</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
            Condições de compra online, devolução, garantia, suporte e privacidade da Fonovital.
          </p>
          <p className="mt-6 text-sm text-white/75">Última atualização: 13 de dezembro de 2025</p>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3" aria-label="Resumo das políticas">
          {[
            [ShieldCheck, 'Garantia legal e contratual', 'Proteção conforme a legislação e as condições do produto.'],
            [RefreshCcw, '7 dias para desistir', 'Solicite a devolução dentro do prazo legal após o recebimento.'],
            [LockKeyhole, 'Dados protegidos', 'Tratamento de dados de acordo com a LGPD.'],
          ].map(([Icon, title, description]) => {
            const IconComponent = Icon as typeof ShieldCheck;
            return <article key={title as string} className="rounded-2xl border border-[#dbe7ee] bg-white p-5 shadow-sm">
              <IconComponent className="text-[#008B91]" size={24} />
              <h2 className="mt-3 font-bold text-slate-900">{title as string}</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{description as string}</p>
            </article>;
          })}
        </section>

        <article className="mt-6 rounded-3xl border border-[#dbe7ee] bg-white p-6 shadow-sm md:p-10">
          <p className="mb-8 text-base leading-relaxed text-slate-600">
            Estes termos regulam as compras realizadas pelos canais oficiais da Fonovital. Ao comprar, o consumidor declara ter recebido informações claras sobre produto, preço, pagamento, entrega, garantia e suporte.
          </p>
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-slate-200 pt-7 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-bold text-[#071c3b] md:text-2xl">{section.title}</h2>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-600">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-[#f0faf9] p-5 text-sm leading-relaxed text-slate-700">
            <strong className="text-[#006d73]">FONOVITAL</strong><br />
            CNPJ: 61.894.698/0001-20 · E-mail: fonovitaloficial@gmail.com · WhatsApp: (32) 99906-9763
            <p className="mt-4 border-t border-[#cde9e5] pt-4">
              Consulte as normas oficiais:
              {' '}
              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#006d73] underline hover:text-[#004f54]"
              >
                Código de Defesa do Consumidor (CDC)
              </a>
              {' · '}
              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#006d73] underline hover:text-[#004f54]"
              >
                Decreto do Comércio Eletrônico
              </a>
              {' · '}
              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#006d73] underline hover:text-[#004f54]"
              >
                LGPD
              </a>
              .
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
