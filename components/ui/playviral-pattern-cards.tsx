import * as React from "react"
import { PatternCard, PatternCardBody } from "@/components/ui/card-with-ellipsis-pattern"
import { Sparkles, Video, Flame, Target, ArrowUpRight } from "lucide-react"

export function PlayViralPatternCards() {
  const modules = [
    {
      icon: Sparkles,
      tag: "Fundamentos RVE",
      title: "Arquitetura dos Primeiros 3s",
      description: "Como criar ganchos visuais e verbais magnéticos que estancam o scroll e ativam os gatilhos de dopamina da audiência.",
      metric: "+218% Retenção Média",
    },
    {
      icon: Video,
      tag: "Engenharia de Roteiro",
      title: "Roteirização Hipnótica",
      description: "Técnicas de micro-tensão narrativa e quebra de padrão para impedir abandonos no meio do vídeo e reter até o CTA.",
      metric: "3.4x Compartilhamento",
    },
    {
      icon: Flame,
      tag: "Direção & Presença",
      title: "Autoridade Cinematográfica",
      description: "Enquadramento, iluminação, ritmo de corte e postura de câmera para posicionar seu perfil como líder de alto ticket.",
      metric: "Posicionamento Premium",
    },
    {
      icon: Target,
      tag: "Monetização Ativa",
      title: "Funil de Conversão Orgânica",
      description: "Transforme visualizações casuais em leads qualificados, contratos fechados e vendas diretas no direct sem depender de anúncios.",
      metric: "Conversão Previsível",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dec37d]/10 border border-[#dec37d]/30 text-[#e7cf8f] text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Matriz de Conteúdo Viral</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          Estrutura construída para reter e converter
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Cada bloco utiliza a precisão do dot-pattern e gradientes hápticos para ilustrar a engenharia por trás do método RVE.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((item, idx) => {
          const Icon = item.icon
          return (
            <PatternCard
              key={idx}
              className="border-zinc-800 bg-[#160b11] hover:border-[#dec37d]/50 transition-all duration-300 group"
              gradientClassName="from-[#160b11]/95 via-[#160b11]/80 to-[#dec37d]/10"
            >
              <PatternCardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-[#dec37d]/10 border border-[#dec37d]/20 text-[#dec37d] group-hover:bg-[#dec37d] group-hover:text-black transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-zinc-900/80 border border-zinc-700/60 text-zinc-300">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#dec37d] transition-colors flex items-center justify-between">
                  {item.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#dec37d]" />
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Métrica Comprovada</span>
                  <span className="font-semibold text-[#dec37d]">{item.metric}</span>
                </div>
              </PatternCardBody>
            </PatternCard>
          )
        })}
      </div>
    </div>
  )
}
