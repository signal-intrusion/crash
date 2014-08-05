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
			array($this, 'citation'),
			array($this, 'note')
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

	public function note($attributes, $content, $tag) {

		$criteria = craft()->elements->getCriteria(ElementType::Entry);
		$criteria->slug = $attributes['aside'];
		$entries = $criteria->find();
		$asideCat = $entries[0]->asideCategory[0]->title;
		$imgSrc = 'info.png';

		if ($asideCat == 'bio') {
			$imgSrc = "bio.png";
		} elseif ($asideCat == 'company') {
			$imgSrc = "company.png";
		} elseif ($asideCat == 'event') {
			$imgSrc = "event.png";
		} elseif ($asideCat == 'source') {
			$imgSrc = "source.png";
		} elseif ($asideCat == 'excerpt') {
			$imgSrc = "excerpt.png";
		}

		return '<span><img src="images/ui/' . $imgSrc . '" alt="' . $entries[0]->heading . '">' . $entries[0]->sourceName . '</span>';
	}

}
