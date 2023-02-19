<script lang="ts">
  export let href: string;
  export let style: string;
  export let clickable = false;
  export let src = '';
  export let alt = '';
</script>

{#if clickable}
<div class="min-w-min min-h-min {style}">
  <a href={href} class="m-0 p-0 w-full cursor-pointer" rel="noreferrer" target="_blank">
    <slot name="icon">
      <img src={src} alt={alt} class="w-full">
    </slot>
  </a>
</div>
{:else}
<div class="min-w-min min-h-min {style}">
  <slot name="icon">
    <img src={src} alt={alt} class="w-full">
  </slot>
</div>
{/if}
