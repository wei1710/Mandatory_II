<script>
  import { useLocation } from "svelte-navigator";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';

  let location = useLocation();
  let topSpace = writable(0);

  const updateLocation = () => {
    const isDashboardPage = $location.pathname === "/dashboard";
    topSpace.set(isDashboardPage ? 20 : 0);
  }

  onMount(() => {
    const unsubscribe = location.subscribe(updateLocation);
    return unsubscribe;
  });
</script>

<div class="top-space-container" style="height: {$topSpace}px;"></div>