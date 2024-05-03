<script>
  import { useLocation } from "svelte-navigator";
  import { onMount } from "svelte";

  let location = useLocation();
  let isHomePage = $location.pathname === "/";
  let isSignupPage = $location.pathname === "/signup";
  let isLoginPage = $location.pathname === "/login";
  let isForgotPasswordPage = $location.pathname === "/forgot_password";
  let isDashboardPage = $location.pathname === "/dashboard";
  let fromDashboardToHome = $location.state && $location.state.prevRoute === "/dashboard";

  const updateLocation = () => {
    isHomePage = $location.pathname === "/";
    isSignupPage = $location.pathname === "/signup";
    isLoginPage = $location.pathname === "/login";
    isForgotPasswordPage = $location.pathname === "/forgot_password";
    isDashboardPage = $location.pathname === "/dashboard";
    fromDashboardToHome = $location.state && $location.state.prevRoute === "/dashboard";
  };

  onMount(() => {
    const unsubscribe = location.subscribe(updateLocation);
    return unsubscribe;
  });

  function calculateMarginTop() {
    if (isHomePage) {
      return fromDashboardToHome ? '-50px' : '0';
    } else if (isLoginPage || isSignupPage) {
      return '-100px';
    } else if (isForgotPasswordPage || isDashboardPage) {
      return '-100px';
    } else {
      return '0';
    }
  }

  // Bind the margin-top value dynamically
  $: marginTop = calculateMarginTop();

  $: containerClasses = [
    'space-container',
    isHomePage ? 'home' : '',
    isSignupPage ? 'signup-page' : '',
    isLoginPage ? 'login-page' : '',
    isForgotPasswordPage ? 'forgot-password-page' : '',
    isDashboardPage ? 'dashboard-page' : ''
  ].filter(Boolean).join(' ');
</script>

<div
  class={containerClasses}
  style="margin-top: {marginTop};"
></div>

<style>
  .space-container.home {
    height: 650px;
  }
</style>