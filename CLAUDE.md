# CLAUDE.md

## Project Overview

Chinese-language avatar generator built with React + TypeScript + Vite + Tailwind CSS. Generates 500×500 PNG avatars with customizable text, fonts, colors, and background images.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npx tsc --noEmit` | Type-check only |

Always run `npx tsc --noEmit` before committing.

## Architecture

```
src/
  types.ts              — AvatarConfig, FONT_OPTIONS, constants
  App.tsx               — Main component, state via useLocalStorage
  utils/canvas.ts       — renderAvatar(), exportCanvasAsPng()
  components/
    AvatarPreview.tsx   — Canvas preview, font preloading, render loop
    TextEditor.tsx      — Text input, font/weight/size controls
    FontSelector.tsx    — 2-column font grid
    ImageCropper.tsx    — Canvas-based image crop with pan/zoom
    DraggableText.tsx   — Pointer-event overlay for text positioning
    BackgroundModeToggle.tsx
    OverlaySettings.tsx
    ColorPicker.tsx, PresetColors.tsx, TextAlignSelector.tsx
    ExportButton.tsx
  hooks/
    useLocalStorage.ts  — Persisted state with migration support
    useDebounce.ts      — Debounce values for render throttling
```

## Key Design Decisions

- **Canvas rendering**: All output drawn on 500×500 canvas via `renderAvatar()` in `canvas.ts`
- **Font loading**: All 9 Google Fonts preloaded on mount; render awaits `document.fonts.ready`
- **Image cropping**: Canvas-based `drawImage` with normalized crop params (scale, offsetX, offsetY)
- **State persistence**: `useLocalStorage` stores `AvatarConfig`; migration handles missing fields
- **Font size**: `fontSize: 0` = auto-fit, `> 0` = manual px value
- **Commits**: One commit per feature/fix. No mixing unrelated changes.

## Coding Guidelines

- No comments unless asked
- No features beyond what was asked
- Match existing code style
- Touch only what you must
- Remove imports/variables YOUR changes made unused
