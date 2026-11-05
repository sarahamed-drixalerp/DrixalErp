<script setup lang="ts">
const props = defineProps<{ icon: string }>()

/** Simple stroke icons for workspace tools + ERP modules. */
const PATHS: Record<string, string> = {
  erp: 'M4.5 3h4A1.5 1.5 0 0110 4.5v4A1.5 1.5 0 018.5 10h-4A1.5 1.5 0 013 8.5v-4A1.5 1.5 0 014.5 3zm11 0h4A1.5 1.5 0 0121 4.5v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0114 8.5v-4A1.5 1.5 0 0115.5 3zm-11 11h4a1.5 1.5 0 011.5 1.5v4A1.5 1.5 0 018.5 21h-4A1.5 1.5 0 013 19.5v-4A1.5 1.5 0 014.5 14zm11 0h4a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-4a1.5 1.5 0 011.5-1.5z',
  code: 'M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14',
  mobile: 'M9.5 2h5A2.5 2.5 0 0117 4.5v15a2.5 2.5 0 01-2.5 2.5h-5A2.5 2.5 0 017 19.5v-15A2.5 2.5 0 019.5 2zM11 18h2',
  design: 'M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z',
  cloud: 'M7 18a5 5 0 010-10 6 6 0 0111.5 1.5A4 4 0 0118 18z',
  support: 'M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-1v-6h3M4 13v4a2 2 0 002 2h1v-6H4',
  tasks: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
  calendar: 'M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  timesheet: 'M12 7v5l3 2M12 22a10 10 0 110-20 10 10 0 010 20z',
  catalogue: 'M4 6h16M4 12h16M4 18h10M18 16l2 2 3-3',
  requests: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  inbox: 'M4 6h16v12H4zM4 10l8 5 8-5',
  gps: 'M12 22s7-6.5 7-12a7 7 0 00-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  adm: 'M12 3l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z',
  org: 'M12 4v4M12 20v-4M6 10h12M8 10v4h8v-4M9 4h6v4H9zM9 16h6v4H9z',
  hrm: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a6 6 0 0112 0v1M16 3.5a4 4 0 010 7.5M22 21v-1a6 6 0 00-4-5.6',
  cat: 'M4 5h16v4H4zM4 11h16v8H4zM8 15h2',
  crm: 'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z',
  dms: 'M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM14 3v5h5',
  srm: 'M3 4h2l2.4 11.2a1.5 1.5 0 001.5 1.3h8.7a1.5 1.5 0 001.5-1.2L21 8H6.2M10 20.5h.01M17 20.5h.01',
  pmo: 'M4 19h16M6 16V9M10 16V5M14 16v-5M18 16V7',
  fin: 'M4 20h16M6 16v-4M10 16V8M14 16v-6M18 16V5',
  srv: 'M7 18a5 5 0 010-10 6 6 0 0111.5 1.5A4 4 0 0118 18zM12 14v4M12 22h.01',
  rsk: 'M12 3l9.5 17h-19zM12 10v4M12 16.5v.01',
  hsp: 'M9 4h6v4h4v6h-4v4H9v-4H5V8h4z',
  scl: 'M3 10l9-5 9 5-9 5-9-5zM6 12.5V17c2 1.5 4 2 6 2s4-.5 6-2v-4.5',
  flt: 'M4 16l2-6h9l3 3h2v3H4zM7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  industry: 'M3 21h18M5 21V10l4 3V7l4 3V5l6 4v12',
}

const isImage = computed(() => /^(https?:)?\/|\.(svg|png|webp|jpe?g)$/i.test(props.icon))
const path = computed(() => PATHS[props.icon] ?? PATHS.erp)
</script>

<template>
  <img v-if="isImage" :src="icon" alt="" width="26" height="26" loading="lazy" class="h-[1.625rem] w-[1.625rem] object-contain">
  <svg
    v-else
    viewBox="0 0 24 24"
    class="h-[1.625rem] w-[1.625rem]"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  ><path :d="path" /></svg>
</template>
