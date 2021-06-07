<template>
    <single-choice-question />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SingleChoiceQuestion from '@/components/SingleChoiceQuestion.vue';

@Component({
    components: {
        SingleChoiceQuestion,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
