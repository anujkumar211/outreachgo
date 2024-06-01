<script setup>
import { defineProps, onMounted } from "vue";
defineProps({
  title: {
    type: String,
    default: "",
  },
  button: {
    type: Boolean,
    default: true,
  },
  modalSize: {
    // xl, lg, sm
    type: String,
    default: "modal-lg",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  btnText: {
    type: String,
    default: "Save",
  },
});
</script>
<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade show"
      tabindex="-1"
      :class="modalSize"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      role="dialog"
      style="display: block"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <b>{{ title }}</b>
            </h5>
            <button
              type="button"
              class="btn-close"
              :disabled="loading"
              @click="$emit('close')"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="content"></slot>
          </div>
          <div class="modal-footer" v-if="button">
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('close')"
              :disabled="loading"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="$emit('save')"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              {{ btnText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.modal {
  background: rgba(0, 0, 0, 0.6);
}
</style>