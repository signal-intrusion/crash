<?php
namespace Craft;

/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */

/**
 * Class BaseApplicationComponent
 *
 * @package craft.app.etc.components
 */
class BaseApplicationComponent extends \CApplicationComponent
{
	// For consistency!
	/**
	 * @return bool
	 */
	public function isInitialized()
	{
		return $this->getIsInitialized();
	}
}
