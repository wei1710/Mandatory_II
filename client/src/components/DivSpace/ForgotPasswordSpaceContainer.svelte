<script>
  import { useLocation } from "svelte-navigator";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';

  let location = useLocation();
  let topSpace = writable(0);

  const updateLocation = () => {
    const isForgotPassword = $location.pathname === "/forgot_password";
    topSpace.set(isForgotPassword ? -180 : 0);
  }

  onMount(() => {
    const unsubscribe = location.subscribe(updateLocation);
    return unsubscribe;
  });
</script>

<div class="top-space-container" style="margin-top: {$topSpace}px;"></div>