<template lang="html">
	<div class="tw-input">
		<header>
			{{ t(item.i18n_key, item.title, item) }}
		</header>
		<section
			v-if="item.description"
			class="tw-c-text-alt-2"
		>
			<markdown :source="t(item.desc_i18n_key || `${item.i18n_key}.description`, item.description, item)" />
		</section>
		<div v-for="(i, idx) in data" :key="idx" class="tw-mg-l-1">
			<input
				:name="item.full_key"
				:id="item.full_key + idx"
				:value="i.value"
				type="radio"
				class="tw-radio__input"
			>
			<label
				:for="item.full_key + idx"
				class="tw-pd-y-05 tw-radio__label"
			>
				{{ t(i.i18n_key, i.title, i) }}
			</label>
		</div>
	</div>
</template>

<script>
import SettingMixin from '../setting-mixin';

export default {
	mixins: [SettingMixin],
	props: ['item', 'context']
}
</script>