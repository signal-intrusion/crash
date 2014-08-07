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
			array($this, 'note'),
			array($this, 'footnote')
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

		return '<span class="in-line-note note-' . $entries[0]->slug . '" id="" title="'. $entries[0]->heading .'"><img src="images/ui/' . $imgSrc . '" title="More about: ' . $entries[0]->heading . '">' . $entries[0]->sourceName . '</span>';
	}

	public function footnote($attributes, $content, $tag) {

		$criteria = craft()->elements->getCriteria(ElementType::Entry);
		$criteria->slug = $attributes['cite'];
		if ( $entries = $criteria->find() ) {

			$footnoteSource = $entries[0]->sourceName;
			$footnoteAuthor = $entries[0]->sourceAuthors;
			$footnoteYear = $entries[0]->sourceYear;

		} else {
			$footnoteSource = 'missing';
			$footnoteAuthor = 'missing';
			$footnoteYear = 'missing';
			$entries[0]->slug = 'missing';
		}

		if (isset($attributes['page'])) {
			$footnotePage = 'p. '. $attributes['page'];
		} else {
			$footnotePage = "";
		}

		return '<span class="in-line-footnote ' . $entries[0]->slug . '" title="'.$footnoteAuthor.', '.$footnoteSource.'. ('.$footnoteYear.') '.$footnotePage.'."><img src="images/ui/info.png" title="'.$footnoteAuthor.', '.$footnoteSource.'. ('.$footnoteYear.') p. '.$footnotePage.'."></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	}

}
