<template>
	<div v-html="output" />
</template>

<script>

import MD from 'markdown-it';
import MILA from 'markdown-it-link-attributes';

export default {
	props: {
		source: String
	},

	computed: {
		md() {
			const md = new MD({
				html: false,
				linkify: true
			});

			md.use(MILA, {
				attrs: {
					target: '_blank',
					rel: 'noopener'
				}
			});

			return md;
		},

		output() {
			return this.md.render(this.source);
		}
	}
}

</script>