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
			array($this, 'footnote'),
			array($this, 'year'),
			array($this, 'animation')
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
			$imgSrc = "bio";
		} elseif ($asideCat == 'company') {
			$imgSrc = "company";
		} elseif ($asideCat == 'event') {
			$imgSrc = "event";
		} elseif ($asideCat == 'source') {
			$imgSrc = "source";
		} elseif ($asideCat == 'game') {
			$imgSrc = "game";
		} elseif ($asideCat == 'excerpt') {
			$imgSrc = "excerpt";
		} elseif ($asideCat == 'gallery') {
			$imgSrc = "image";
		} elseif ($asideCat == 'video') {
			$imgSrc = "video";
		} elseif ($asideCat == 'crash') {
			$imgSrc = "crash";
		}

		return '<span data-note="'.$entries[0]->slug.'" class="in-line-note note-' . $entries[0]->slug . ' footnote-image ' . $imgSrc . ' " id="" title="'. $entries[0]->heading .'">' . $entries[0]->sourceName . '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	}

	public function footnote($attributes, $content, $tag) {

		$criteria = craft()->elements->getCriteria(ElementType::Entry);
		if (isset($attributes['cite'])) {
			$criteria->slug = $attributes['cite'];
		} else {
			$criteria->slug = '';
		}
		if ( $entries = $criteria->find() ) {

			$footnoteSource = $entries[0]->sourceName;
			if (isset($entries[0]->sourceAuthors) && strlen($entries[0]->sourceAuthors) >= 1) {
				$footnoteAuthor = $entries[0]->sourceAuthors .', ';
			} else {
				$footnoteAuthor = '';
			}
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

		return '<span class="in-line-footnote footnote-image ' . $entries[0]->slug . '" title="'. $footnoteAuthor . $footnoteSource.'. ('.$footnoteYear.') '.$footnotePage.'."></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	}

	public function year($attributes, $content, $tag) {

		$target = 'year-' . $attributes['year'];

		return '<div class="year-empty" id="' . $target. '"></div>';
	}

	public function animation($attributes, $content, $tag) {

		if (isset($attributes['id'])) {
			$animationId = $attributes['id'] . '-animation';
		} else {
			$animationID = 'test';
		}
		return '<div class="animation-placeholder" id="' . $animationId . '"></div>';
	}

}
