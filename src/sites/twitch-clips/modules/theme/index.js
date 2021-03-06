'use strict';

// ============================================================================
// Menu Module
// ============================================================================

import Module from 'utilities/module';
import {createElement} from 'utilities/dom';

//import THEME_CSS_URL from 'site/styles/theme.scss';


export default class ThemeEngine extends Module {
	constructor(...args) {
		super(...args);
		this.inject('settings');

		this.inject('site');

		this.should_enable = true;

		this.settings.add('theme.dark', {
			requires: ['theme.is-dark'],
			default: false,
			process(ctx, val) {
				return ctx.get('theme.is-dark') ? val : false
			},

			ui: {
				path: 'Appearance @{"description": "Personalize the appearance of Twitch. Change the color scheme and fonts and tune the layout to optimize your experience."} > Theme >> General',
				title: 'Gray (no Purple)',
				description: '<em>Requires Dark Theme to be Enabled.</em><br>I see my website and I want it painted black...<br>This is a very early feature and will change as there is time.',
				component: 'setting-check-box'
			},

			changed: val => this.updateSetting(val)
		});

		this.settings.add('theme.can-dark', {
			requires: ['context.route.name'],
			process(ctx) {
				return true;
			}
		});

		this.settings.add('theme.is-dark', {
			requires: ['theme.can-dark', 'context.ui.theme'],
			process(ctx) {
				return ctx.get('theme.can-dark') && ctx.get('context.ui.theme') === 1;
			},
			changed: () => this.updateCSS()
		});

		this.settings.add('theme.tooltips-dark', {
			requires: ['theme.is-dark'],
			process(ctx) {
				return ! ctx.get('theme.is-dark')
			}
		});

		this._style = null;
	}


	updateCSS() {
		const dark = this.settings.get('theme.is-dark'),
			gray = this.settings.get('theme.dark');

		document.body.classList.toggle('tw-root--theme-dark', dark);
		document.body.classList.toggle('tw-root--theme-ffz', gray);

	}


	toggleStyle(enable) {
		if ( ! this._style ) {
			if ( ! enable )
				return;

			this._style = createElement('link', {
				rel: 'stylesheet',
				type: 'text/css',
				//href: THEME_CSS_URL
			});

		} else if ( ! enable ) {
			this._style.remove();
			return;
		}

		document.head.appendChild(this._style);
	}

	updateSetting(enable) {
		this.toggleStyle(enable);
		this.updateCSS();
	}

	onEnable() {
		this.updateSetting(this.settings.get('theme.dark'));
	}
}