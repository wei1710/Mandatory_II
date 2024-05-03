  <script>
    import { toast, Toaster } from "svelte-french-toast";
    import { onMount } from "svelte";

    onMount(() => {
      showToast();
    });

    function showToast() {
      setTimeout(() => {
        toast.success("Welcome to the dashboard!");
      }, 1000);
    }

    
  </script>

  <div class="dashboard">
    <h3 class="title">Welcome to the dashboard</h3>
    <p class="description">Explore and enjoy.</p>

    <div class="video-container">
      <div class="video-wrapper">
        <iframe
          title="welcome-video"
          id="video"
          src="https://www.youtube.com/embed/9XDF7QB07Jg?autoplay=1&controls=0&showinfo=0&rel=0&loop=0&modestbranding=1start=3"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
  <div class="space-container"></div>

  <Toaster />

  <style>
    .dashboard {
      text-align: center;
      margin-top: 10%;
      font-family: "Segoe UI", sans-serif;
    }

    .title {
      font-size: 2.5rem;
      color: #4ca0e0;
      margin-bottom: 10px;
    }

    .description {
      font-size: 1rem;
      color: #00ffb3;
      margin-bottom: 30px;
    }

    .video-container {
      max-width: 100%;
      border-radius: 25px;
      border: 3px solid #4ca0e0;
      overflow: hidden;
    }

    .video-wrapper {
      position: relative;
      padding-bottom: 56.25%;
      overflow: hidden;
    }

    .video-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .space-container {
      height: 300px;
    }
  </style>
