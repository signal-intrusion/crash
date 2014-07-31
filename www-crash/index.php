<?php

// Path to your craft/ folder
$craftPath = 'craft';

// Do not edit below this line
$path = rtrim($craftPath, '/').'/app/index.php';

if (!is_file($path))
{
	exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;

switch ($_SERVER['SERVER_NAME'])

{

    case 'signalintrusion.com' :
        define('CRAFT_ENVIRONMENT', 'live');
        break;

    default :
        define('CRAFT_ENVIRONMENT', 'local');
        break;
}
