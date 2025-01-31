<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <div class="body">
    <h1>Title</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente aut
      tenetur nesciunt minima sed debitis eligendi dolor? Iusto animi nisi
      voluptatibus, corrupti nulla nobis facilis distinctio quisquam ratione
      reprehenderit optio quas inventore quia saepe, amet, accusamus excepturi
      praesentium dolores libero!
    </p>
    <slot></slot>
  </div>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>
