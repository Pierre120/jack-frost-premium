<script lang="ts">
  import { onMount } from 'svelte';
  import heroA from '$lib/assets/hero/a.png';
  import heroB from '$lib/assets/hero/b.png';
  import heroC from '$lib/assets/hero/c.png';

  let Carousel;
  onMount(async () => {
    Carousel = (await import('svelte-carousel')).default;
  });

  let imageSlides = [
    {
      alt: 'Jack Frost Premium Ice Cream',
      src: heroA,
    },
    {
      alt: 'Jack Frost Premium Ice Cream',
      src: heroB,
    },
    {
      alt: 'Jack Frost Premium Ice Cream',
      src: heroC,
    },
  ];
</script>

<!-- <Carousel /> -->
<svelte:component this={Carousel} dots={false} arrows={false} autoplay>
  {#each imageSlides as img}
    <img src={img.src} alt={img.alt} class="m-0 p-0 max-w-full" />
  {/each}
</svelte:component>

