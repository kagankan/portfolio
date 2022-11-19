---
name: 'component'
root: 'src/components'
output: '.'
ignore: []
questions:
  value: 'コンポーネント名を入力'
---

# `{{ inputs.value }}/{{ inputs.value }}.astro`

```astro
---
import './{{ inputs.value }}.scss';
---

<div class="{{ inputs.value }}">
</div>

<script src="./{{ inputs.value }}.ts"></script>
```

# `{{ inputs.value }}/{{ inputs.value }}.scss`

```scss
.{{ inputs.value }} {
}
```

# `{{ inputs.value }}/{{ inputs.value }}.ts`

```typescript
```
