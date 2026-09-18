# Aventuras de Dados

MVP em Next.js para um RPG narrativo infantil pensado para crianças de aproximadamente 4–6 anos.

A criança ouve a cena, inventa uma solução, joga um dado de seis lados, conta os pontos e recebe uma consequência que sempre permite continuar a história.

## Stack

- Next.js / App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Postgres para aventuras, cenas, caminhos e resultados
- Supabase Auth/Storage preparados para evolução do projeto
- Progresso local ainda salvo em `localStorage`

## Rodar localmente

```bash
npm install
npm run dev
```

Crie um arquivo `.env.local` com:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Se o projeto estiver conectado ao Supabase pelo Vercel Marketplace, essas variáveis são sincronizadas automaticamente no deploy.

## Conteúdo da aventura

As aventuras e cenas não ficam mais hardcoded no repositório.

O app carrega do Supabase:

- `adventures`
- `scenes`
- `choices`
- `scene_outcomes`

Aventura inicial: **A Floresta das Estrelas**.

## O MVP inclui

- caminhos ramificados com nomes de destino
- dado digital ou físico
- dado visual de 1 a 6
- consequências diferentes para cada número
- estrelas como recompensa e exercício de contagem
- salvamento automático local
- tela cheia para compartilhar/espelhar
- leitura da cena pelo navegador
- Modo Mestre
- ilustração simples por cena
- paleta pastel configurável por cena via campo `art` no Supabase
- suporte para imagens reais via `image_path`

## Filosofia do dado

O dado nunca diz que a criança “errou”.

- 1: surpresa engraçada
- 2: alguém ajuda
- 3: precisamos de mais uma ideia
- 4: deu certo (+1 estrela)
- 5: deu muito certo (+1 estrela)
- 6: sucesso mágico (+2 estrelas)

Assim, a narrativa continua em qualquer resultado.
