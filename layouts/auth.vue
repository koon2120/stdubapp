<template>
  <header class="noto-sans-thai">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <img src="/images/logo.png" alt="Logo" width="30" style="border-radius: 50%;" class="me-2">
        <NuxtLink class="navbar-brand" to="/"><b>ST Dub App</b></NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <NuxtLink class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ช่วยเหลือ
              </NuxtLink>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink class="dropdown-item" to="https://docs.stdubteam.online/" target="_blank">เอกสาร</NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main class="container sarabun-medium">
    <slot></slot>
  </main>
</template>