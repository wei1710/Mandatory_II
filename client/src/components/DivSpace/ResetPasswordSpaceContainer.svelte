<script>
  import { useLocation } from "svelte-navigator";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';

  let location = useLocation();
  let topSpace = writable(0);

  const updateLocation = () => {
    const isResetPassword = $location.pathname === "/reset_password";
    topSpace.set(isResetPassword ? -123 : 0);
  }

  onMount(() => {
    const unsubscribe = location.subscribe(updateLocation);
    return unsubscribe;
  });
</script>

<div class="top-space-container" style="margin-top: {$topSpace}px;"></div>