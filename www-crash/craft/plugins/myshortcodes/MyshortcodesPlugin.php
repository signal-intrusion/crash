<?php
namespace Craft;

class MyshortcodesPlugin extends BasePlugin
{
	public function getName()
	{
		return Craft::t('My Shortcodes');
	}

	public function getVersion()
	{
		return '0.1';
	}

	public function getDeveloper()
	{
		return 'Signal Intrusion';
	}

	public function getDeveloperUrl()
	{
		return 'http://signalintrusion.com';
	}

	public function registerShortcodes()
	{
		return array(
			array($this, 'citation')
		);
	}

	/**
	 * An example shortcode callback method.
	 *
	 * @param  array $attributes  Key/value pairs of shortcode attributes
	 * @param  string $content    The content between shortcode pairs
	 * @param  string $tag        The tag name. Same as the method name.
	 * @return string             Replacement text.
	 */

	public function citation($attributes, $content, $tag) {

		$criteria = craft()->elements->getCriteria(ElementType::Entry);
		$criteria->slug = $attributes['cite'];
		$entries = $criteria->find();

		return '<span>' . $entries[0]->sourceName . '</span>';
	}

}
