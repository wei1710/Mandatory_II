<script>
  import { useLocation } from "svelte-navigator";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';

  let location = useLocation();
  let isHomePage = $location.pathname === "/";
  let topSpace = writable(0);

  const updateLocation = () => {
    isHomePage = $location.pathname === "/";
    topSpace.set(isHomePage ? 0 : 122);
  }

  onMount(() => {
    const unsubscribe = location.subscribe(updateLocation);
    return unsubscribe;
  });
</script>

<div class="top-space-container" style="margin-top: {$topSpace}px;"></div>