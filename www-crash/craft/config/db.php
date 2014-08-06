<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(

	'*' => array(
	    // Config overrides for all of our environments
	),

	'local' => array(

		'server' => 'localhost',
		'user' => 'root',
		'password' => 'root',
		'database' => 'crashcraft',
		'tablePrefix' => 'craft'
	),

	'.com' => array(
		'server' => 'crashcraft.db.9299105.hostedresource.com',
		'user' => 'crashcraft',
		'password' => 'Manchego45!!!',
		'database' => 'crashcraft',
		'tablePrefix' => 'craft'
	)

);
