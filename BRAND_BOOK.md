# BRAND BOOK OFICIAL | PLAY VIRAL
## *Manual de Identidade Visual, Estratégia de Marca & Design System*

---

### Versão: 1.0.0
### Ano: 2026
### Empresa Matriz: Grupo Acelera Jurídico
### Especialista / Porta-voz: Valéria Mendes

---

## 1. ESSÊNCIA & POSICIONAMENTO DA MARCA

### 1.1. O Manifesto
> *"O algoritmo não é uma roleta russa. A retenção não é sorte. O crescimento não é um acidente.*  
> *Enquanto amadores dançam por migalhas de atenção efêmera, líderes constroem audiências com método, psicologia narrativa e engenharia de roteiro.*  
> *O PlayViral não é um curso sobre vídeos. É a ciência de dominar o recurso mais valioso do século XXI: a atenção consciente."*

### 1.2. Missão, Visão e Valores
- **Missão:** Capacitar profissionais, criadores e empresas a produzirem conteúdo em vídeo de alta retenção que converte atenção dispersa em autoridade inquestionável e receita previsível.
- **Visão:** Ser o padrão de excelência de referência nacional em engenharia de conteúdo e roteirização estratégica de vídeos curtos.
- **Valores:**
  - *Rigor Metodológico:* Testar antes de ensinar. Dados sobre sentimentos.
  - *Alta Estética:* O cuidado formal reflete a seriedade do intelecto.
  - *Sustentabilidade de Longo Prazo:* Criar marcas duradouras que sobrevivem a qualquer atualização de plataforma.
  - *Ética & Compliance:* Conteúdo que vende sem manipulações baratas ou promessas irreais.

### 1.3. Tom de Voz (Tone of Voice)
O tom de voz do Play Viral situa-se na intersecção entre o **Mentor Estratégico** e o **Diretor de Fotografia Cinematográfico**:
- **Assertivo, não agressivo:** Não precisamos gritar nem apelar para gatilhos baratos. Falamos com a autoridade serena de quem domina os números.
- **Técnico, porém acessível:** Utilizamos conceitos de cinema, neurociência de atenção e storytelling com linguagem cristalina e aplicável.
- **Sofisticado & Editorial:** As frases são bem pontuadas, elegantes e provocativas. Nunca usamos gírias infantis ou clickbaits desonestos.

---

## 2. ARQUITETURA DO LOGOTIPO & SÍMBOLOS

### 2.1. O Logotipo Primário
O logotipo do Play Viral é composto por duas forças complementares:
1. **O Símbolo Isotipo (Play Geométrico Interconectado):** Um prisma triangular de play estilizado, formado por feixes dourados que convergem para a direita, simbolizando tração, avanço contínuo e refração de ideias em valor.
2. **O Wordmark Tipográfico:** A inscrição **PLAY VIRAL** composta na família tipográfica proprietária `Mirante` (em maiúsculas, com kerning expandido de `+2px` a `+3px`), conferindo postura cinematográfica e monumental.

### 2.2. O Monograma Editorial "P / v"
Nas peças editoriais e de landing page, a marca utiliza os caracteres capitulares **P** e **v** compostos na fonte serifada `Playfair Display`:
- O **P** representa a *Pausa*: o ato de fazer o usuário estancar o polegar no feed.
- O **v** representa o *Vetor / Viralidade*: a aceleração direcional que leva a mensagem adiante.
- Devem ser aplicados preferencialmente como marcas d'água de grande escala (`opacity: 0.08` a `0.15` para o P; e `linear-gradient` metálico translúcido para o v).

### 2.3. Área de Não-Interferência (Clearspace)
A área mínima de respiro ao redor do logotipo é calculada a partir da altura da letra **"P"** do wordmark:
- Margem mínima superior, inferior, esquerda e direita: **1.5x [P]**.
- Nenhum elemento tipográfico, linha de corte ou ícone pode invadir essa zona de proteção.

### 2.4. Redução Mínima
- **Digital:** Altura mínima de `24px` para telas normais e `48px` para telas Retina.
- **Impresso:** Largura mínima de `30mm`.

---

## 3. SISTEMA CROMÁTICO (THE COLOR PALETTE)

O Play Viral utiliza uma paleta **Dark Luxury** rigorosamente controlada para transmitir riqueza tátil, sofisticação e conforto de leitura.

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  VINHO NOTURNO  │  │ PRETO CEREJA    │  │  OURO METÁLICO  │  │   CREME NOBRE   │
│     #160B11     │  │     #12090E     │  │     #DEC37D     │  │     #FAF8F5     │
│ RGB: 22, 11, 17 │  │ RGB: 18, 9, 14  │  │ RGB: 222,195,125│  │ RGB: 250,248,245│
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 3.1. Cores Primárias de Marca
- **Vinho Escuro Noturno (`--bg-dark`):**
  - Hex: `#160B11`
  - HSL: `320°, 33%, 6%`
  - Uso: Fundo principal de telas, sessões imersivas e embalagens de alto luxo.
- **Preto Cereja Noturno (`--bg-darker`):**
  - Hex: `#12090E`
  - HSL: `320°, 33%, 5%`
  - Uso: Elementos de profundidade secundária, rodapés, faixas de marquee.
- **Ouro Metálico Primário (`--gold-primary`):**
  - Hex: `#DEC37D`
  - HSL: `43°, 65%, 68%`
  - Uso: Acentos nobres, botões de ação primária, selos e destaques tipográficos.

### 3.2. Acentos Metálicos & Gradientes
- **Gradiente Dourado de 9 Pontos (`--gold-gradient`):**
  ```css
  background: linear-gradient(
    90deg, 
    #E7CF8F 0%, 
    #DEC37D 25%, 
    #C8A44D 50%, 
    #DEC37D 75%, 
    #E7CF8F 100%
  );
  ```
- **Ouro Claro / Highlight:** `#E7CF8F` (iluminação de bordas e reflexos superiores).
- **Ouro Escuro / Sombra:** `#C8A44D` (profundidade e chanfros de relevo).
- **Glow Âmbar Tridimensional:** `rgba(201, 125, 69, 0.45)` com `filter: blur(60px)`.

### 3.3. Paleta de Contraste Editorial (High Contrast Daylight)
- **Creme Nobre Superfície (`--bg-card-light`):**
  - Hex: `#FAF8F5` | `#F8F5EE`
  - Uso: Cards de ruptura visual (*O Problema*, *Depoimentos*, *A Mentora*).
- **Texto Escuro Nobre (`--text-dark`):**
  - Hex: `#1A120C`
  - Contraste: 12.8:1 contra o fundo creme (Aprovado em **WCAG AAA**).

---

## 4. SISTEMA TIPOGRÁFICO (TYPOGRAPHY SPECIFICATION)

O Play Viral equilibra a contundência da geometria moderna com a tradição das publicações impressas.

### 4.1. Família Display Principal: `Mirante`
- **Classificação:** Sans-serif editorial display com incisões afiadas e alta personalidade.
- **Pesos Utilizados:** Medium (500), SemiBold (600), Bold (700), ExtraBold (800).
- **Aplicações:** Headlines principais (H1), títulos de seções (H2) e badges de autoridade.
- **Configuração Recomendada:** `letter-spacing: -0.02em` em títulos grandes; `letter-spacing: 0.15em` em labels em caixa alta.

### 4.2. Família Serif Clássica: `Playfair Display`
- **Classificação:** Serif de alto contraste e transição fina de hastes.
- **Pesos Utilizados:** Bold (700) e Black (900).
- **Aplicações:** Capitulares monumentais, monogramas "P" e "v", citações filosóficas de impacto.

### 4.3. Família de Interface & Leitura: `Manrope`
- **Classificação:** Neo-grotesque contemporânea com excelente x-height e legibilidade óptica.
- **Pesos Utilizados:** Regular (400), Medium (500), SemiBold (600), Bold (700).
- **Aplicações:** Parágrafos, cards de depoimentos, tabelas de módulos, inputs e botões de ação.
- **Line-height:** Mínimo de `1.6` para blocos de texto contínuo.

### 4.4. Escala Modular de Tipo (Desktop / Mobile Fluid)
- **Hero Title (H1):** `clamp(2.5rem, 5.5vw, 4.25rem)` / line-height: `1.08`
- **Section Title (H2):** `clamp(2rem, 4vw, 3.25rem)` / line-height: `1.15`
- **Card Heading (H3):** `clamp(1.25rem, 2.5vw, 1.75rem)` / line-height: `1.25`
- **Body Text:** `1rem` (16px) / line-height: `1.65`
- **Micro Eyebrows / Tags:** `0.75rem` (12px) / letter-spacing: `2.5px` / uppercase

---

## 5. GRAMÁTICA DE ELEMENTOS GRÁFICOS & ÍCONES

### 5.1. A Linha 'Thread' com Nós de Costura
- **Forma:** Linha horizontal fina conectada a um círculo central preenchido com nó lateral.
- **Uso Obrigatório:** Acima de todo subtítulo "Eyebrow" (ex: *O Problema*, *Na Prática*, *Comunidade*).
- **Significado:** Simboliza a costura do roteiro — o fio invisível que une cada cena sem permitir perda de retenção.

### 5.2. Corner Ticks (Marcas de Viewfinder)
- **Forma:** Quatro cantoneiras de 90 graus (`14px x 14px`) posicionadas nos vértices dos cards nobres.
- **Significado:** Evocam o visor de uma câmera cinematográfica profissional. Comunica foco seletivo e qualidade de produção de cinema.

### 5.3. A Balança Jurídica & Selo de Governança
- **Forma:** Ícone minimalista de balança romana com pesos equilibrados.
- **Uso:** Presente no card institucional da mentora Valéria Mendes.
- **Significado:** Ancora o conteúdo no respaldo e na segurança corporativa do *Grupo Acelera Jurídico*.

### 5.4. Fita de Timeline / Filmstrip (`IconBand`)
- **Forma:** Grade horizontal modular em forma de tira de filme com ícones de roteiro gravados em caixas arredondadas.
- **Significado:** A decomposição analítica do vídeo segundo a segundo.

### 5.5. A Matriz de Reticências (Dot Pattern Grid)
- **Forma:** Grade repetida de círculos simétricos (`30px x 30px`), com diâmetro calibrado e opacidade sutil.
- **Significado:** O tecido invisível do algoritmo e das conexões de rede neural.

---

## 6. SISTEMA DE COMPONENTES DE INTERFACE (UI DESIGN SYSTEM)

### 6.1. Arquitetura Double-Bezel (Casca Dupla Concêntrica)
Todos os cartões e módulos de destaque devem seguir a matemática concêntrica:
1. **Outer Shell (Casca Externa):**
   - Raio de curvatura: `rounded-[32px]` ou `rounded-[38px]`.
   - Borda: `1px solid rgba(231, 207, 143, 0.22)` (hairline dourada sutil).
2. **Inner Core (Núcleo Interno):**
   - Raio de curvatura concêntrico: `calc(outer_radius - padding)`.
   - Highlight superior: `box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15)`.

### 6.2. O Componente `PatternCard` (Ellipsis Pattern)
O componente integrado da **21st.dev** (`card-with-ellipsis-pattern.tsx`) é homologado oficialmente como o container padrão para:
- Módulos pedagógicos do método RVE.
- Destaques de métricas auditáveis (+218% de retenção, 3.4x compartilhamentos).
- Cards informativos de garantia e suporte.

#### Regras de Aplicação:
- Em fundos escuros (`#160B11`): Utilizar `bg-dot-pattern` com gradiente `from-[#160b11]/95 via-[#160b11]/80 to-[#dec37d]/10`.
- Em fundos claros (`#FAF8F5`): Utilizar `bg-dot-pattern-light` com gradiente `from-white/90 via-white/50 to-[#dec37d]/15`.
- Hover State: Elevação da borda dourada para `border-[#dec37d]/60` e translação do ícone de canto superior direito em `3px`.

### 6.3. O Botão CTA "Button-in-Button"
- **Estrutura:** Pílula externa (`rounded-full`) com fundo dourado metálico e texto escuro em caixa alta/negrito.
- **O Círculo de Disparo:** No lado direito do botão, um círculo interno dedicado abriga o glifo de Play (`▶`).
- **Física Háptica:**
  - Hover: Círculo translada ligeiramente na diagonal (`translate(3px, -1px)` e `scale(1.08)`).
  - Active: Todo o botão sofre compressão háptica (`scale(0.98)`).

---

## 7. DIRETRIZES DE IMAGEM & FOTOGRAFIA

- **Iluminação:** Chiaroscuro sutil (luz de recorte dourada/quente e preenchimento suave, com sombras limpas e aveludadas).
- **Postura:** Confiante, serena, amigável e altamente profissional. Sem poses caricatas ou expressões exageradas comuns em thumbnails de clickbait.
- **Tratamento de Cor:** Tons quentes e acetinados na pele, reforçando a conexão com os tons dourados e vinho da marca.
