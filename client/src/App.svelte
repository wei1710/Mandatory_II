<script>
  import { Router, Route, navigate } from "svelte-navigator";
  import { toast, Toaster } from "svelte-french-toast";
  import PrivateRoute from "./components/Private-Routers/PrivateRoute.svelte";
  import Login from "./pages/Login/Login.svelte";
  import Signup from "./pages/Signup/Signup.svelte";
  import Dashboard from "./pages/Dashboard/Dashboard.svelte";
  import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.svelte";
  import { isAuthenticated } from "./stores/auth.js";
  import SpaceContainer from "./components/DivSpace/SpaceContainer.svelte";
  import TopSpaceContainer from "./components/DivSpace/TopSpaceContainer.svelte";
  import DashboardSpaceContainer from "./components/DivSpace/DashboardSpaceContainer.svelte";
  import ForgotPasswordSpaceContainer from "./components/DivSpace/ForgotPasswordSpaceContainer.svelte";
  import ResetPasswordSpaceContainer from "./components/DivSpace/ResetPasswordSpaceContainer.svelte";
  import ResetPassword from "./pages/ResetPassword/ResetPassword.svelte";

  async function signOut() {
    try {
      const response = await fetch("/api/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("user");
        
        isAuthenticated.set(false);
        navigate("/", { state: { prevRoute: "/dashboard" } });
        toast.success("Sign out successful!");
        console.log("Sign out successful");
      } else {
        toast.error("Failed to sign out!");
        console.error("Sign out failed: ", response.statusText);
      }
    } catch (error) {
      toast.error("Error: cannot sign out!");
      console.error("Error signing out: ", error);
    }
  }

  // Check if reset token is present in the URL
  const resetToken = new URLSearchParams(window.location.search).get("token");
  const showResetPassword = !!resetToken;

  if (!showResetPassword) {
    navigate("/");
  }

  // check user already login
  async function checkAuthentication() {
    try {
      const response = await fetch("/api/has_login");
      if (response.ok) {
        const data = await response.json();
        isAuthenticated.set(data.isLoggedIn);
      } else {
        isAuthenticated.set(false);
      }
    } catch (error) {
      console.error("Error checking authentication status: ", error);
      isAuthenticated.set(false);
    }
  }

  checkAuthentication();
</script>

<Toaster/>


<Router>
  <TopSpaceContainer />
  <DashboardSpaceContainer />
  <ForgotPasswordSpaceContainer />
  <ResetPasswordSpaceContainer />
  <div class="container-title">
    <h1 id="top-title">Welcome</h1>
  </div>
  <div class="button-container">
    <div class="left-buttons">
      <button on:click={() => navigate("/")}>Home</button>
      {#if $isAuthenticated}
        <button on:click={() => navigate("/dashboard")}>Dashboard</button>
      {/if}
    </div>

    <div class="right-buttons">
      {#if !$isAuthenticated}
        <button on:click={() => navigate("/signup")}>Sign Up</button>
      {/if}

      {#if $isAuthenticated}
        <button on:click={signOut}>Sign Out</button>
      {/if}
    </div>
  </div>

  <div>
    <Route path="/login">
      <h2 class="h2-text">Login</h2>
      <Login />
    </Route>

    <Route path="/signup">
      <h2 class="h2-text">Sign Up</h2>
      <Signup />
    </Route>

    <Route path="/forgot_password">
      <h2 class="h2-text">Forgot Password</h2>
      <ForgotPassword />
    </Route>

    <Route path="/reset_password">
      <h2 class="h2-text">Reset Password</h2>
      <ResetPassword />
    </Route>

    <PrivateRoute path="/dashboard">
      <Dashboard />
      <h2 class="h2-text">Dashboard</h2>
    </PrivateRoute>
  </div>

  <SpaceContainer />
</Router>

<style>
  .container-title {
    margin-top: -10%;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-top: -15%;
  }

  .left-buttons {
    margin-right: 22rem;
  }

  .right-buttons {
    margin-left: 3rem;
  }

  h2.h2-text {
    display: none;
  }
</style>
