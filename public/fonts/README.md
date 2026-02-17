# Neue Montreal Font Files

This directory requires the following font files for the DMV DJ Sessions brand typography:

## Required Files

### Neue Montreal (Display/Body)
- `NeueMontreal-Regular.woff2` / `.woff` - Body copy (400)
- `NeueMontreal-Medium.woff2` / `.woff` - Navigation (500)
- `NeueMontreal-Bold.woff2` / `.woff` - Subheadings (700)
- `NeueMontreal-BoldItalic.woff2` / `.woff` - Headlines italic (700 italic)
- `NeueMontreal-Black.woff2` / `.woff` - Display headlines (900)
- `NeueMontreal-BlackItalic.woff2` / `.woff` - Hero headlines (900 italic) **CRITICAL**

### Neue Montreal Mono (Technical)
- `NeueMontrealMono-Regular.woff2` / `.woff` - Labels, timestamps (400)

## Where to Get

Neue Montreal is designed by [Pangram Pangram Foundry](https://pangrampangram.com/products/neue-montreal).

### Options:
1. **Purchase** from Pangram Pangram (recommended for production)
2. **Trial fonts** available for development/testing
3. **Alternative**: Use [Satoshi](https://www.fontshare.com/fonts/satoshi) from Fontshare (free, similar aesthetic)

## Typography Pattern

| Level | Font | Weight | Style | Usage |
|-------|------|--------|-------|-------|
| Hero | Neue Montreal | 900 Black | Italic | Main headlines |
| Section | Neue Montreal | 700 Bold | Italic | Section titles |
| Body | Neue Montreal | 400 Regular | Normal | Descriptions, bios |
| Technical | Neue Montreal Mono | 400 Regular | Normal | Timestamps, labels, DJ handles |

## CSS Classes

```css
.font-display    /* Neue Montreal - headlines */
.font-technical  /* Neue Montreal Mono - labels */
.tracking-ultra-tight  /* -0.05em - headlines */
.tracking-super-wide   /* 0.3em - labels */
.tracking-wide-caps    /* 0.2em - buttons */
```
