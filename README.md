# Aventuras de Dados

MVP em Next.js para um RPG narrativo infantil pensado para crianças de aproximadamente 4–6 anos.

A criança ouve a cena, inventa uma solução, joga um dado de seis lados, conta os pontos e recebe uma consequência que sempre permite continuar a história.

## Stack

- Next.js 16 / App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Sem banco de dados: progresso salvo no `localStorage`

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## O MVP já inclui

- Uma aventura completa com caminhos ramificados
- Dado visual de 1 a 6
- Consequências diferentes para cada número
- Estrelas como recompensa e exercício de contagem
- Salvamento automático local
- Botão de tela cheia para compartilhar/espelhar
- Leitura da cena pelo navegador (`speechSynthesis`)
- Modo mestre para forçar dado, pular cena e reiniciar
- Ilustração simples por cena
- Suporte para substituir a ilustração por imagens em `/public/scenes`

## Criar nova aventura

1. Copie `src/data/floresta-encantada.ts`.
2. Troque `slug`, título e cenas.
3. Registre a aventura em `src/data/adventures.ts`.

A interface do jogo não precisa ser alterada.

## Filosofia do dado

O dado nunca diz que a criança “errou”.

- 1: surpresa engraçada
- 2: alguém ajuda
- 3: precisamos de mais uma ideia
- 4: deu certo (+1 estrela)
- 5: deu muito certo (+1 estrela)
- 6: sucesso mágico (+2 estrelas)

Assim, a narrativa continua em qualquer resultado.
